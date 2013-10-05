---
layout: post
title: "JavaScript中的原型和原型链"
description: "JavaScript中原型和原型链的理解"
category: tech
tags: JavaScript 原型
---

> 假设读者已经掌握基本的JavaScript语言基础和面向对象知识

受了太多[OO](http://en.wikipedia.org/wiki/Object-oriented_programming)思想的影响,提到一种编程语言，就容易想到它有类吗？他支持继承吗？

在JavaScript语言中，上面的答案是『没有类，但是支持继承』。JavaScript的设计中是没有**class**的概念的，其实**继承**也是后来随着面向对象的大趋势发展而引入的。没有类如何实现继承？所以JavaScript引入了**原型**的概念。

那么请先记住一句话 「Everything is an Object」.


###原型和prototype

这让我们想起了JAVA中的同样道理的一句话，『Object是所有类的父类』。在JavaScript中，Object.prototype就是所有对象的原型。事实上，JavaScript中的每一个对象都有唯一一个原型，Object的原型就是Object.prototype. 那么是不是我们就可以通过下面的代码访问一个对象或者实例的原型：

    function Foo(){}
    var foo = new Foo()
    console.log(Foo.prototype) // {}  means object
    console.log(foo.prototype) //undefined
    
尝试上面代码就会发现，我们可以打印得到Foo.prototype是一个{},而foo.prototype却是**undefined**.不是说所有对象都有原型吗？通过foo.prototype无法访问其原型并不代表它没有。实际上，prototype这个变量是针对**类型**的，而对实例是隐藏的。上面的例子中Foo是一个类型，而foo是一个实例化的对象。（对象要实例化后才是一个实例对象）.

###原型链和\_\_proto\_\_

如果我们要访问一个实例的原型，可以使用\_\_proto\_\_变量，\_\_proto\_\_是针对所有对象的，无论是一个函数还是object或者一个具体的实例，都可以访问。修改刚才的代码：

    function Foo(){}
    var foo = new Foo()
    console.log(Foo.prototype) // {}  means object
    console.log(foo.__proto__) //{}
    
这样可以看到，找到foo的原型了,其实当foo被创建的时候，会有这样的操作：
    
    foo.__proto__ = Foo.prototype
那么下面代码表示什么：

    console.log(foo.__proto__.__proto__)

可以看到这是在访问foo的原型的原型,这样就形成了一条**原型链**,所以可以通过一个对象的原型链不断的去寻找更上一层的原型，在语言中的意义类似作用域链，如果foo中引用了一个变量，而在foo中没有，解释器就会沿着原型链去寻找，直到找到为止。

###图谱

![](http://www.mollypages.org/misc/jsobj.jpg)

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
	
有趣的现象是，Foo.\_\_proto\_\_和foo\_\_proto\_\_并不一致。正如前面已经提到过，当被foo被创建的时候，foo的原型链指向了Foo.prototype了。

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

+ [http://www.mollypages.org/misc/js.mp](http://www.mollypages.org/misc/js.mp)
+ [http://www.laruence.com/2010/05/13/1462.html](http://www.laruence.com/2010/05/13/1462.html)
+ [http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)