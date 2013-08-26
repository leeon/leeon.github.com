---
layout: post
title: "Java 并发(9)：生产者和消费者"
description: "Java并发，生产者和消费者"
category: tech
tags: java 并发 操作系统
---
这个小系列的最后附带一个多线程解决问题的经典实例，生产者-消费者模型，这个模型已经在网络中被写的各种泛滥，这两天也在网络上看到很多例子，思路个人觉得并不清晰。

现在一点点的理清一下这个思路吧，第一次接触生产者消费者的问题是在大二的操作系统课程中，正是这个问题引出了信号量，互斥量这些重要的知识点。

###情景
接着上篇博客中用到了买票卖票的例子，还拿这个做比喻。首先我们有一个可售的票数，作为一个资源池吧。生产者的任务就是，向里面添加可销售的票，而消费者的任务是来买这里面的票。现在假设只有一个生产者和一个消费者。情景描述到这里，显然出现了三个安全性的需求：

+ 当资源池中票数达到MAX的时候，生产者不能再生产了。
+ 当资源池中票数为0的时候，消费者不能再消费了。
+ 对票池资源的修改过程应该是原子的

那么利用java语言的特性，我们票数增加减少的操作用synchronized同步就可以解决第三个需求，前两个需求也很简单，用判断来约束。

首先创建基本的`Tickets`类，用来表示我们要访问的对象，此外还有一个main方法来进行实验：

{% highlight java %}
public class Tickets{
    public static int volume = 0; //the initialized number of tickets
 
    public synchronized void getIn() throws InterruptedException{
        if(volume == 10){  //set the max volume of tickets 
            wait();
        }
            volume++;
            System.out.println("Produce! volume = "+volume);
            notifyAll();
    }
 
    public synchronized void getOut() throws InterruptedException{
        if(volume ==0){
            wait();
        }
            volume--;    
            System.out.println("Consume! volume = "+volume);
            notifyAll();
    }
 
    public static void main(String[] args) throws InterruptedException{
        Tickets t = new Tickets();
        ExecutorService pool = Executors.newCachedThreadPool();
        pool.execute(new Consumer(0,t));
        pool.execute(new Producer(0,t));
 
        TimeUnit.SECONDS.sleep(2);
        System.exit(0);   //terminate the program
    }
}
{% endhighlight %}

生产者和消费者类似，只有在run行为上不一样：



{% highlight java %}
class Producer implements Runnable{
    private int id;
    private Tickets ticket;
    public Producer(int id,Tickets t){
        this.id = id;
        this.ticket = t;
    }
 
    public void run(){
        while(true){
            try {
                ticket.getIn();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
 
        }
    }
}
{% endhighlight %}


{% highlight java %}
class Consumer implements Runnable{
    private int id;
    private Tickets ticket;
    public Consumer(int id,Tickets t){
        this.id = id;
        this.ticket = t;
    }
 
    public void run(){
        while(true){ 
            try {
                ticket.getOut();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

{% endhighlight %}

上面的例子，可以解决一个生产者一个消费者的问题

###更多的顾客
开始我觉得这段代码对于多个生产者和消费者也是没有问题的，但是运行发现，程序很容易就产生错误了，票池的资源超出了容量的限制了。问题是怎么产生的呢？

+ 从需求的角度上看：多个生产者消费者的不同之处在于多个生产者要竞争生产，所以getIn这个方法是产生问题的区域。
+ 从技术的角度上看：synchronized中调用wait会使得当前的线程放弃锁，再回头看代码，就能发现问题了

修改就是将`getIn`中的`if`控制改为`while`，因为释放了锁，重现得到锁的时候volume是旧值，所以要重新的判断是不是缓冲区已经满了

{% highlight java %}
public synchronized void getIn() throws InterruptedException{
        while(volume == 10){  //set the max volume of tickets 
            wait();
        }          // don't use 'if'  the volume here is old
            volume++;
            System.out.println("Produce! volume = "+volume);
            notifyAll();
    }
{% endhighlight%}

同样getOut也做相同修改，修改main方法，运行多个生产者消费者测试：

…….

Consume! volume = 8

Consume! volume = 7

Consume! volume = 6

Consume! volume = 5

Consume! volume = 4

Consume! volume = 3

Consume! volume = 2

Consume! volume = 1

Consume! volume = 0

Produce! volume = 1

Produce! volume = 2

Produce! volume = 3

Produce! volume = 4

Produce! volume = 5

………

 

从一个非常简单的逻辑上，列举了一个小的例子，算是理清一下思路吧