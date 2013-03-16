---
layout: post
title: "Java 并发：原子性和可见性"
description: "Java并发，原子性和可见性"
category: Java
tags: [Java,并发,多线程，内存模型]
---
{% include JB/setup %}

>“决定重写这篇博客，写完后，看自己写的东西觉得实在不能容忍，简直是乱七八糟，受不了这>样的状态，对看的人负责，也对自己负责吧”

之前总结了多线程导致的`竞争条件`，产生了线程同步安全的问题，也提到了java解决竞争条件的策略是资源的序列化访问，就是保证同一时刻只有一个线程正在访问资源。这一篇算是介绍解决线程安全问题的理论，当然只能从浅显的道理上出发。首先两个重要的概念是原子性和可见性。

###原子性
关于原子性，有很多不同的定义。从原子的语义上来讲，就是不可再分，不可打断。之前博文中打篮球的例子就是说多个线程打断了一个非原子化的操作，出现了问题。Java中的原子性体现在：“原子性可以应用于除long和double之外的多有基本类型之上的简单操作，对于读取和写入除long和double之外的基本类型变量这样的操作，可以保证他们会被当作不可分（原子）的操作来操作内存”。这里要注意，当java读取64位long或者double变量的时候，可能会发生数字的截断，因为Java内存模型允许64位long和double的高低位分别读取，所以这两种类型的读取没有原子性的保障。原子性不代表了线程安全。还需要可见性的保证。

###可见性
java内存模型`JMM`进行了存储优化，多线程程序中维护串行会有较大的开销。所以JMM设计的使得并行任务尽量的不相干的各自执行，只有共享数据的时候才进行交互。每个线程都有自己的缓存，所有线程共享主存。每个线程本地的数据对其他线程都是不可见的。比如大家共享一个变量i,i在线程A中被写入为`3`，某个时候主存和缓存交换数据，所有的i都更新为`3`，但是这时候线程B把i写为`4`，之后线程A视图读取i，他读取的还是本地缓存的`3`，这就是实时数据不可见的情形。而volatile保证了可见性。

###Volatile关键字
java引入了`volatile`关键字来作为一种能力较弱的同步方案，在JDK 5之前他只保证了可见性，可以把他理解为一种关闭JVM优化的开关，告诉VM要保证各个线程拿到的数据都是主存最新的。 JDK 5之后增加了对于所有基本类型变量读写的原子性保护，也就是64位的double和long使用volatile关键字后也具备了原子性。volatile若想保证线程安全需要具备下面的条件：

- 对变量的写操作不依赖于当前值。
- 该变量没有包含在具有其他变量的不变式中。

比如模拟一个职员数钱的例子：

{% highlight java %}
public class Counter {
    public static volatile int total = 0;  //can volatile make it thread safe ?
    //notThreadSafe
    public void counts(){
        total++;
    }
 
    public static void main(String args[]){
 
        final Counter bankCounter = new Counter();
        for(int i = 0; i < 20000; i++){
            new Thread(){
                public void run(){
                    bankCounter.counts();
                }
            }.start();
        }//expect 20000 here
        try {
            TimeUnit.SECONDS.sleep(5);  //to make sure that all threads are excuted
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
 
        System.out.println("the total money is :"+ Counter.total);
    }
 
}
{% endhighlight%}

上面的小demo运行完后发现结果不是期待的`20000`，而是一个更小的数字。原因就是++不是一个原子的操作，volatile确是保证了拿到了主存中最新的数据，但是自增的这个操作却有可能被打断。图1来自[God Is Coder](http://www.cnblogs.com/aigongsi/archive/2012/04/01/2429166.html) ，很好的表示了java内存模型中线程存取数据的流程。

![](/assets/images/pages/java-concurrency-5.jpg)

上面的流程基本分为三步：

- read and load 从主存将变量取回   线程A取到total在主存最新的值比如`99` （中断）线程B取到最新的值 `99`
- use and asign  赋值使用  线程A 执行`i+1` （中断）线程B执行 `i+1`
- store and write  写回主存 线程A本地赋值`i =100` 写回主存 线程B本地存储`i=100`写回主存

所以我的理解还是volatile只能保证我们读到最新的值。volatile这样一看，和synchronized比起来，貌似没有什么使用的价值了，但是毕竟更小范围的能力的带来的也是更高的性能。[《Java 理论与实践: 正确使用 Volatile 变量》](http://www.ibm.com/developerworks/cn/java/j-jtp06197.html)一文中讲述了volatile的一些推荐使用场景。

其实看了里面提到了一些模式之后，会发现每一个模式都比较危险，我们使用每一个模式的时候都有一个前提，保证原子性。比如 volatile bean中也是需要getter 和setter里面只有简单的赋值取值操作。

文中最后一个`“读-写锁”`策略是一个不错的启示，为了实现真正的线程安全的“数钱”例子，我们可以用`synchronized`将 “写”这个过程同步，这种情况适用于写远大于读的情景，可以提高效率。

{% highlight java %}
import java.util.concurrent.TimeUnit;
 
public class Counter {
    public static volatile int total = 0; 
    //ThreadSafe
    public synchronized void counts(){
        total++;
    }
 
    public static void main(String args[]){
 
        final Counter bankCounter = new Counter();
        for(int i = 0; i < 20000; i++){
            new Thread(){
                public void run(){
                    bankCounter.counts();
                }
            }.start();
        }
 
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("the total money is :"+ Counter.total);
    }
 
}
{% endhighlight %}

