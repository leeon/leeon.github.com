---
layout: post
title: "由swap引出的java中参数严格值传递问题"
description: "Java中参数传递是严格的值传递，因此交换不容易实现。同时JAVA中对象是用引用维护的，因此会在一些问题上产生混淆。"
category: tech
tags: java 
---

> 晚上看到一篇非常有意思的文章《[Swapping of two numbers](http://www.roseindia.net/java/beginners/swapping.shtml)》,讲的是如何用Java语言实现swap方法。看到作者的代码，实在逗坏了，而且这篇文章在Google搜索如何实现Java swap中排名非常靠前，如果感兴趣可以看一下文章以及评论。

##Bad Swap
实际上类似作者的交换代码，在Java中是无效的。原因是Java中参数传递是**严格**的按照`value`传递的。所以只改变参数**本身**的数值，并不会影响外面。这一点很好理解。

    public void badSwap(int a, int b){
        int temp = a;
        a = b;
        b = temp;
    }


##What about swap two object?

Java的对象实例是用reference来维护的，那么交换两个对象实例会不会有效呢？比如下面的代码结果会怎么样？

    public static void swapObj(Point a, Point b) {
        Point temp = a;
        a = b;
        b = temp;
    }
    
    public static void main(String[] args) {    
        Point px = new Point(0,0);
        Point py = new Point(1,1);
        swapObj(px,py);
    }
    
答案依旧是否定的。原因是当对象作为参数被传递的时候，传进去的实际上也是值，这个值是reference本身的一个拷贝。下图中，当px和py作为参数，进行方法调用时，实际上会生成px和py的一份"拷贝"，注意拷贝的是px和py的值.然后把这对**值**传入了方法，交换结束后，argx和argy各自指向了新的对象实例，但是方法之外的px和py并没有变化，这就是对象实例交换失败的原因。

![](assets/images/2013/java-obj-swap.png)

## Tricky Code

[JavaWorld](http://www.javaworld.com/javaworld/javaqa/2000-05/03-qa-0526-pass.html)的一个问题中，Tony Sintes给出了下面一段Tricky代码，这段代码的结果是什么？


    public void tricky(Point arg1, Point arg2)
    {
      arg1.x = 100;
      arg1.y = 100;
      Point temp = arg1;
      arg1 = arg2;
      arg2 = temp;
    }
    public static void main(String [] args)
    {
      Point pnt1 = new Point(0,0);
      Point pnt2 = new Point(0,0);
      System.out.println("X: " + pnt1.x + " Y: " +pnt1.y); 
      System.out.println("X: " + pnt2.x + " Y: " +pnt2.y);
      System.out.println(" ");
      tricky(pnt1,pnt2);
      System.out.println("X: " + pnt1.x + " Y:" + pnt1.y); 
      System.out.println("X: " + pnt2.x + " Y: " +pnt2.y);  
    }

结果是 赋值成功，交换失败。

    X: 0 Y: 0
    X: 0 Y: 0
    X: 100 Y: 100
    X: 0 Y: 0
    
在方法的内部，赋值操作影响了外面的对象，而交换操作没有效果。原因在`arg1.x`是通过引用实际上操作了方法外面的对象。而交换操作仍然只是改改变arg1参数本身的值.不会影响外面。

##Summary

解释上面例子的两个基本的Rule是：

+ Java中参数传递是严格的值传递
+ Java通过reference来维护对象实例

要在一个方法内部实现外部数据的swap,一个基本的前提是**可以操作到外面的对象**，否则当方法结束返回，所做的操作都没有作用了。本例中我们没有能够操作px和py本身，所以交换操作没有作用。

在C语言中，可以使用传递指针的方式实现有效的`Swap()`,原因在于C提供了直接的`取地址`和`引用地址`的操作。Java则没有提供直接操作内存地址的操作，因此不容易实现形如`swap(Object x,Object y)`的方法。

##Solution
在Java中实现交换，经常借助于数组，一般形式为 
    
    public static void exec(Object[] a, int x, int y);

至于原理，可以按照Rule 2 来理解。



参考资料：

+ [JavaWorld](http://www.javaworld.com/javaworld/javaqa/2000-05/03-qa-0526-pass.html)
+ [Swapping of two numbers](http://www.roseindia.net/java/beginners/swapping.shtml)