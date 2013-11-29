---
layout: post
title: "Java中hashcode()和equals()的联系"
description: "在Java的基类Object中，有hashCode和equals方法，二者是相互关联的。在自定义类的时候，往往需要重写equals方法，却忽略hashcode方法的覆写，而这在一些场景下很容易产生问题。"
category: tech
tags: java 
---

##Intro
`Object`是Java中最原始的类，在Object中，有默认的`hashCode`和`equals`方法实现，二者是相互关联的。

JDK中`Object.java`定义了这两个方法：

    public native int hashCode();
    
    public boolean equals(Object obj) {
        return (this == obj);
    }

其中hashCode方法是native方法，具体是实现是返回一个对象的内存地址作为其hashcode.

>As much as is reasonably practical, the hashCode method defined by class Object does return distinct integers for distinct objects. (This is typically implemented by converting the internal address of the object into an intege

而equals方法则是简单的直接比较两个对象的地址。

##Missleading

看到这这里可能会有疑问，一些教程说**Java中 == 表示比较对象的内存地址，而equals比较具体的内容**,这个说法其实不准确。equals的存在的作用在于允许程序员自己根据需要定义比较方法，由程序员自己决定两个对象满足什么条件算作是**相等**。一些书上这么写是因为使用`String`类的 == 和equals举例的。String.equals()只比较字符串的**具体内容**是由它的实现决定的。

String类继承自Object,并且覆写了其equals方法,使用的就是简单的循环匹配字符。代码如下：

    public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = count;
            if (n == anotherString.count) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = offset;
                int j = anotherString.offset;
                while (n-- != 0) {
                    if (v1[i++] != v2[j++])
                        return false;
                }
                return true;
            }
        }
        return false;
    }


举个例子，为某个应用定义一个`User`类，简单代码如下：

    public class User {
        private int id;

        public User(int id) {
            this.id = id;
        }
        public int getId() {
            return id;
        }
        public void setId(int id) {
            this.id = id;
        }
    }


一般在数据库中，用id标识用户的唯一身份。所以理解上ID相同的User为同一个User。如果接下来直接比较两个id相同的User对象，结果应该可以想到：

        User user1 = new User(1);
        User user2 = new User(1);
        System.out.println(user1.equals(user2));

结果是`false`,原因是没有覆写equals方法，导致使用的Object中默认的实现，通过==进行比较。现在加上覆写的equals方法，结果就是true了。

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        if (id != other.id)
            return false;
        return true;
    }


##Bad Case

一般在处理自定义的类的时候，做到这一步就结束了，但是却留下了隐患，继续刚才的例子，现在要管理一些用户，进行集合的操作。比如用户分组：

        HashSet<User> group = new HashSet<User>();
        
        User user1 = new User(1);
        User user2 = new User(1);
        group.add(user1);
        group.add(user2);
        System.out.println(group.size());
        User another = new User(1);
        System.out.println(group.contains(another));

我们期待是group的size是1，因为重复添加了同样的用户（HashSet满足集合中元素的唯一性，所以重复元素应该只存一个），并且期待最后打印`true`,因为集合中已经存在了id为1的用户。

但是结果并不如愿，group的size是2，而最后判断组中是否包含用户的结果是`false`.这跟HashSet的具体实现有关，简单的说是这样，HashSet确保元素的唯一性，它实际上用一个HashMap来保存所有的元素，并且把元素作为map的key存储。例如其源码`HashSet.java`中用的就是map本身的检查key的方法：

    public boolean contains(Object o) {
        return map.containsKey(o);
    }

这个方法把问题转换为，判断map中是否有指定的key,所以需要了解HashMap是如何去检测一个key是不是存在的：`HashMap.java`中相关的源码如下：

    public boolean containsKey(Object key) {
        return getEntry(key) != null;
    }
    /**
     * Returns the entry associated with the specified key in the
     * HashMap.  Returns null if the HashMap contains no mapping
     * for the key.
     */
    final Entry<K,V> getEntry(Object key) {
        int hash = (key == null) ? 0 : hash(key.hashCode());
        for (Entry<K,V> e = table[indexFor(hash, table.length)];
             e != null;
             e = e.next) {
            Object k;
            if (e.hash == hash &&
                ((k = e.key) == key || (key != null && key.equals(k))))
                return e;
        }
        return null;
    }

在getEntry方法中，如果找到满足条件的key,就匹配成功能更。可以看到getEntry方法第一步就是计算hash值,做比较时第一个条件是`e.hash == hash`。没错，要先比较hash值，如果结果为`false`，由于逻辑短路，`&&`后面的就不会被计算了，直接得出表达式值为`false`,为了检验这部分代码，你可以在覆写的equals方法里面加上一句：

     System.out.println("invoke me?");
     
执行就会发现，equals方法其实都没有被调用，上面的条件里就已经直接为`false`了。hash值不同的原因很简单，因为我们没有覆写hashCode方法，所以调用默认实现，创建的新对象就会有不同的hash值。解决办法是动手实现hashCode()。查阅官方文档会发现一个常被忽略的原则，那就是下面的the hashCode and equals contract in Java。


##the hashCode and equals contract in Java

> + If two objects are equal according to the equals(Object) method, then calling the hashCode method on each of the two objects must produce the same integer result.

> + It is not required that if two objects are unequal according to the equals(java.lang.Object) method, then calling the hashCode method on each of the two objects must produce distinct integer results.

文档中提到的约定的大致意思是：

+ 如果两个对象通过equals方法比较是相等的，那么他们调用hashCode方法就要得到相同的hash返回值。

+ 相反，如果两个对象调用hashCode有相同的返回值，**不一定**要求他们equals比较相等。

也就是说，当你为一个自定义类覆写equals方法时，也要记得覆写相应的hashCode方法，保持一致。

##Solution

实际编码中，如果你使用eclipse环境开发，创建自己定义的类后，可以使用IDE提供的generate code 功能，自动生成两个方法，比如hashCode()：
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }

构造hash的时候使用prime number(素数)，可以有更好的均匀分布效果。

**代码参考**：

>[http://octsky.com/JavaTaste](https://github.com/leeon/JavaTaste/tree/master/src/hit/jt/obj)

参考资料：

+ [programcreek.com](http://www.programcreek.com/2013/09/java-hashcode-equals-contract-set-contains/)
+ [JDK DOC 6](http://docs.oracle.com/javase/6/docs/api/java/lang/Object.html#hashCode%28%29)