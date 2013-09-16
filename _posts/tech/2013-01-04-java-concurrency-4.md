---
layout: post
title: "Java 并发(4)：竞争条件"
description: "Java并发，竞争条件"
category: tech
tags: java 并发
---
###故事
在享受并发带来的好处的同时，也隐藏着危机。如果N个执行的线程彼此互补依赖干扰，那么大家就可以相安无事的运行，但是考虑到如果，其中的某几个或者所有线程都依赖着某个共同的数据，我们称之为共享资源。共享资源可以是一个简简单单的变量，也可以是文件IO或者硬件设备资源.

这个问题就是经典的`竞争条件` `（Race Condition）`，他发生在两个以上的线程或者进程共同访问同一个资源的时候。举一个生活中的例子，比如你站在寝室的窗户前发现楼下篮球场是空闲的，于是拿着篮球下楼去打球，到球场上发现已经有人了。这就引发了冲突。

把这个小例子映射到代码上就是一个 `“check-and-act”`操作。你和占用球场的人就代表了两个不同的线程，check表示代码先检查某个资源的状态，act是根据状态去执行某些特定的序列操作。用代码描述刚才的例子就是：


    if(courtAvailable == true){  //check ...
      // may take some time
       ...
       courtAvailable = false;
     // play
     courtAvailable = true;
    }
当我们得知`courtAvailable`为`true`的时候，就进入了下面的block，但这个时候神奇的vm可能将cpu的使用权交给了另一个线程，他正好也执行了相同的操作，并且修改了`courtAvailable`的值，此刻球场其实已经不可用了。现在权利又交回了我们的线程，但是我们发现球场已经被占用了。

###为什么会出现竞争条件
一个重要的原因就是多个线程对于共享资源执行了非原子化的操作。所谓原子化操作就是不会被打断的操作，就像原子一样不可再分。原子化有种情况上，我的理解是物理上和逻辑上的，物理上就是真的不可分的，比如CPU某一条不可分的指令。逻辑上的是我们封装的一个序列操作，｛op1 ;op2; op3｝即三个操作要么一起执行，要么都不执行，和数据库中的事务类似。

###如何解决竞争条件问题
java中采用的是`序列化访问资源`的方案，即在保证按顺序访问一个资源，而不允许抢占。实现的方案有同步语句块、同步方法以及线程锁机制。基本上来来自于操作系统中的经典解决方案。这个之后详细总结。

####《Thinking in java》中的一个竞争条件的例子
这个例子不是check-and-act，但是他很好的展示了非原子性的操作是怎么造成竞争条件的。我们要做的事情是去不断的检查一个偶数生成器是否正常的产生偶数。为了使数字生成器有更好的扩展性，用一个抽象类来实现生成器：

    public abstract class IntGenerator {
        private volatile boolean canceled = false;
 
        public boolean isCanceled(){
            return canceled;
        }
 
        public void cancel(){
            canceled = true;
        }
        //generate specific code
        public abstract int next();
    }
IntGenerator 这个类只实现了对于数字生成器开关的操作，并提供了生成数字的抽象方法。

	import java.util.concurrent.ExecutorService;
	import java.util.concurrent.Executors;
	 
	public class EvenChecker implements Runnable{
	 
	    private IntGenerator g;
	    public EvenChecker(IntGenerator g){
	        this.g= g;
	    }
	 
	    public void run(){
	        while(!g.isCanceled()){
	            int val = g.next();
	            if(val%2 != 0){
	                System.out.println(val+" not even");
	                g.cancel();
	            }else{
	                System.out.println(val+"even");
	            }
	        }
	    }
	 
	    public static void test(IntGenerator g,int threadNum){
	        ExecutorService pool = Executors.newCachedThreadPool();
	        for(int i = 0; i < threadNum; i++){
	            pool.execute(new EvenChecker(g));
	        }
	        pool.shutdown();
	 
	    }
	}

EvenChecker表示检查偶数的任务，他接受一个IntGenerator对象，并且可以通过其静态方法创建多个线程来执行任务。在run方法中，我们先调用next获取一个生成的数字，然后去判断这个数字是不是偶数。一切看起来都没有什么问题。关键就是next的方法是如何实现的了。

	public class EvenGenerator extends IntGenerator{
	    private int value =0;
	    String blockStr;
	 
	    public int next(){
	        value++;
	        for(int i = 0; i < 100; i++){blockStr+=" ";}  //operation to break 
	        value++;
	 
	        return value;
	    }
	 
	    public static void main(String[] agrc){
	        EvenChecker.test(new EvenGenerator(), 2);
	    }
	}
EvenGenerator是一个偶数生成器，他实现了`next`方法，注意其中利用 `value++`执行两次，来实现生成一个偶数，为了使非原子化效果明显，我们在两条自增语句中加上了一条比较耗时的操作。

运行时发现很快检查工作就结束了：

…….

16even

18even

21 not even

22even

原因就是，当next语句执行到了两条++语句中间的时候，（此刻value是偶数），另一个线程有调用了next方法，并且执行完整，这样返回的value就成了一个奇数了。

你可能会说改写成value+=2,这是一个解决方案，不会影响这个程序的结果，并且可以正常运行，但是也要注意，虽然不会 影响结果，但是value+=2也并非是一个原子的操作。