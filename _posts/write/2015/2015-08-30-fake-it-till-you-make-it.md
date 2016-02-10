---
layout:    post
title:     苹果团队App开发流程|Fake it till you make it
category:  write
description: WWDC 2014 上，Apple的原型设计团队分享了公司内部的一套App开发流程。在完成App之前不断的进行原型迭代，这个过程中，原始的idea逐步变的更加具体真实，最终达到满意的用户体验和达到预期的目的。本文包含了两部分，前半部分介绍Apple的工作流，并且加上了个人理解；后半部分是Apple用一个虚拟的项目展示了如何快速完成一个三轮迭代。
tags: 设计 原型 App
---

WWDC 2014 上，Apple的原型设计团队分享了公司内部的一套App开发流程。在完成App之前不断的进行原型迭代，这个过程中，原始的idea逐步变的更加具体真实，最终达到满意的用户体验和达到预期的目的。本文包含了两部分，前半部分介绍Apple的工作流，并且加上了部分个人理解；后半部分是Apple用一个虚拟的项目展示了如何快速完成一个三轮迭代。


#开始一个App ？

说起做一个App，通常简单的想法是，我有一个很cool的idea，按照这个想法做成App，接下来的要关心的事情就是数钱了：）


![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/1.png){:style="max-width:700px"}


然而实际情况往往并非如此。在完成一个App的过程中，对于团队,可能会遇到资金不足，时间不够，人员流动，协作成本等种种问题；对于独立开发者也可能会有项目进度、自律等问题。最终成功的都是少数，结果一般是悲剧的:(

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/2.png){:style="max-width:700px"}


在我经历的几个项目中，成功的经历总是相似，失败则各不相同。独立开发过程中，影响因子大多集中到开发者本身，开发者自身的时间管理、架构设计、产品观，设计技能以及coding能力都会成为关键。目前由于Sketch、云服务等工具的普及，独立开发者可能存在的一些短板得到了一定的补充，所以App的成功率也在不断提高。这里成功的定义是开发者在预期的时间内完成了符合要求的产品。

团队开发中，众多影响项目的因素分布在每一个人身上。我的体会是，团队开发App成功，要么团队有一个独裁式的核心人物，他能保证一切正常的运转，要么团队由少数自我推动能力较强的人构成。第二种情况中，团队成员更容易感受到做一件事情的激情，例如[WI输入法](http://wi.hit.edu.cn/)团队在开发Android一个版本时，三个核心开发者都处在忙碌的大三学期，但最终保证了在一个学期左右的时间，快速的完成beta版本。又经历了四个月的迭代，以一个成熟的App发布到市场上并获得50万用户。我们在迭代中的做法是不断通过邮件发给内测用户beta版本并抄送给一些热心关注的学校老师，听取反馈，持续改进。

Apple的做法就是：一个App的诞生都是从idea 经过不断的原型迭代，逐步的去接近其目标的体验，变得更加具体真实，最后成为真实的产品给用户。


{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/3.png){:style="max-width:700px"}



#为什么进行原型迭代？

**验证产品**

原型可以快速的去验证你是否在做正确的事情，及时发现问题可以大大节省时间和金钱。有时候，产品一口气做到底，才发觉功能和体验与最初的目标已经大相径庭了。比如有人会提出这个很炫，那个很好玩，而忽略了产品最本质的东西。微信就不会因为各种生活服务而忽略其核心的沟通功能，“消息”和“通讯录” 永远在最直接的位置。

**激发想法**

在迭代的过程中，可能会想到更好的体验。一个App在设计稿上，在设备上，在用户手里都会有不同的体验。原型迭代可以让产品的体验尽可能保持一致，而不致于出现想法和实践上的不统一。

#如何进行原型迭代？

在每一轮迭代中，要做三件事情

1. 制作原型
2. 把App给别人看
3. 从反馈中总结经验

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/4.png){:style="max-width:700px"}




**制作原型**

> 哪些部分需要更加真实具体一些？

两个用户界面，在最初的原型里可能只是陈列起来，从页面A到B是经过怎样的转换，这个功能指引并没有在原型中体现出来，这里就是需要更加具体真实的。

> 我们可以去模拟哪些部分？

可以模拟一些icon，和列表内容。UGC的产品可以模拟已经存在的内容。

> 用户在什么场景下使用？

这是非常关键的一个问题，好的设计应该是考虑到使用场景的。例如一款经常在户外使用的App,就要考虑其视觉上是否可用，或者更明确的让用户看到其要使用的功能。我觉得App应该是向场景化靠近的，如何在特定的环境下让用户以最短路径达到目的是在完成App是必须要考虑的问题。

不仅交互应该尊崇场景化，功能设计也应该考虑场景。百度地图在查询公交线路的时候，会考虑由于班车线路时间导致的错过班车的问题，同类产品却忽略了这个关键的场景因素。

生活场景互联网化，有三个阶段：首先互联网可以**承载**生活中的信息，地图App将班车线路从生活转向互联网，其次互联网可以**加工**生活中的信息，地图App又能根据你的出发和到达计算线路。最后，互联网可以**延伸**生活的信息，即根据的你的线路可能会推断出你的出行意图，进而提供一下阶段的服务，形成闭环。忽略场景的App在这条线路上可能是不完整的，也可能是恶性的循环，考虑那些毫无相关性打扰用户的push消息。





**给用户展示**

> 你的用户是谁？

明确目标用户很关键，从非目标用户身上，甚至有可能受到错误的反馈。

> 你知道怎么使用XX功能吗?

这里要验证App的核心功能是不是能够容易的被用户感知和使用。

> XX功能是不是用起来很简单？

在满足可用性的基础上，要考虑功能的易用性。

> 我们怎么能使这个功能更好？

倾听反馈，向用户请教，不要辩驳或者否认。

最后，总结反馈的时候，我们要思考：

1. 哪些是正确的？
2. 哪些是错误的？
3. 我们还获得了哪些idea？




#一个例子


Apple展示了一个快速的三轮迭代的过程，它们的原型从最初简单的图片展示，到简单动画效果，最后到了交互展示。这也是一个App从最初的概念界面，逐步具体化，最后到动态交互的一个过程。他们通过Keynote完成静态界面和动画的制作，使用Objective-C 来编写简单的程序实现基本的交互演示。

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/5.png){:style="max-width:700px"}



**第一阶段Pictures**

在最初的阶段, 你可能想到自己的App有几种布局，大概有 list view, grid view, 或者gallery view 几种。这些基本的页面布局在iOS内置应用中已已经有现成的应用了，例如下面的list view就是通过iOS内置音乐应用截屏的。在开始之前，你需要在Document设置中将slide size设置为 640 \* 1136， 和iPhone的屏幕适配。

使用Shape工具可以绘制矢量图形，覆盖原有的界面元素。

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/6.png){:style="max-width:700px"}

导入的图片可以使用图片的Mask功能，例如将一个面包图片显示成一个圆盘的形状，完成界面元素的自定义、

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/7.png){:style="max-width:700px"}


使用特殊符号功能添加页面基础元素，将星星设置为金黄色。这样以iOS内置音乐应用为布局基础的美食列表页面就完成了。

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/8.png){:style="max-width:700px"}



同样的方式，还完成了grid view, map view 和gallery view，他们分别使用了iOS内置的相册，地图和天气App.

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/9.png){:style="max-width:700px"}




**第二阶段 Animations**

用户可能会好奇寻找top toast 和 nearby toast的关系，此时原型中需要添加转场动画，两个界面是怎样转换的呢？
Keynote中的动画包括两种

+ **Build**  在一张slide之内的动画
+ **Transition** 不同之间切换的动画

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/10.png){:style="max-width:700px"}

其中Transition中有一种非常给力的动画叫做Magic Move, 它可以使同一元素在不同的slide之间进行动画转换，形成很炫酷的效果。利用这一特性可以做出不同的动画，例如，一个圆盘图标在slide1 和slide2中分别处于不同的位置，进行Magic move的时候，就会出现圆盘的跨slide平移效果。如果位置相同，slide1 和slide2中圆盘的大小角度不同，就可以出现旋转或者放大的效果。理解Magic move的基本工作方式后，做出不同的效果靠自己发挥了。

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/11.png){:style="max-width:700px"}




**第三阶段 Interaction**

在有了页面之间的动画转换后，我们可能得到更多的反馈，比如nearby toast 和 top toast 的界面可以合并为一个页面。原型中应该增加交互，让App更加真实。

Apple使用了Xcode进行了简单的交互制作，这些交互只是看起来在工作，例如地图的移动只是一张图片在拖拽，输入文本只是在连续的切换十几张图片。

例如下面的界面实际上是一张图片拆成了三个部分，一个导航栏，一个地图，一个列表。

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/12.png){:style="max-width:700px"}

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/13.png){:style="max-width:700px"}


为layer编写简单的onTouchMove事件，模拟在一张地图上拖拽浏览的操作。

{:.center}
![](http://7fv96s.com1.z0.glb.clouddn.com/image/2015/write/wwdc2014/14.png){:style="max-width:700px"}




**参考资料**

+ 本文所有图片来自于WWDC slides [《Fake it till you make it》](https://developer.apple.com/videos/wwdc/2014/#223)
+ [WWDC 2014 Session 223](https://developer.apple.com/videos/wwdc/2014/#223)