---
layout: post
title: "Mac上用Sublime Text2取代Source Insight查看源码"
category: code
tags: Mac Sublime 源码 工具
---

##前言

曾经在博客园上写了这么一篇博文[《查看源代码不方便？我有利器》](http://www.cnblogs.com/octobershiner/archive/2012/03/16/2400805.html)，Source Insight是一款很好的软件，到腾讯实习的时候就发现很多同事再用，后来发现在Mac OS 上面没有Source Insight了，但是还有看源码的需求。怎么办呢？

<!-- break -->
在Mac上最喜欢的编辑器就是Sublime Text2,暑假的时候J大神推荐给我的，后来看到鹏哥在云课堂发布的学习计划，[传送一下](http://study.163.com/plan/taskDetail.htm?id=66802#/taskDetail),才发现自己绝对是sublime text 2最低端的玩家。

昨天忽然想到用sublime 的一些功能就可以让这个性感无比的编辑器胜任我在source insight上的工作啦。

拿JDK源码举例子，首先需求很简单，如下：

+ 快速的定位文件
+ 方便查看代码组织结构
+ 快速定位到某一个方法



##Step 1 open a project

Sublime Text 2打开一个project可以通过以下的方式

+ 菜单 File -> Open -> 选择一个文件夹
+ 快捷键 `cmd+o`
+ 把文件夹直接拖到sublime图标上去
+ shell里面输入 `subl someProject` [这个需要配置，参考官方文档] 


## Step 2 show sidebar

sublime默认的是 `cmd+k cmd+b`打开或者关闭sidebar，这这样一个导航就出来了，我已经把这个快捷键改为`ctrl+s`

## Step 3 goto anything

菜单Goto里面有三个选项，分别可以快速的找到file symbol 和line ,输入`cmd+p` 就可以速度非常快的在项目的所有文件中切换了。

比如输入`cmd+p`之后，在搜索烂敲`list@` 搜索栏就会快速的列出list.java文件中所有的方法，如果突然不想跳转过去，直接`esc`就回到源文件了。

Sublime Text2检索文件的效率非常之高，即使一个jdk源码包，他也可以马上定位到。至此需求解决完毕。

## 演示

不知道jekyll的插入视频解决方案，所以直接优酷[连接](http://v.youku.com/v_show/id_XNTM5OTExNjI0.html)

##END

此外新版本的sublime Text2中右侧的小预览条也非常的方便，省去滚动鼠标滚轮的事了。