---
layout: post
title: "java多线程 sleep()和wait()的区别"
description: ""
category: tech
tags: java 并发
---
接触了一些多线程的东西，还是从java入手吧。

相信看这篇文章的朋友都已经知道进程和线程的区别，也都知道了为什么要使用多线程了。

这两个方法主要来源是，sleep用于线程控制，而wait用于线程间的通信，与wait配套的方法还有notify和notifyAll.

###区别一：

`sleep`是Thread类的方法，是线程用来 控制自身流程的，比如有一个要报时的线程，每一秒中打印出一个时间，那么我就需要在print方法前面加上一个sleep让自己每隔一秒执行一次。就像个闹钟一样。

`wait`是Object类的方法，用来线程间的通信，这个方法会使当前拥有该对象锁的进程等待知道其他线程调用notify方法时再醒来，不过你也可以给他指定一个时间，自动醒来。这个方法主要是用走不同线程之间的调度的。


###区别二 ：

关于锁的释放 ，在这里假设大家已经知道了锁的概念及其意义。调用sleep方法不会释放锁（自己的感觉是sleep方法本来就是和锁没有关系的，因为他是一个线程用于管理自己的方法，不涉及线程通信）

JDK 7 中的解释：

**public static void sleep(long millis)**

throws InterruptedException
Causes the currently executing thread to sleep (temporarily cease execution) for the specified number of milliseconds, subject to the precision and accuracy of system timers and schedulers.The thread does not lose ownership of any monitors.
 

**public final void wait() throws InterruptedException**

Causes the current thread to wait until another thread invokes the notify() method or the notifyAll() method for this object. In other words,  this method behaves exactly as if it simply performs the call wait(0).The current thread must own this object's monitor. The thread releases ownership of this monitor and    waits until another thread notifies threads waiting on this object's monitor to wake up either through a call to the notify method  the notifyAll method. The thread then waits until it can re-obtain ownership of the monitor and resumes execution.“  


调用wait方法会释放当前线程的锁（其实线程间的通信是靠对象来管理的，所有操作一个对象的线程是这个对象通过自己的wait方法来管理的，就好像这个对象是电视机，三个人是三个线程，那么电视机的遥控器就是这个锁，假如现在A拿着遥控器，电视机调用wait方法，那么A就交出自己的遥控器，由jVM虚拟机调度，遥控器该交给谁。）
> 我想到一个好玩的例子：如果A拿遥控器的期间，他可以用自己的sleep每隔十分钟调一次电视台，而在他调台休息的十分钟期间，遥控器还在他的手上~



###区别三：

使用区域  

由于wait函数的特殊意义，所以他是应该放在同步语句块中的，这样才有意义。

注意：两个方法都需要抛出异常

个人见解：有sleep和wait的第二个区别，引起了我对Java线程机制的一个疑问，目前还没有看过JDk这方面的源码（其实看了，是木有看懂），线程的同步管理，是不是由对象在调度，如果是对象在调度，那么JDK 1.5新引入的ReentrantLock机制就比synchronized关键字更值得提倡。因为他更能反映出这么一个机制来。好多人不能理解wait和sleep的区别，我认为就是因为synchronized关键字的影响。当然自己还不懂JAVA的线程具体实现，留作疑问以后有时间继续研究吧



> 这个小专题貌似是学长学姐们经常面面试的题目，感谢他们的经验分享~
   


