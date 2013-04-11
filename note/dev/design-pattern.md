---
layout: page
title: Design Pattern
tagline: 设计模式总结
group: dev
---
{% include JB/setup %}



##迭代器模式 Iterator

###意图
封装一个容器的数据集合，提供遍历，访问操作，并且保持数据集内部细节不可见。这个模式实际中不经常需要自己写，因为java已经有了很好的实现。

###类图
![](/assets/images/pages/java-exception-1.gif)

###实例
可以参照JDK源码中下面三个文件中的实现:

+ ArrayList.java
+ Iterator.java
+ Collection.java

Collection是集合类的统一接口，定义了`iterator`方法，ArrayList是一个List的具体实现（List接口继承自Collection），其包含了一个内部类Itr,Itr就是Iterator接口的一个具体实现。

##装饰器模式 Decorator


##观察者模式 Observer

##单例模式 Singleton

