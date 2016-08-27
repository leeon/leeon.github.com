---
layout: post
title: "JavaScript 中的DOM事件"
category: code
tags: JavaScript 事件 event
---


## Intro

本文描述的 事件 是W3C定义的API, 这些事件应用在JavaScript对于DOM的操作（Node.js中也有相应的事件机制）。事件主要是监控发生在DOM元素上面的行为，当一个元素的状态改变的时候，比如点击了页面上的某个标签，就会触发事件。

<!-- break -->


## Document
首先回顾一下DOM(Document Object Model)相关的一些基本概念。HTML文档是一棵树的形式组织的，不同的标签被转换成一个节点,这是有了这些节点，JavaScript才能自如的操作页面元素。比如下面的代码：

    <html>
    <head>
      <title>My Document</title>
    </head>
    <body>
      <h1>Header</h1>
      <p>Paragraph</p>
    </body>
    </html>

浏览器在渲染这个页面的时候，会以树的形式组织页面，如下图：

{:.center}
![](http://cdn4atleeon.qiniudn.com/image/code/2014dom-tree.jpeg){:style="max-width:400px"}

{:.center}
DOM结构

可以看到树根元素就是`document`,表示整个文档对象，通过它可以操作dom节点。比如：

    var elem = document.getElementById('button');
    var newELem = document.createElement("div");

## Window
window是JavaScript中的全局变量，所有的全局变量都作为window的属性存在。使用window也可以监控浏览器的窗口事件。例如下面的代码可以关闭浏览器窗口：

    window.close();
    

## EventTarget

> EventTarget is a DOM interface implemented by objects that can receive DOM events and have listeners for them.

EventTarget是定义的一个接口，通过这个接口，实现对于DOM事件的支持。Element,document,和window都是最常用的EventTarget，他们还支持on..（如onCLick,现代浏览器推荐addEventListener方法）事件绑定。EventTarget还包括XMLHttpRequest,AudiNode和AudioContext等。

EventTarget提供三个重要的方法：

+ target.addEventListener(type, listener[, useCapture]);
+ target.removeEventListener(type, listener[, useCapture]);
+ canceled = !target.dispatchEvent(event);


## Using built-in events

大多数场景下，我们只需要使用内置的事件类型就足够了。DOM API提供的事件比较丰富，常用的有:

+ 鼠标事件 `mousedown`,`mouse up`,`click`,`mouseover`,`mouseout`
+ 键盘事件 `keypress`,`keydown`,`keyup`
+ 表单事件 `select`,`change`,`submit`,`focus`,`reset`
+ 页面事件 `load`,`scroll`

假如我们的网页有下面的结构：
    
    <div><a id="bt" href="octsky.com">Click me!</a></div>

在js代码中：

    var bt = document.getElementByIn('bt');
    
    function myClickHandler(e){
        alert('button is clicked.');
    }
    
    bt.addEventListener('click',myClickHandler,false);
    
    //you can also do this:
    //bt.onclick = myClickHandler;
    
代码中有两个不同的绑定事件的方法，重要的区别在于第二种通过onclick赋值的方法只能给一个元素绑定一个事件，而addEventListener的方式可以实现多个事件的绑定。

当我们点击`<a>`标签的时候，浏览器会出现弹窗，然后页面跳转至`octsky.com`的页面，如果我们不希望页面跳转，阻止a标签的默认行为，使用
    
    e.preventDefault();

这里`e`是，作为Event Handler函数，默认传入的参数，代表事件本身，并且可以通过他获得事件的一些属性。

## Creating and triggering events

        var button = document.getElementById('button');
        var event = new Event('go');
        
        // Listen to the event
        button.addEventListener('go',function  (e) {
            alert('in go event');
        },false);
        
        // Dispatch the event
        button.dispatchEvent(event);
      
上面的代码创建了一个自定义事件，并且绑定到了`button`这个dom元素上，最后手动触发事件执行。这种方法大部分的现代浏览器都支持。注意addEventListener()最后一个参数，false表示不使用事件捕获，后面介绍。


## Event Capture & Bubble

前面提到了事件捕获，事件捕获是一种事件传递的机制，DOM中主要有两种事件的传递机制:**事件捕获**和**事件冒泡**。前者的浏览器支持不完整，后者比较完整。

二者的主要区别从图中可以看出，当一个element被click的时候，如果使用事件捕获，dom跟元素document会创建事件流，一直向树叶节点元素传播，捕获事件(Capture phase),直到找到真正触发事件的目标元素，过程中，只有目标元素的事件onclick事件会在目标阶段（Target phase）触发。如果使用事件冒泡，事件从目标元素发起，向上传播，直到某个节点调用了阻止冒泡，或者到达了跟节点。过程中经过的element的click事件都会被触发，（这是事件委托的原理）。

{:.center}
![](http://cdn4atleeon.qiniudn.com/image/code/2014event-model.jpg){:style="max-width:400px"}

{:.center}
事件冒泡与捕获

addEventListener方法默认关闭事件捕获，开启事件冒泡。如果阻止事件冒泡可以使用：
    
    event.stopPropagation();
    
## Event delegation

事件委托是什么概念呢？一个常用的场景是列表管理。列表里有很多元素，并且是动态变化的（比如web版的文件管理器）.
    
    <ul id="file-list">
        <li>item</li>
        <!--many other-->
        <li>item</li>   
    </ul>

如果给每一个li元素绑定事件会非常的难以管理，这个时候利用冒泡机制的原理，可以绑定事件给`<ul>`元素，他的每一个子元素事件触发的时候都会冒泡到父元素。再由`<ul>`统一处理。

    var filelist = document.getElementById('file-list);
    filelist.addEventListener('click',function(e){
        if(e.target){
            //do something special
        }
    },false);

注意：事件委托的前提是使用事件冒泡。

## Conclusion

本文介绍了JavaScript DOM事件的一些基础的概念，Event是DOM的核心内容，理解基本的概念可以更好的使用一些高级的框架。

推荐阅读 [W3c DOM Event architecture](http://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture)



