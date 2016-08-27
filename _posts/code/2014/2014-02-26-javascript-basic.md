---
layout: post
title: "JavaScript中的 变量、作用域链、执行上下文"
category: code
tags: JavaScript 函数
---

## Intro

之前一直在前端使用JavaScript,主要是操作DOM实现网页中特定的效果。接触Node.js后，JavaScript就开始在Server和Desktop上发挥作用。本文梳理一下JavaScript的一些语法上的几个核心概念,并通过一些例子来加深理解。

<!-- break -->

## Execution context

Execution context (简称EC) 是一个虚拟的概念，区分了不同的代码片段以及执行环境。JavaScript中的代码环境主要有三种，分别是Global Code, Function Code和Eval Code. 其中Global code是`.js`文件中直接执行的代码，或者`<script>`标签中的内容。Function code是进入函数调用时候进入的代码环境。Eval code 是指使用`eval()`的代码内容。

在程序运行过程中，一系列的 execution context 构成了一个context stack。比如，程序一开始就进入了Global context，存在栈底。每当进入一个新的context，就会压栈，栈顶的内容是当前活跃的context。下图演示了context stack的变化。

{:.center}
![](http://dmitrysoshnikov.com/wp-content/uploads/ec-stack-changes.png){:style="max-width:400px"}

 
Execution context 包含了主要三个部分，Variable object,Scope Chain和this. JavaScript运行时记录和查找变量就是依靠的这些结构。

{:.center}
![](http://dmitrysoshnikov.com/wp-content/uploads/execution-context.png){:style="max-width:400px"}


## Variable Object （VO）

vo是一个与context相关联的一个特殊的object。所谓关联，就是VO存储着在当前context中声明的变量和函数声明（注：是FD而非FE）,当程序试图寻找某一个变量的时候，就会首先检查VO.

    var foo = 10;
    function bar() {} // function declaration, FD
    (function baz() {}); // function expression, FE
     
    console.log(
      this.foo == foo, // true
      window.bar == bar // true
    );
 
    console.log(baz); // ReferenceError, "baz" is not defined
    
下图显示了上面代码，Global context中VO的属性，即变量声明，和函数bar的声明，而没有baz.因为后者属于函数表达式。

{:.center}
![](http://dmitrysoshnikov.com/wp-content/uploads/variable-object.png){:style="max-width:400px"}

对于变量声明，必须使用`var`关键字."全局"的声明方式，只是给Global添加了一个属性，并没有严格的声明变量，也不会添加到VO,下面的代码可以验证，因为JavaScript中变量有can't delete的特性，所以是不能删除的，而属性可以。

    var temp1 = 1; //declare a variable
    temp2 = 2; //actually add a new attribute to global
    
    delete temp1;//false 
    delete temp2; //true
    
    
## Activation Object （AO）

在函数环境中，VO就变成了AO. 并且增加了函数参数的列表。如下面的代码对应的AO。

    function foo(x, y) {
      var z = 30;
      function bar() {} // FD
      (function baz() {}); // FE
    }
    foo(10, 20);
  
   
{:.center}
![](http://dmitrysoshnikov.com/wp-content/uploads/activation-object.png){:style="max-width:300px"}

JavaScript代码运行分为两个阶段，`entering the execution` 和 `code execution`.VO/AO在第一个阶段会被初始化，所以FD函数声明，会在第一个阶段加入到VO/AO，而FE函数表达式则不会。 


## Scope Chain

作用域链是用于JavaScript寻找变量的结构，由一系列的对象组成，如果一个变量在自己所在的Scope中找不到，也就是自己VO/AO没有，（可以看出，自己的VO/AO）是作用域链的顶端）就去父节点的VO/AO去寻找。根据这个原理，JavaScript中的作用域和其他高级编程语言（利用Block区分作用域）不同，通过函数调用决定作用域链，因为函数调用会创建新的VO/AO.本Scope内不存在的变量叫做`free variable`.

    var x = 10;
     
    (function foo() {
      var y = 20;
      (function bar() {
        var z = 30;
        // "x" and "y" are "free variables"
        // and are found in the next (after
        // bar's activation object) object
        // of the bar's scope chain
        console.log(x + y + z);
      })();
    })();

{:.center}
![](http://dmitrysoshnikov.com/wp-content/uploads/scope-chain.png){:style="max-width:300px"}

值得注意的是JavaScript中的作用域链是静态的，当函数被创建的时候，其作用域链就是foo.[[scope]],其中[[scope]]就是globalContext.VO,当函数激活（被调用）的时候，其作用域链为AO+[[scope]].
下面的代码可以看出，foo在创建的时候,其作用域链中并没有 invokeFoo.AO，而是在其创建时刻的globalContext.VO.

    var x = 1;
    function foo () {
        console.log(x);
    }

    function invokeFoo(){
        var x = 2;
        foo();
    }
    invokeFoo(); // we get 1 here
    
另外一个经典的例子是循环绑定函数，结果每一次都是3，原因在于三次赋值的函数都共享了相同的[[scope]],寻找变量i的时候，其实访问都是同一个。都在Global.VO中。

    var data = [];
    for(var i = 0 ; i < 3; i++){
        data[i]=function() {
            console.log(i);
        }
    }
    data[0]();//get 3
    data[1]();//get 3
    data[2]();//get 3
    
使用闭包，改进之后。创建新函数的时候，[[scope]]都会加上匿名外面匿名函数的AO,进而获得传进来的变量。

    var data = [];

    for(var i = 0 ; i < 3; i++){
        data[i]=(function(x) {
            return function  () {
                console.log(x);
            }
        })(i);
    }

    data[0]();
    data[1]();
    data[2]();


## This

**this** 是context中的一个属性，并不属于任何变量，因此也不能被赋值。在全局环境中，this就表示global.在函数中，this的值取决于调用当前函数的context.


## Conclusion

以上是JavaScript中几个基本的但是很重要的概念，有助于理解它的基本运行机制。此外还有一些重要的概念，比如函数、原型链、事件机制等。本文大部分参考了 Dmitry Soshnikov 的[ECMA-262 Series](http://dmitrysoshnikov.com/).


