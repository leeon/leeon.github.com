---
layout: post
title: "JavaScript中的原型和原型链"
category: code
tags: JavaScript 原型
---

> 假设读者已经掌握基本的JavaScript语言基础和面向对象知识

受了太多[OO](http://en.wikipedia.org/wiki/Object-oriented_programming)思想的影响,提到一种编程语言，就容易想到它有类吗？他支持继承吗？

<!-- break -->
在JavaScript语言中，上面的答案是『没有类，但是支持继承』。JavaScript的设计中是没有**class**的概念的，其实**继承**也是后来随着面向对象的大趋势发展而引入的。没有类如何实现继承？所以JavaScript引入了**原型**的概念。

那么请先记住一句话 「Everything is an Object」.


###原型和原型链

类似JavaScript这样基于原型继承的语言,有个特点是每个object都会有自己的一个神秘『引用』,当自己找不到一些属性的时候,就会通过这个『引用』去寻找。而这个『引用』指向的也是一个object，因此这个object也有自己的『引用』，就形成了一个『递归』。

好，上面说的『引用』就是**原型**，这个『递归』形成了**原型链**。

JavaScript事实上隐藏了对于原型的访问，但是Mozilla使用了\_\_proto\_\_这个神奇的属性让开发者可以访问到object的原型。注意\_\_proto\_\_是不符合ECMA标准的，因此不要使用他。但是我们可以通过\_\_proto\_\_来了解JavaScript的原型机制。


###prototype和\_\_proto\_\_

关于这两个概念，明确以下几个关键点就可以掌握

1. prototype是只属于function的，而\_\_proto\_\_属于所有object的.
2. \_\_proto\_\_是真正的原型
3. function的prototype属性表示该function所创建的对象的原型。


例如下面的代码

    function Foo(){}
    var foo = new Foo()

    console.log(Foo.prototype) // {}  means object
    console.log(foo.prototype) // undifined
    console.log(Foo.__proto__) // Function.prototype
    console.log(foo.__proto__) // Foo.prototype

第一和第二条log演示了关键点1，第三条说明了演示了关键点2，最后一条演示了关键点3。当foo被创建的时候，会有这样的操作：
    
    foo.__proto__ = Foo.prototype


###图谱
{:.center}
![](http://www.mollypages.org/misc/jsobj.jpg){:style="max-width:700px"}

{:.center}
神图

这就是JavaScript中的原型链图谱，这张图也很好的解释了一直缠绕不清的「function」和「object」关系。可以看到中间背景为蓝色的部分标记了Function,你可能会诧异，Object怎么也是function了,我的理解是JavaScript把可以创建对象的对象都当做function对待，比如Foo和Object都可以创建对象实例：

    var f = new Foo()
    var o = new Object()
    console.log(typeof Object) //Function
    
有了这样的理解接下来就比较好讲解了，如何读这张图：比如foo 经过\_\_proto\_\_到Foo.prototype的虚线表示foo.\_\_proto\_\_是Foo.prototype.

>插入一个constructor的概念，任何对象或者函数也好，都是被创建的，既然被创建，那么就一定有自己的构造函数，constructor就是构造函数，

解读这张图最好的方式就是用代码实际的实验

    //code to explian js prototype chain
	//@author leeon
	//@run node test.js
	function Foo () {}
	Foo.prototype.info = "Foo.prototype"
	Object.prototype.info = "Object.prototype"
	Function.prototype.info ="Function.prototype"
	var f1 = new Foo()
	var o1 = new Object()
	
为了直观的看到结果，我们先设置好几个原型的信息。首先按照图中的线路进行验证：

    //validate basic 
	console.log(f1.__proto__) //Foo.prototype
	console.log(Foo.prototype) //Foo.prototype
	console.log(Foo.constructor) //Function
	console.log(Foo.__proto__) //Function.prototype
	console.log('---------')
	console.log(o1.__proto__)  //Object.prototype
	console.log(Object.prototype) //Object.prototype
	console.log(Object.constructor) //Fucntion
	console.log(Object.__proto__) //Function
	console.log('---------')
	console.log(Function.prototype)  //Function.prototype
	console.log(Function.constructor) //Function
	console.log(Function.__proto__) //Function
	
有趣的现象是，Foo.\_\_proto\_\_和foo\_\_proto\_\_并不一致。正如前面已经提到过，当被foo被创建的时候，foo的原型链指向了Foo.prototype了，而Foo其实是被Function创建的。

###原型链和变量查找

看下面的例子会有怎样的结果：

     function Foo(){}
	 var foo = new Foo()
	 Foo.prototype.info = "123"
	 console.log(foo.info)
	 console.log(Foo.info)
结果很意外，Foo.info竟然是undefined。其实，仔细思考就会发现，肯定是undefined，前面提到过解释器搜索变量，是根据原型链进行的，而观察图中的Foo的原型链中却没有Foo.prototype.对于这样的设计我自己的理解是JavaScript还是区分了类型和实例的概念，Foo是一个类型或者函数，而foo是一个实例。如果直接按照下面访问就可以获得info:

    console.log(Foo.prototype.info)


###继续探索
接下来看看图中没有的曲线是什么效果，前面已经提到过，所以很容易猜到，f1.prototype是undefined了。那么他的构造函数有没有呢？

    //if a instance of function has prototype or constructor
	console.log(f1.prototype) //undefined
	console.log(f1.constructor) //Foo

	//if a instance of object has prototype or constructor
	console.log(o1.prototype)
	console.log(o1.constructor)

答案是Foo,没错，一切的对象都有来源的，这个来源就是constructor了，就连Foo作为一个类型本身都是来自Function创建的的，正如他的\_\_proto\_\_指向了Function.prototype。

下面的代码告诉你了原型链的尽头是神马，图中也有：

    //see a chain 
    console.log(Foo.__proto__.__proto__.__proto__) //null
    
###结束

最后让我们以JavaScript中经典的『鸡蛋问题』结尾吧:

    console.log(Function instanceof Object)  //TRUE
    console.log(Object instanceof Function)  //TRUE
    
>提示：instanceof判断A是不是属于类型B，要看B在不在他的原型链中，Object.prototypes是一个object,Function.prototype是一个function.看图说话。



#####参考资料

+ [Quora:What is the difference between "__proto__" and "prototype"?](http://www.quora.com/JavaScript-programming-language/What-is-the-difference-between-__proto__-and-prototype)
+ [http://www.mollypages.org/misc/js.mp](http://www.mollypages.org/misc/js.mp)
+ [http://www.laruence.com/2010/05/13/1462.html](http://www.laruence.com/2010/05/13/1462.html)
+ [http://www.ruanyifeng.com](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)



以上。