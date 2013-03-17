---
layout: post
title: "Java 并发：线程协作"
description: "Java并发，线程协作"
category: 程序設計
---
{% include JB/setup %}
>前边总结了线程自身状态的切换以及多线程访问共享资源的互斥，在实际的程序中多个线程之间往往是需要相互协作的。比如当前火热的火车购票，购买这个操作实际上就是一个多线程同步的操作，他们都请求车票这个资源。但是只有当票池中没有准备好票的时候，所有的购票线程应该是等待的。

java中提供线程等待的方法是：

####public final void wait() throws InterruptedException

其实这个说法并非恰当，`wait`是Object的方法，而非线程的方法。他也正是解决多个线程顺序访问共享资源的问题。当在一个同步对象调用wait方法时，表示当前线程进入等待状态，并且释放其所拥有在该对象上的锁。此线程将不会再处于可调度队列，直到其他线程调用了`notify`，并且该线程被选中为唤醒；或者其他线程调用了`notifyAll`；也或者该线程被中断。又或者调用带有时间参数的`wait`方法。

带有时间参数的`wait`方法表示指定之间过后将停止等待，但实际上他仍要等待锁。也就是说并不是时间到了就一定继续执行了。

java 提供唤醒的方法是

####public final void notifyAll()

####public final void notify()

两者的区别从字面上就很容易看出来了。第一个方法会唤醒所有等待该对象的线程（注意：`notifyAll`是对象的方法，他唤醒的是等待该对象的所有方法）。这些方法进入调度队列，竞争资源。而notify方法只会唤醒一个线程，该线程去和其他线程争抢锁。所以使用`notify`的时候要格外小心，因为要确保真的是只有一个线程在`wait`(当然也有特殊情况，视需求而定)。

###一个实例
下面回到火车购票这个话题上面来，首先假设票的资源是无比充足的。首先我们创建一些Consumer任务线程去抢票。由于未开始准备，所以都要wait。直到Ticket发出notifyAll，这些线程就可以唤醒去买票了。

{% highlight java %}
class Ticket{ 
 
    public static boolean isReady = false;
    public synchronized void get() throws InterruptedException{
        while(!isReady){
            wait();
        }
    }
 
    public synchronized void setAvailable(boolean available){
        isReady = available;
        notifyAll();
        if(isReady)
            System.out.println("The tickets are ready.");
    }
}
{% endhighlight %}

{% highlight java %}
class Consumer implements Runnable{
 
    private int id;
    private Ticket ticket;  //compete for this object
 
    public Consumer(int id,Ticket t){  
        this.id = id;
        this.ticket = t;
    }
 
    public void buy(Ticket t) throws InterruptedException{
        System.out.println("Consumer "+this.id+" is waiting for tickets");
        t.get();
        System.out.println("Consumer "+this.id+" gets the tickets");
    }
 
    public void run(){  // just buy it 
        try {
            buy(ticket);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
{% endhighlight %}

注意Consumer要拿到ticket这个对象。

{% highlight java %}
public class TicketsManage {
 
    public static void main(String[] args) throws InterruptedException{
        Ticket t = new Ticket();
        ExecutorService pool = Executors.newCachedThreadPool();
 
        for(int i = 0; i < 6; i++){ //here we get 6 consumer
            pool.execute(new Consumer(i,t));
        }
 
        TimeUnit.MILLISECONDS.sleep(100); //let the consumer wait...--
        t.setAvailable(true);    // begin the tickets selling
        pool.shutdown();
    }
 
}
{% endhighlight %}

程序的执行结果就是：

Consumer 0 is waiting for tickets

Consumer 2 is waiting for tickets

Consumer 4 is waiting for tickets

Consumer 1 is waiting for tickets

Consumer 3 is waiting for tickets

Consumer 5 is waiting for tickets

The tickets are ready.

Consumer 5 gets the tickets

Consumer 3 gets the tickets

Consumer 4 gets the tickets

Consumer 1 gets the tickets

Consumer 0 gets the tickets

Consumer 2 gets the tickets

以上就是一个线程间协作的基本用法，其实这里有些概念很绕。特别是在对象个线程之间。有许多人对sleep和wait之间产生了疑问。很早之前曾经写过一篇*《java多线程 sleep()和wait()的区别》*，现在读起来也觉得挺有意思的。

