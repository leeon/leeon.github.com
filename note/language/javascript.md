---
layout: page
title: javascript Node.js简明介绍
tagline: node
group: language
---

##Javascript基础

###数据类型


JavaScript是弱类型的语言，可以通过如下方式定义一个变量：

    var m = 12;

支持的数据类型有 
    
+ numbers
+ string
+ boolean
+ object 
+ array
+ undefined
+ null

JavaScript中的数组和Python一样，支持多种数据类型。例如：

    var mList = ['name',23,{type:"students"}];
    var mArray = new Array(3);

使用数组是一件很有意思的事情：比如 [JavaScript中多变的数组](http://octsky.com/tech/2013/10/17/javascript-array-trick/)

> object可以表示成JSON格式。

###语句
> 语句后`;`是可选的,感兴趣可以看[『知乎』的讨论](http://www.zhihu.com/question/20298345)

#####if else

    if(a > b){
        //do
    }else{
        //do
    }
    
#####for

    for(var i = 1; i < 10; i++ ){
        //get i
    }
    
#####for in

    var mList = [1,2,3];
    for(i in mList){
        console.log(mList[i]);
    }
> 注意与Python不同，JavaScript迭代的是元素的index，而不是元素本身

#####while
    
    while(true){
        //do
    }
    
    do{
        //do
    }while(true)
    
#####break & continue
和C语言相同，break跳出本次循环，并结束循环；continue结束本次循环，继续下一次循环

#####switch
    
    switch(n){
        case 1:
        //do
        break;
        case 2:
        //do
        break;
        default:
        //do
    }
###作用域
JavaScript的作用域与C不同，并不是以`{}`块来进行区分的，而是根据函数而确定。

####全局作用域

+ 在所有函数之外定义的变量拥有全局作用域
+ 没有使用`var`定义的变量拥有全局作用域

####函数作用域

指在某个函数内部定义的变量，只具有函数内的访问权限


###函数

JavaScript中函数的定义主要有两种形式：

    function func1(){
	    console.log("this is function a");
    }

    func2 = function(){
	    console.log("this is function b")
    }

###内置函数
常用的内置函数

**parseInt（string,radix）** 讲string转换为10进制整型，radix表示第一个参数的基数。

**Math.floor(x)**  返回小于x的最大整数

**Math.ceil(x)** 返回大于x的最小整数

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


##Node.js



