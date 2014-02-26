---
layout: post
title: "Java中String不再纠结"
description: "String是我们经常用到的一个类型，其实有时候觉得写程序就是在反复的操作字符串，这是C的特点，在java中，jdk很好的封装了关于字符串的操作。今天主要讲的是三个类String 、StringBuffer 、 StringBuilder "
category: tech
tags: java string 面试
---

###介绍

> 又是新的一月，又是各种总结，先分享一下java中string的一些小专题吧，这部分比比较基础，但是也非常的有用。我发现很多面试官像中了邪一样就爱问这个。。string的种种，纠结，希望这篇文章让大家不再纠结.


String是我们经常用到的一个类型，其实有时候觉得写程序就是在反复的操作字符串，这是C的特点，在java中，jdk很好的封装了关于字符串的操作。今天主要讲的是三个类`String` 、`StringBuffer` 、 `StringBuilder` . 这三个类基本上满足了我们在不同情景下使用字符串的需求。

先说，第一个String。JDK的解释是
 
> “Strings are constant; their values cannot be changed after they are created”

也就是说String对象一旦被创建就是固定不变的了（你一定有问题，但请先等一等，耐心读下去），这样的一点好处就是可以多线程之间访问，因为只读不写。


###创建

一般情况下我们以下面两种方式创建一个String对象

    String str1 = "string";
    String str2 = new String("string");

两种方式是有区别的，这和java的内存管理有关，前面已经说过，string创建之后是不可变的，所以按照第一种方式创建的字符串会放在栈里，更确切的是常量池中，常量池就是用来保存在编译阶段确定好了大小的数据，一般我们定义的int等基本数据类型就保存在这里。

其具体的一个流程就是，编译器首先检查常量池，看看有没有一个“string”，如果没有则创建。如果有的话，则则直接把str1指向那个位置。

第二种创建字符串的方法是通过new关键字，还是java的内存分配，java会将new的对象放在堆中，这一部分对象是在运行时创建的对象。所以我们每一次new的时候，都会创建不同的对象，即便是堆中已经有了一个一模一样的。
  
写一个小例子：

        String str1 = "string";
        String str4 = "string";
        String str2 = new String("string");
        String str3 = new String("string");
        
        /*用于测试两种创建字符串方式的区别*/
        System.out.println(str1 == str4);
        System.out.println(str2 == str3);
        System.out.println(str3 == str1);
        
        str3 = str3.intern(); //一个不常见的方法
        System.out.println(str3 == str1);  


这个的运行结果是 

true    
> //解释：两个字符串的内容完全相同，因而指向常量池中的同一个区域

false   
>//解释：每一次new都会创建一个新的对象

false  
>// 解释： 注意==比较的是地址，不仅仅是内容  

true  
> //介绍一下intern方法，这个方法会返回一个字符串在常量池中的一个地址，如果常量池中有与str3内容相同的string则返回那个地址，如果没有，则在常量池中创建一个string后再返回。实际上，str3现在指向了str1的地址。

  
这就是让人纠结的string了，现在你可以说话了。。。很多人有这样的疑问就是既然string是不变的，那么为什么str1 + "some"是合法的，其实，每次对string进行修改，都会创建一个新的对象。

所以如果需要对一个字符串不断的修改的话，效率是非常的低的，因为堆的好处是可以动态的增加空间，劣势就是分配新的空间消耗是很大的，比如我们看下面的测试。
  
    String str1 = "string";
    long start = System.currentTimeMillis();
        
        for(int i = 0; i < 50000; i++)
        {
            str1+= " ";
        }    
        long end = System.currentTimeMillis();
        System.out.println("the run time is "+(end -start)+" ms");

我的机器上运行结果是*the run time is 3538 ms*,如果你把循环的次数后面再增加几个0就会更慢。因为每一次循环都在创建心的对象，那么JDK如何解决这个问题？

###StringBuffer

下面就要说第二个类StringBuffer。

StringBuffer是一个线程安全的，就是多线程访问的可靠保证，最重要的是他是可变的，也就是说我们要操作一个经常变化的字符串，可以使用这个类，基本的方法就是append（与string的concat方法对应）和insert方法，至于怎么使用，就不多讲了，大家可以自己查看API。

        StringBuilder sb = new StringBuilder("string builder");
        StringBuffer sf = new StringBuffer("string buffer");
        
        long start = System.currentTimeMillis();
        
        for(int i = 0; i < 50000; i++)
        {
            //str1+= " ";
            sb.append(" ");
        }
        
        long end = System.currentTimeMillis();
        System.out.println("the run time is "+(end -start)+" ms");

测试一下，这次只需要8ms，这就是效率。

###StringBuilder

那么接下来，就要问StringBuilder是干什么的，其实这个才是我们尝使用的，这个就是在jdk 1.5版本后面添加的新的类，前面说StringBuffer是线程同步的，那么很多情况下，我们只是使用一个线程，那个同步势必带来一个效率的问题，StringBuilder就是StringBuffer的非线程同步的版本，二者的方法差不多，只是一个线程安全（适用于多线程）一个没有线程安全（适用于单线程）。

其实看了一下jdk源代码就会发现，StringBuffer就是在各个方法上加上了关键字syncronized

     /**
     * @since      1.5
     */
    public synchronized void trimToSize() {
        super.trimToSize();
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     * @see        #length()
     */
    public synchronized void setLength(int newLength) {
        super.setLength(newLength);
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     * @see        #length()
     */
    public synchronized char charAt(int index) {
        if ((index < 0) || (index >= count))
            throw new StringIndexOutOfBoundsException(index);
        return value[index];
    }

以上就是对三个字符串类的一个总结，总之不要在这上面纠结。。。。。。不想介绍太多的方法，总觉得那样会把一篇博客弄成API文档一样，而且还非常的繁琐。都是些体会，希望有所帮助。起码不要再纠结，尤其是面试。。。。

###资料
> 本文源码地址：>[http://octsky.com/JavaTaste](https://github.com/leeon/JavaTaste/tree/master/src/hit/jt/str)