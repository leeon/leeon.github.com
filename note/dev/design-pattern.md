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


##观察者模式 Observer

###思路
来源于生活中的思考，传统的新闻订阅、邮件列表，以及广播机制。

分析需求：

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

##装饰器模式 Decorator




##单例模式 Singleton


