---
layout: post
title: "Android UI 总结 LinearLayout"
description: "Android中UI开发的布局使用，最基本的linearlayout介绍"
category: tech
tags: android mobile ui
---

> updated 20131015 粗略一些

很长时间没有编写Android UI相关的程序了，最近还是抓时间总结一下。

Android系统中的UI渲染是按照树形结构进行的，每一个节点可以是一个View或者VieGroup。其中view是所有UI组件基类，用于绘制图形界面。而ViewGroup是一种特殊的View，它可以包含一个或者多个View。下图是Android Developer中的一张结构图。

![image](http://developer.android.com/images/viewgroup.png)

Android在渲染UI的时候会从**树根**开始遍历，其中每一个父节点会计算子节点的大小尺寸位置等。我们看到的用户界面其实就是view相互拼接在一起的。为了方便开发不同结构的UI，Android中有了布局的概念，布局就是以某种方式将不同的ViewGroup或者View组织一起。开发者可以选择常用的布局，而很快的构建出一个基本的用户界面。

Android SDK中几个基础的界面布局方式，**LinearLayout**就是其中之一，从名字看一看出，这是一种线性布局，这是最常见的布局之一，比如我们在笔记本上写字就是线性的布局方式，一行一行的，或者一列一列的。这种布局在APP中也比较常见，比如阅读新闻的列表，登录注册的输入框的排列。

LinearLayout 继承自 *ViewGroup* ，更上一层就是View, 所以在xml文件中(Android支持两种UI构建方式，一种是从代码中直接编写，另一种是采用xml布局文件，后者可以更好的分离代码和界面)，LinearLayout有三组属性，分别是来自ViewGroup和View的继承属性，还有属于自己单独的属性。几种常见的是

+ android:orientation   表示布局的方向，可以选择水平或者垂直。
+ android:gravity     用于控制子元素的位置分布，比如 `left`表示靠左对齐。
+ android:layout_gravity   表示当前元素在父元素最中的位置分布。
+ android:layout_weight  处在LinearLayout中的子元素可以设置权重，当布局中存在空余的空间，这部分空间会根据控件的权重进行分配。

下面通过Google 官方的例子,介绍一下。

![](http://developer.android.com/images/ui/sample-linearlayout.png)

其中涉及到的属性有：

`layout_width="fill_parent"` 

表示这个布局的宽度，fill_parent的意思是填充父控件，如果值是 wrap_content的话，就表示只占用所需的空间。代码中LinearLayout的layout_width设置为fill_parent就代表着它的宽度要填充整个屏幕的宽度了。

`orientation:vertical`

表示线性布局的方向是垂直的，也就是里面的控件垂直放置

`paddingLeft="16dp"`

表示线性布局中，左边的padding是16dp,padding的意思是内边距，可以理解为横线与屏幕边缘的距离,dp是Android推荐的尺寸单位，他可以解决不同像素密度的手机上显示兼容的问题，如果用px像素，则不同分辨率的手机可能显示差别很大。

`layout_weight="1"` 

表示 message这个editbox作为一个子元素，在父元素中的权重占有1，可以看到每个子元素的height都是wrap_content就是最小需求，那么剩余的空间就要分配了，这个时候message占有的空间就是`1/(1+0+0+0) = 100%`,如果每一个控件都没有weight,那么剩余控件就是空白，或者说weight相同，那么就将平均分配。

`gravity = "top"`

message的gravity是设置其元素内容的排列方式，top表示message的内容是靠近顶部的。

`layout_gravity="right"`

注意与上面的区别，button的layout_gravity表示按钮在父元素(也就是布局中)的位置是靠右的。


    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"
        android:orientation="vertical"
        android:paddingLeft="16dp"
        android:paddingRight="16dp" >

        <EditText
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:hint="@string/to" />

        <EditText
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:hint="@string/subject" />

        <EditText
            android:layout_width="fill_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:gravity="top"
            android:hint="@string/message" />

        <Button
            android:layout_width="100dp"
            android:layout_height="wrap_content"
            android:layout_gravity="right"
            android:text="@string/send" />

    </LinearLayout>
    
    
> 代码完整参考：[androidSample@github](https://github.com/leeon/androidSample)中的UIDemo


#####参考资料：

+ [Android Developer API Guide](http://developer.android.com/guide/topics/ui/layout/linear.html)