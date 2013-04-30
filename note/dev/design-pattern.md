---
layout: page
title: Design Pattern
tagline: 设计模式总结
group: dev
---
{% include JB/setup %}



##迭代器模式 Iterator
###思路

主要是两个方面的思路:

+ 数据集数据集的处理,不需要关注内部
+ 抽象出数据集的特性,接口来处理
 
###意图
封装一个容器的数据集合，提供遍历，访问操作，并且保持数据集内部细节不可见。《Head First 设计模式》中也提到了一个场景，比如我们要处理来自不同模块的数据集，内部实现不同，这个时候设计一个迭代器接口就显得十分重要了。这个模式实际中不经常需要自己写，因为java已经有了很好的实现。

###类图
![](/assets/images/pages/dp-iterator.png)

###实例
可以参照JDK源码中下面三个文件中的实现:

+ ArrayList.java
+ Iterator.java
+ Collection.java

Collection是集合类的统一接口，定义了`iterator`方法，ArrayList是一个List的具体实现（List接口继承自Collection），其包含了一个内部类Itr,Itr就是Iterator接口的一个具体实现。

-------------

##观察者模式 Observer

###思路
来源于生活中的思考，传统的新闻订阅、邮件列表，以及广播机制。

#####分析需求：

+ 抽象观察者为接口，统一方便管理这个观察者列表
+ 约定被监听者的基本行为，通过接口实现
+ 消息传递，约定消息对象
+ 实现松耦合

###意图
实现多个对象对于单个对象的监听。

###类图
![](/assets/images/pages/dp-observer.png)

###实例
比如我们想监听某一个路段交通灯变化情况，然后将最新的交通信息显示在我们的APP里面，就可以利用观察者模式，此时交通数据就是一个Subject，而我们的LightsBoard就是一个观察者。

观察者模式的基本实现在 `org.leeon.pattern.observer`

[Repo连接](https://github.com/leeon/LearnPatterns)

*@See*  
Java中一个典型的应用例子是，窗口事件响应等机制的实验，我们的一个Button组件便是一个Subject，当我们调用<code>mButton.setOnClickListener(someListener)</code>的时候，就是在添加一个订阅者。
 

----------------

##装饰器模式 Decorator

###思路

#####分析需求：

+ 实现现有功能的扩展
+ 不改变原有的结构

这个模式来自于对类的设计原则的思考，即“开放-关闭原则”
> 类应该对扩展开放，对修改关闭

#####问题
+ 虽然解决了继承特性本身的局限性，但是同样的场景下，当扩展不断的增加，装饰器模式也会带来很多`小而多`的类，也同样不方便管理。
+ 装饰器本身就是在不断的叠加功能，其实就是像滚雪球一样，越滚越大。

#####要点
+ 保证被装饰者和装饰器的超类一致
+ 每一个装饰器维护一个被装饰的引用

###意图
在不改变原有结构的基础上，动态的将责任附加到对象上，实现扩展功能，遵循“开发-关闭原则”。
###类图
![](/assets/images/pages/dp-decorator.png)

###实例
假设我们有一个水果商店，顾客可以定制自己的果篮，我们负责编写一个应用，动态的根据果篮的内容提供不同的服务，包括价格计算，清单打印等。

装饰器模式的基本实现在 `org.leeon.pattern.decorator`

[Repo连接](https://github.com/leeon/LearnPatterns)

*@See*  
Java中有装饰器经典的应用，就是`java.io`包中字节流的封装，这里面涉及了很多类。

##单例模式 Singleton


