---
layout: post
title: "Java 并发(7)：中断线程"
description: "Java并发，中断线程"
category: tech
tags: java 并发
---
其实线程还有一个重要的状态就是`中断`。比如某个非常耗时的线程阻塞了整个程序的执行，这就有需要终止这个线程。查看现在的java api时还会看到下面的几个方法。

- stop()
- suspend()
- resume()


这些方法都已经过时了，不在推荐使用。oracle官方的一篇文章[《Java Thread Primitive Deprecation》](http://docs.oracle.com/javase/6/docs/technotes/guides/concurrency/threadPrimitiveDeprecation.html)解释了这几个方法已经替代的方案。其中stop的调用会使得一个线程立即结束，并且释放其所持有的所有锁。那么如果此刻恰好执行到一个synchronized方法，那么原子操作就失效了。数据就会遭到破坏。suspend方法会让一个线程阻塞并且等待reume，但是如果此时他的唤醒需要另一个线程资源，而另一个线程因为得不到锁也被阻塞，那么死锁便出现了。

`interrupt()`  `interrupted()`  `isInterrupted()`
现在停止线程的几个重要方法就是interrupt系了。

`public void interrupt()`
首先要明确interrupt方法的作用，这是一个对象方法，当调用的时候并不是立刻中断线程，而只是设置了中断标记了，（很多人在问为什么调用interrupt之后，线程还没有停止）。一个被置中断的线程当遇到阻塞的时候就会比如sleep wait等，就会使线程抛出IntteruptedException。

`public static boolean interrupted()`
interrupted是静态方法，他返回当前调用线程是否处于中断状态，并且清空当前的中断置位。他的实际实现是：
{% highlight java %}
public static boolean interrupted() {
        return currentThread().isInterrupted(true);
    }
{% endhighlight %}

`public boolean isInterrupted()`
这个方法属于对象方法，调用的时候值返回调用线程是否处于中断的状态，而不会清空其中断置位。他的实现是

{% highlight java %}
public boolean isInterrupted() {
        return isInterrupted(false);
    }
{% endhighlight %}

这个很有意思，interrupted和isInterrupt实际上都是调用了一个本地方法isInterrupted(clear).

都可以中断吗？
下面是一个来自《Thinking in java》中的一个例子，实现了三个不同类型的阻塞线程，分别是sleep，IO阻塞，和synchronized语句块阻塞然后试图用interrupt去中断这些线程。


{% highlight java %}
class SleepBlock implements Runnable{
 
    public void run(){
        try{
            TimeUnit.SECONDS.sleep(100);
        }catch(InterruptedException e){
            System.out.println("catch InterruptedExcetion");
        }
 
        System.out.println("leaving run() from SleepBlock");
    }
}{% endhighlight %}

应该是使用finally来保证unlock的执行，如果同步的代码出现异常，那么我们可能永远解不开这个锁了。

ReentrantLock还有一个重要的地方是：它的构造器可以接收一个boolean的参数，来制定这个锁是不是公平的。意思就是如果锁是公平的，则他的获取顺序与线程请求锁的顺序是一致的，相反非公平的话表示JVM会择优调度线程来获取锁。Java中的默认实现都是非法公平的锁：JDK ReentrantLock.java部分代码：

{% highlight java %}
public ReentrantLock() {
        sync = new NonfairSync();
    }
 
    public ReentrantLock(boolean fair) {
        sync = fair ? new FairSync() : new NonfairSync();
    }
{% endhighlight %}


{% highlight java %}
class IOBlock implements Runnable{
    private InputStream in;
    public IOBlock(InputStream in ){
        this.in  = in;
    }
    public void run(){
        try {
            System.out.println("calling read");
            in.read();
        } catch (IOException e) {
            if(Thread.currentThread().isInterrupted()){
                System.out.println("interrupted the IO thread");
            }else{
                throw new RuntimeException();
            }
 
        }
        System.out.println("leaving run() from IOBlock");
    }
}
{% endhighlight %}

这个任务等待输入以达到阻塞的目的。



{% highlight java %}
class SyncBlock implements Runnable{
 
    public SyncBlock(){
        new Thread(){
            public void run(){
                f();
            }
        }.start();
    }
    public synchronized void f(){
        while(true){
            Thread.yield();
        }
    }
    public void run(){
        System.out.println("Calling f()");
        f();
        System.out.println("leaving run() from SyncBlock");
 
    }
}
{% endhighlight %}

SyncBlock中run试图调用同步方法f，这样就会被一直阻塞

{% highlight java %}
public class InterruptTest {
    private static ExecutorService pool = Executors.newCachedThreadPool();
 
    public static void test(Runnable task) throws InterruptedException{
        Future<?> f = pool.submit(task);
        TimeUnit.MILLISECONDS.sleep(3);
        System.out.println("interrupting "+task.getClass().getName());
        f.cancel(true);
        System.out.println("interrupt sent to "+task.getClass().getName());
 
    }
    public static void main(String[] args) throws InterruptedException{
        test(new SleepBlock());
        test(new IOBlock(System.in));
        test(new SyncBlock());
        TimeUnit.SECONDS.sleep(3);
        System.exit(0);
    }
 
}
{% endhighlight %}

静态方法用来测试每一个线程是否可以中断，因为interrupt是对象方法，我们需要拿到其引用才可以调用。在这里利用了线程池submit方法，这个方法之前的博客中已经介绍过，callable做参数的时候，可以用他来获取线程的执行结果，同时他的另一个用途是我们能够拿到线程的引用，并调用其cancel方法。cancel方法的内部实现会向线程执行interrupt方法。

mian方法中，分别测试三个示例之后，最后调用`exit`，原因你懂得。。。

最后的执行结果就是：

interrupting SleepBlock

catch InterruptedExcetion

leaving run() from SleepBlock

interrupt sent to SleepBlock

calling read

interrupting IOBlock

interrupt sent to IOBlock

Calling f()

interrupting SyncBlock

interrupt sent to SyncBlock


可以看到，第一个SleepBlock在调用`interrupt`之后，被打断了，抛出了interruptException.而IO阻塞和后面synchronized阻塞都无法被interrupt中断。

###如何打断IO阻塞线程
java提供的方案中，可以关闭阻塞的IO流来实现线程的可中断。当调用cancel之后，关闭System.in就可以实现线程的中断。在java的新的NIO操作中，都提供了可中断。更加的方便了。上面的例子中，在中断调用结束之后，再运行试一下:

{% highlight java %}
System.in.close(); // try it
{% endhighlight %}

###如何打断synchronized阻塞线程
这里要注意，java中互斥锁reentrantLock阻塞是可以被中断的，因此没有这些问题。同步方法阻塞的中断，往往需要我们用isInterrupted或者interrupted方法来控制循环语句，这样来保证可以处理中断的操作。比如：

{% highlight java %}
public synchronized void f(){
        while(Thread.currentThread().isInterrupted()){
            Thread.yield();
        }
    }
{% endhighlight %}
