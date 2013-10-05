---
layout: page
title: javascript语言
tagline:actually for node.js
group: language
---

###变量

JavaScript是弱类型的语言，可以通过如下方式定义一个变量：

    var m = 12;

###作用域
JavaScript的作用域与C不同，并不是以`{}`块来进行区分的，而是根据函数而确定。

####全局作用域

+ 在所有函数之外定义的变量拥有全局作用域
+ 没有使用`var`定义的变量拥有全局作用域

####函数作用域

指在某个函数内部定义的变量，只具有函数内的访问权限


####函数作用域

###函数

JavaScript中函数的定义主要有两种形式：

    function func1(){
	    console.log("this is function a");
    }

    func2 = function(){
	    console.log("this is function b")
    }
    
###闭包

>闭包没有那么神秘，他只是一个封闭的包（函数），他可以把局部数据返回给包(函数)返回给外面的数据。

如果你有OO的基础，一定想到了JAVA语言中的getXX方法之类的，没错，闭包可以实现JavaScript中的私有变量访问。

    function f (){
	    var a = 12
	    function get_a(){return a}
	    return get_a
    }

上面就是一个闭包，它实际上利用了JavaScript这类语言作用域链的特性，即子函数可以访问父函数域的变量，但是反过来则不行。例子中，f不可以访问get_a中的变量，但是get_a可以访问f中的a，因此可以在f中直接返回get_a方法，这样外部就可以访问a了。

###函数式编程

####柯里化

>函数的柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

###控制结构

