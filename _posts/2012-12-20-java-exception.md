---
layout: post
title: "Java异常处理"
description: "java中的异常处理机制 exception"
category: 程序設計
---
{% include JB/setup %}
异常处理是java语言的重要特性之一，`《Three Rules for effective Exception Handling》`一文中是这么解释的：它主要帮助我们在debug的过程中解决下面的三个问题。

+ 什么出错了
+ 哪里出错了
+ 为什么出错

java语言可以说是提供了过于完善的异常处理机制，以致于后来`《Thinking in java》`的作者Bruce Eckel都专门对他进行了论述。java中的异常机制包括Error和Exception两个部分。他们都继承自一个共同的基类`Throwable`。`Error`属于JVM运行中发生的一些错误，虽然并不属于开发人员的范畴，但是有些Error还是由代码引起的，比如`StackOverflowError`经常由递归操作引起，这种错误就是告诉开发者，你一般无法挽救，只能靠JVM。而Exception假设程序员会去处理这些异常，比如数据库连接出了异常，那么我们可以处理这个异常，并且重新连接等。Exception分为两种，检查类型`（checked）`和未检查类型`（unchecked）`。检查类型的异常就是说要程序员明确的去声明或者用*try..catch*语句来处理的异常，而非检查类型的异常则没有这些限制，比如我们常见的 `NullPointerException` 就是非检查类型的，他继承自RuntimeException。java是目前主流编程语言中唯一一个推崇使用检查类型异常的，至少sun是这样的。关于使用checked还是unchecked异常的论战一直很激烈。下面是一张java语言中异常的类关系图。

![](/assets/images/pages/java-exception-1.gif)


###基本使用
我们在使用java的一些文件或者数据库操作的时候已经接触过一些异常了，比如IOException、SQLException等，这些方法被声明可能会抛出某种异常，因此我们需要对其进行捕获处理。这就需要基本的try..catch语句了。下图就是我们经常写的一个基本结构。try语句块中写可能会抛出异常的代码，之后在catch语句块中进行捕获。我们看到catch的参数写的是一个Exception对象，这就意味着这个语句块可以捕获所有的检查类型的异常（虽然这并不是一种好的写法，稍后讨论），finally总是会保证在最后执行，一般我们在里面处理一些清理的工作，比如关闭文件流或者数据库，网络等操作。


{% highlight java %}
try{
    //do something that may throw any exception
    
}catch(Exception e){
    //handle the exception
}finally{
    //do some cleaning work
}
{% endhighlight %}

当然上面的语句块结构是灵活的，但是try是必须有的，catch和finally两者至少有一个，当然catche的数量可以有多个。有时候try语句块中可能抛出多种类型的异常，这个时候，我们可以写多个catch语句来捕获不同类型的异常，一个比较好的写法如下：



{% highlight java %}
try{
            // ..invoke some methods that may throw exceptions
        }catch(ExceptionType1 e){
            //...handle exception
        }catch(ExceptionType2 e){
            //...handle exception
        }catch(Exception e){
            //...handle exception
        }finally{
            //..do some cleaning :close the file db etc.
        }
{% endhighlight %}

当异常不满足前两个type的时候，exception会将异常捕获。我们发现这个写法比较类似switch case的结构控制语句，但实际上，一旦某个catch得到匹配后，其他的就不会就匹配了，有点像加了break的case。有一点需要注意catch（Exception）一定要写在最后面，catch是顺序匹配的，后面匹配Exception的子类，编译器就会报错。

初次学习try..catch总会被其吸引，所以大量的使用这种结果，以达到某种“鲁棒性”。（这语句也是程序员表白的最爱）。但try语句实际上执行的时候会导致栈操作。即要保存整个方法的调用路径，这势必会使得程序变慢。fillInStackTrace()是Throwable的一个方法，用来执行栈的操作，他是线程同步的，本身也很耗时。这里问题在StackOverFlow上曾经有过一段非常经典的讨论，原文。 的确当我们在try中什么都不做，或者只执行一个类似加法的简单调用，那么其执行效率和goto这样的控制语句是几乎一样的。但是谁会写这样的代码呢？

总之不要总是试图通过try catch来控制程序的结构，无论从效率还是代码的可读性上都不好。

###try catch好的一面

try catch虽然不推荐用于程序结构的控制，但是也具有重要的意义，其设计的一个好处就是，开发人员可以把一件事情当做事务来处理，事务也是数据库中重要的概念，举个例子，比如完成订单的这个事务，其中包括了一个动作序列，包括用户提交订单，商品出库，关联等。当这个序列中某一个动作执行失败的时候，数据统一恢复到一个正常的点，这样就不会出现，你付完了帐，商品却没有给你的情况。我们在try语句块中就像执行一个事务一样，当出现了异常，就会在catch中得到统一的处理，保证数据的完整无损。其实很多不好的代码也是因为没有好好利用catch语句的语言，导致很多异常就被淹没了，这个后面介绍。

###定制详细的异常
我们可以自己定义异常，以捕获处理某个具体的例子。创建自己的异常类，可以直接继承Exception或者RuntimeException。区别是前者是简称类型的，而后者为检查类型异常。Sun官方力挺传统的观点，他建议开发者都是用检查类型的异常，即你一定要去处理的异常。下面是定义的一个简单的异常类.
{% highlight java %}

public class SimpleException extends Exception{
 
    SimpleException(){}
    SimpleException(String info){
        super(info);
    }
}

{% endhighlight %}

上我们覆写了两个构造方法，这是有意义的。通过传递字符串参数，我们创建一个异常对象的时候，可以记录下详细的信息，这样这个异常被捕获的时候就会显示我们之前定义的详细信息。比如用下面的代码测试一下我们定义的异常类：

{% highlight java %}
public class Test {
 
    public void fun() throws SimpleException{
        throw new SimpleException("throwing from fun");
    }
    public static void main(String[] args) {
        Test t = new Test();
        try{
            t.fun();
        }catch(SimpleException e){
            e.printStackTrace();
        }
    }
}
{% endhighlight%}


运行就会得到下面的结果 printStackTrace是打印调用栈的方法，他有三个重载方法，默认的是将信息输出到System.err。这样我们就可以清晰的看到方法调用的过程，有点像操作系统中的中断，保护现场。

> `SimpleException: throwing from fun`

> `at Test.fun(Test.java:4)`

> `at Test.main(Test.java:9)`

###略微麻烦的语法
我们自己实现的异常有时候会用到继承这些特性，在异常继承的时候有一些限制。那就是子类不能抛出基类或所实现的接口中没有抛出的异常.比如有如下的接口：
   
{% highlight java %}
public interface InterfaceA {
    public void f() throws IOException;
}
{% endhighlight %}   

我们的Test类实现这个接口，那么Test的f方法要么不抛出异常，要么只能抛出IOException，其实关于这里还有更琐碎的规矩，详细可以参考`《Java Puzzlers》`第37个谜题。所以这和传统的继承和实现接口正好相反，面向对象的继承是扩大化，而这正好是缩小了。

 

###关于checked和unchecked的论战

传统的观点里，sun认为”因为 Java 语言并不要求方法捕获或者指定运行时异常，因此编写只抛出运行时异常的代码或者使得他们的所有异常子类都继承自 RuntimeException ，对于程序员来说是有吸引力的。这些编程捷径都允许程序员编写 Java 代码而不会受到来自编译器的所有挑剔性错误的干扰，并且不用去指定或者捕获任何异常。 尽管对于程序员来说这似乎比较方便，但是它回避了 Java 的捕获或者指定要求的意图，并且对于那些使用您提供的类的程序员可能会导致问题。”他强调尽量不使用unchecked异常。

但《Thinking in java》的作者Eckel却改变了自己的想法， 他在自己博客上的一篇文章（这篇文章很好，表达也很简单）专门列举了使用checked异常的弊端。他指出正式检查类型让导致了很多的异常不能被程序员发现。开发人员有更大的自由去决定是不是要处理一个异常。即使忘记处理了某个异常，他也会在某个地方抛出来被发现，而不至于丢失。checked异常使得代码的可读性变差，并且正在暗暗的鼓励人们去淹没异常。现在很多IDE都在提醒我们，某个方法要跑出异常，然后甚至自动帮我们生成catch或者throw。这是非常可怕的行为，这导致了我们很多catch语句里面什么都没有，就像一个陷阱一样。

checked异常带来的另一个问题是，代码的难维护性，因为要在方法声明上加上throws，如果方法的实现发生了某个变化，有了新的异常，那么我们不得不去修改方法的声明。还有一点不好的就是不能明确的暴露异常的特征。比如我们登录成绩系统的时候，如果用户名注册，我们可能期待一个NoSuchStudentException但是实际看到的可能是一个SQLException。《Effective java》中第 43 条：抛出与抽象相适应的异常。讲的就是这个原则，即抛出的异常应该是和抽象的概念一致的，比如我们在一个系统无论遇到什么具体的问题，但是大部分我们看到的都只是SQLException而已。

关于如何选择，Bloch的建议是为可恢复的条件使用检查型异常，为编程错误使用运行时异常。我的感觉是选择检查的异常就一定要”处理“,当然此处的处理一定是真正的处理而不是空写一个catch语句而已。不知道未来的java会怎样对待checked和unchecked，毕竟现在java是唯一一个支持检查异常的主流编程语言了。

###好的原则

####Fail Fast:
就是要尽早的抛出异常，这样有有助于更加精确的定位出错的地点和原因。这个也比较好理解，比如用户名字不合法的时候马上抛出，UserNameIllegalException，如果没有及时抛出异常，那么不合法的名字可能会导致一个SQLException,但是程序报给你一个SQLException,你却很难直接得知一定是用户名不合法造成的。Fail Fast这种思想，在java实现ArrayList的机制中也有很好的体现。

####Catch late:
不要在方法内部过早的处理异常，特别是什么也不做的处理，那就更加的可怕了。因为如果“无作为”的处理很可能导致后面继续出现新的异常（比如错误的用户名会引发后面一些列错误，程序还不能处理好错误的用户名，后面的就更处理不了了），这就给调试增加了很大的困难。一个好的经验是将异常处理交给调用者，方法只在及时的地方抛出异常，技术上实现的方式就是给方法声明throws，标出所有可能要抛出的异常。

####Doc：
文档的重要性，特别是非检查的异常，一定要在文档中注明。


异常处理是java非常重要的特性，上面是一些关于异常使用的讨论，当然更多知识还是需要实践中发现。