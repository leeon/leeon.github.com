---
layout: post
title: "Java 并发(6)：同步与锁"
description: "Java并发，同步与锁"
category: tech
tags: java 并发
---
java为线程安全同步提供了两种解决方案，分别是`synchronized`和`Lock`

###synchronized
synchronized实现了类似操作系统临界区这样的一个功能，就是使得一段代码在同一时刻只有一个线程可以执行来保证线程同步的安全性。它可以作为一个方法的签名比如：
    
    public synchronized void someFun(){
        //.....do something thread safe
    }


那么这个方法就是一个同步方法，synchronized对应了一个同步对象，相当于他锁定了某个对象被同步了，当你调用一个对象的同步方法的时候，那么他的所有同步方法和同步区域都会被当前线程锁定，当方法执行结束便自动释放了。

当然有时候只需要同步一部分代码而非整个方法，这个时候可以使用同步语句块，比如：

    synchronized(syncObject){
        //code to be synchronized 
    }
这里括号里面要指定同步的对象，大部分情境下我们都会使用this，来表示当前调用的对象被锁定。当然也可以锁定其他的对象。通常同步代码语句块比同步方法更加的灵活。

###Lock
Lock是java后来新加入的锁机制。他拥有和synchronized相同的并发性和内存语义，同时他给线程同步带来了很大的灵活性，原因主要是：

- Lock提供接口，开发者可以实现自己所需特定的锁
- 锁机制提供了ReentrantLock 、ReentrantReadWriteLock多种不同的锁满足不同情景下的优化
- 灵活的控制获取锁操作（tryLock）和释放锁(危险)

但是更高的灵活性，带来的也是更大的风险，使用lock必须保证锁可以正常的释放，否则就一直阻塞下去了。lock典型的用法是：

    public void fun(){
        Lock lock = new ReentrantLock();
        lock.lock();  // get the lock
        try{
            // do something thread safe 
        }finally{
            lock.unlock();   // very important!
        }    
    }
应该是使用finally来保证unlock的执行，如果同步的代码出现异常，那么我们可能永远解不开这个锁了。

ReentrantLock还有一个重要的地方是：它的构造器可以接收一个boolean的参数，来制定这个锁是不是公平的。意思就是如果锁是公平的，则他的获取顺序与线程请求锁的顺序是一致的，相反非公平的话表示JVM会择优调度线程来获取锁。Java中的默认实现都是非法公平的锁：JDK ReentrantLock.java部分代码：

    public ReentrantLock() {
        sync = new NonfairSync();
    }
 
    public ReentrantLock(boolean fair) {
        sync = fair ? new FairSync() : new NonfairSync();
    }
lock的灵活性还体现自`tryLock`的使用，他表示线程尝试着去获取当前的锁，如果成功返回true，拿到锁；如果失败则返回false，而不需要阻塞等待可以去执行其他的事情。这个方法可以大大的优化并发程序的执行。

tryLock还可以接收一个时间参数，定时的请求锁，如果在time内没有请求到，则放弃锁而去做其他的事情。下面是一段tryLock应用的代码：

	import java.util.concurrent.TimeUnit;
	import java.util.concurrent.locks.*;
	 
	public class LockTest {
	 
	    public static Lock lock = new ReentrantLock();  // one lock
	 
	    public void untimedTry(){   //if fail;leave at once
	        boolean success  = lock.tryLock();
	        try{
	            System.out.println("untimedTry get it: "+success);
	        }finally{
	            if(success){
	                lock.unlock();
	            }
	        }
	    }
	    public void timedTry(){  //try for some time ;if fail ,leave
	        boolean success = false;
	        try {
	            success = lock.tryLock(3, TimeUnit.SECONDS);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	 
	        }
	 
	        try{
	            System.out.println("timedTry get it: "+success);
	        }finally{
	            if(success){
	                lock.unlock();
	            }
	        }
	    }
	 
	    public static void main(String args[]){
	        final LockTest t = new LockTest();
	 
	        t.timedTry();
	        t.untimedTry();
	        new BlockThread(t.lock).start();
	        Thread.yield();  // to let the block thread excute
	        t.timedTry();
	        t.untimedTry();
	 
	    }
	}
	 
	class BlockThread extends Thread{
	    private Lock l = null;
	    public BlockThread(){}
	    public BlockThread(Lock lock){
	        this.l = lock;
	 
	    }
	 
	    public void run(){
	        if(l != null){
	            l.lock();
	            System.out.println("get the lock in new thread");
	            // never unlock bad guy!
	        }
	    }
	}

这个程序里，主线程和BlockThread会争抢一把锁

最后运行的结果是：

timedTry get it: true

untimedTry get it: true

get the lock in new thread

timedTry get it: false

untimedTry get it: false


如果在此例子中使用lock则会导致后面的等待锁一直阻塞

锁机制还涉及套条件阻塞，后面总结。


 

####参考资料：

- [《Thinking in java》](http://book.douban.com/subject/2130190/)

- [《Java theory and practice: More flexible, scalable locking in JDK 5.0》](http://www.ibm.com/developerworks/java/library/j-jtp10264/?S_TACT=105AGX52&S_CMP=cn-a-j)

- [《Java API 6》](http://docs.oracle.com/javase/6/docs/api/)

