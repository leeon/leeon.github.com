---
layout: post
title: "Java 并发：线程管理"
description: "Java并发，多线程管理"
category: Java
tags: [Java,并发,多线程]
---
{% include JB/setup %}

Java中线程的管理首先要知道两个概念：`线程组`和`线程池`。两者均可以用来管理多个线程，但是应用场景不相同，二者也没有必然的联系。

###线程组
*ThreadGroup*是用来表示一组线程，线程组也可以包含其他的线程组，他是一个树形的结构。每一个结点的父节点就是他所属的线程组。JDK原文解释线程组的作用是这样的:

>A thread is allowed to access information about its own thread group, >but not to access information about its thread group’s parent thread >group or any other thread groups. 

也就是线程允许在其所在的线程组内之间访问数据，而不能访问父线程组和其他线程组。这一点至今，我还没有什么体会。能感受到的就是，当有多个线程执行相同的任务的时候，线程组可以方便的管理。

ThreadGroup提供了两种构造器：
![](/assets/images/pages/java-concurrency-2.png)

其中线程组必须要指定一个名字，父线程组是可选的，默认选择当前线程的线程组作为父节点

{% highlight java %}
public ThreadGroup(String name) {
        this(Thread.currentThread().getThreadGroup(), name);
    }
{% endhighlight%}

java虚拟机会生成一个叫做system的线程组,作为线程组树形结构的根节点，他是惟一一个没有父节点线程组。

{% highlight java%}
private ThreadGroup() {     // called from C code
        this.name = "system";
        this.maxPriority = Thread.MAX_PRIORITY;
        this.parent = null;
    }
{% endhighlight%}

下面的代码分别用两种构造器创建线程组，实际上实现的效果是一样的，我们在main线程下创建两个新的线程组group1和group2

{% highlight java%}
 ThreadGroup group1 = new ThreadGroup("group1");
 ThreadGroup group2 = new   ThreadGroup(Thread.currentThread().getThreadGroup(),"group2");
 System.out.println(group1.getParent());
 System.out.println(group2.getParent());
{% endhighlight%}

当一个线程组的线程需要中断的时候，调用interrupt方法可以结束整个线程组的所有线程。

###线程池
线程池是`JDK 5`后开始使用的新的特性，主要是为了提高线程的利用效率。其中最重要的一个借口是`ExecutorService`,他继承自Executor。Executor接口中只声明了一个方法execute(Runnable command),我们可以通过ExecutorService的execute方法去实现某个任务command.

首先要获得一个ExecutorService的实例，`Excutors`类提供了不同的工厂方法来获取ExecutorService的实例。其中包括：

####newCachedThreadPool
最常用，创建一个线程池，线程池的线程数是按需创建的。当有新的任务需要execute的时候，如果线程池中没有线程空闲，则创建新的线程来执行，否则就利用空闲的线程来执行新的任务。当线程池中某个线程6秒钟没有使用，则将线程移除。这就看出了线程池的意义，线程的创建和销毁是消耗比较大的操作，线程池可以很好的利用这些线程资源，提高效率。下面是一个使用的例子。

{% highlight java%}
public class LiftOff implements Runnable{
    protected int countDown = 10;
    private static int taskCount =0;
    private final int id = taskCount++;
 
    public LiftOff(){}
    public LiftOff(int countDown){
        this.countDown = countDown;
    }
 
    public String status(){ 
        return "#"+id+"("+(countDown > 0 ? (""+countDown) :"LiftOff!")+")";
    }
    @Override
    public void run(){
        //System.out.println(Thread.currentThread().getPriority());
        while(countDown-- > 0){
            System.out.println(status());
            Thread.yield();
        }
    }
}

    public static void main(String [] argc){
        ExecutorService pool = Executors.newCachedThreadPool();
        for(int i = 0; i < 3; i++)
            pool.execute(new LiftOff());
        pool.shutdownNow();
    }
{% endhighlight %}


####newFixedThreadPool
接收一个int参数，即创建指定线程数的线程池。当任务数超过线程数的时候，任务进入队列等待执行，如果某个任务执行终止，将用新的任务来替代。线程在shutdown之前不会消亡。

####newSingleThreadExecutor
这是FixedThreadPool的一个特例，即只有一个线程的线程池。它可以保证任务的顺序执行，关于SingleThreadExcutor和FixedThreadPool(1)的区别，JavaDoc的一段话:
>Unlike the otherwise equivalent newFixedThreadPool(1) the returned >executor is guaranteed not to be reconfigurable to use additional >threads。

翻译过来就是说singleThread可以保证线程池不会有额外的线程加入即任何时刻都只有一个线程。[stackoverflow](http://stackoverflow.com/questions/3911100/any-difference-among-executors-newsinglethreadexecutor-and-executors-newfixedt)上有人回答了这个问题。newFixedThreadPool不能保证的原因是其setCorePoolSize方法可以更改线程池的容量。

####newScheduledThreadPool
创建一个指定size的线程池，可以指定其执行的延时和频率。

####获取线程任务的返回值
ExecutorService中还有一个重要的方法submit，他接收一个callable的参数，callable是一个接口，只声明了一个方法 V call() throws Exception; callable和runnable都是为多线程设计的，区别是callable带有返回值和检查类型的异常。

我们在call中进行任务的具体实现：

{% highlight java%}
import java.util.Random;
import java.util.concurrent.Callable;
 
public class Speaker implements Callable{
    @Override
    public String call(){
        return ""+new Random().nextInt();
    }
}

{% endhighlight%}

这个任务只是简单的返回一个随机数字。之后通过submit方法传入这个callable参数，submit方法的原型是Future<?> submit(Runnable task)，我们可以通过Future的get方法获取执行的结果：

{% highlight java%}
public static void main(String [] argc){
        ArrayList<Future<String>> results = new ArrayList<Future<String>>();
        ExecutorService pool = Executors.newCachedThreadPool();
        for(int i = 0; i < 5; i++)
             results.add(pool.submit(new Speaker()));
 
        for(Future item : results){
            try {
                System.out.println(item.get());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }finally{
                pool.shutdown();
            }
        }
    }
{% endhighlight%}


以上就是线程管理的基本知识，接下来还是继续好好梳理一下吧.