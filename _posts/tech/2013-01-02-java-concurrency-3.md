---
layout: post
title: "Java 并发(3)：线程切换"
description: "Java并发，多线程之间的切换"
category: tech
tags: java 并发
---
多线程必然涉及到的一个话题就是线程之间的切换，首先要明确两个概念：线程的`状态`和`优先级`。

###线程状态
java中线程分为六种状态：下面是javaDoc中的介绍：

![](/assets/images/pages/java-concurrency-3.png)

其实`BLOCKED` `TIMED_WATING` `WAITING`三个可以归为一类：*阻塞状态*。其中BLOCKED表示线程正在等待锁。TIMED_WAITING表示时间等待，比如sleep之类的导致的。WAITING表示等待线程可能是由于wait导致的.

NEW表示一个线程的新生状态，即new的线程，还没有调用start。RUNNABLE表示可运行的，这其中有两种可能。一是线程正在运行，二是可能再等待资源。TERMINATED就是挂掉了。。以上就是线程的基本周期，NEW和TERMINATED状态只会出现一次，线程基本上是在runnable和wait之间不断转换的。

- MAX_PRIORITY   10
- MIN_PRIORITY   1
- NORM_PRIORITY  5

一个普通线程默认的优先级就是 *NORM* 即 5.可以调用`setPriority`来给线程指定优先级，但是永远不要希望通过优先级来保证线程的调用顺序。`《Thinking in java 》`中给出的建议是尽量在run方法中去指定优先级，在初始化的时候指定优先级没有意义。

###线程切换
第一个比较常用的方法是`yield()`.当某个线程调用yield的时候表示通知虚拟机此线程已经完成了重要的任务，可以将让步给其他线程执行了，但是这个方法也是无法保证一定生效的。一般适用于优化程序的执行效率。

第二个方法是`sleep()`，顾名思义是休眠的意思，就是使得当前的线程进入休眠的状态，他接受一个参数long类型，使得线程睡眠mills时间。但注意mills时间过后，thread并不能保证立即开始执行，因此调用sleep的时候传进的参数是唤醒该线程的最短时间。

JDK 1.5之后引入了`TimeUnit`类，他也有一个sleep方法，和thread的sleep效果是一样的.

所以调用sleep就有了三种方式,比如睡眠五秒

    Thread.sleep(1000*5);
    Thread.currentThread.sleep(1000*5);
    TimeUnit.SECONDS.sleep(5)
三种效果一模一样，但是先让风格最好的是第三个，最差的是第二个。（第二个是用一个实例调用了静态方法）

###线程合并
合并用到的是join方法，这不是一个静态方法，应用情景是在一个线程中调用调用另一个线程对象的join方法，表示两个线程合并为一，当前线程要等待另一个线程执行结束后执行。

比如主线程 调用 `t.join()` 那么主线程就会等待t线程执行完毕再继续执行，从某种程度上可以保证线程的执行顺序。