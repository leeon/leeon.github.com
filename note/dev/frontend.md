---
layout: page
title: 一点点前端
tagline: 我会的就这么多
group: dev
---
>追求生活中美的东西，所以我也学一点前端  2013-10-16 updated

#CSS
###基础

使用CSS,只需要在`<head>`标签中添加
`<link rel="stylesheet" type="text/css" href="mystyle.css" />`

css是html的样式表，如果说HTML决定了网页的内容，那么CSS决定了如何展示这些内容。下图是一个CSS的基本语法结构。其中声明部分比较简单，选择器则有一定的灵活性。网站的风格往往具有一致性，因此现在CSS大量的采用类选择器。

![](http://www.w3school.com.cn/i/ct_css_selector.gif)

###选择器

css的选择器构成了其语法的基本形式，最常用的主要有：

1. 元素选择器 `p{color:rgb(0,0,0);}` 设置p标签的样式
2. 类选择器  `.menu{ color:#FFF;}` 设置menu类的样式
3. ID选择器  `#sidebar{}` 设置ID为sidebar的属性
4. 后代选择器 `.main p{color:#444}` 将main类下的所有p标签设置样式
5. 群组选择器 `h1,h2{color:#222}` 将h1 h2设置样式

不同的选择器可以组合在一起，例如 `div.sidebar p>strong{color:blue;}`表示的是 具有sidebar类的div中 所有的P标签下的子元素 strong颜色为蓝色。 其中空格 和 `>`的区别是，空格表示后代元素，而`>`必须是直接的子元素，嵌套的子元素是无效的。

css拥有继承的特性，即子元素会继承父元素的css属性。

> 伪类 是一种常见的用法，比如`a:hover{color:red;}`，表示链接在鼠标经过时的状态。



###盒模型
![](http://www.w3school.com.cn/i/ct_boxmodel.gif)

盒模型主要应用在布局方面，我们看到的网页大多是由这些box拼接构成的。其中在这方面设置的时候，主要包含了 **margin**、**padiding**、**border**几个属性。
####margin
表示一个box与其他box边框之间的留白距离。我们可以通过margin来设置box四周的留白，也可以使用`margin-top`,`margin-right`,`margin-bottom`和`margin-left`来分别进对四周进行单独的设置。下面是padding常见的使用例子：

    margin: 5%;                /* all sides 5% margin */
    margin: 10px;              /* all sides 10px margin */
    margin: 1.6em 20px;        /* top and bottom 1.6em, left and right 20px margin */
    margin: 10px 3% 1em;       /* top 10px, left and right 3%, bottom 1em margin */
    margin: 10px 3px 30px 5px; /* top 10px, right 3px, bottom 30px, left 5px margin */
    margin: 1em auto;          /* 1em margin on top and bottom, box is horizontally centered */
    margin: auto;              /* box is horizontally centered, 0 margin on top and bottom */

####padding
表示box边框与其内部元素之间的距离。同margin一样，padding也可以单独的进行四个方向的设置。下面是一个同时设置四周内留白的例子：

     padding: 1em 3px 30px 5px;  /*  top    1em  padding  */
                                 /*  right  3px  padding  */
                                 /*  bottom 30px padding  */
                                 /*  left   5px  padding  */
####border
为box的边框，他包含三个值，依次为：

+ <br-width> 默认值为 medium.可用 `border-width`单独设置.
+ <br-style> 默认值是 none. 可用`border-style`单独设置.
+ color 可用`border-color`单独设置.

####width & height

表示content area的宽和高。

####position
表示一个元素的定位方式，具体定位可以由 **top**,**right**,**bottom**和**left**来决定。主要有 `static`, `relative`,`absolute`,`fixed`.其中static是默认的位置值，表示在流布局中。relative会保留元素本应该所属的位置，自己根据设置的偏移量参照原本所属的位置定位（人死了精神还在）。absolute不会保留原来本应该所属的位置，而是根据设置的便宜量重新定位了（没了就是没了）。fixed常用来做一些页面上的小插件，比如『返回顶部』这种功能，他参照浏览器窗口进行绝对定位，所以可以一直保持在浏览器窗口的某一个位置。

值得注意的是，在relative定位时，`left:20px`表示相对元素原本应该所处的位置向左偏移20px,而在absolute定位的时候，表示相对其直接父block向左偏移20px。

###常用的属性

####border-radius

用来设置元素的圆角，非常的方便，他的值为`0`的时候表示没有圆角，值为1px表示圆角的水平半径为1px，并且垂直半径也为1px。例如`#circle{width:100px;height:100px;border-radius:50px]}`就是一个圆了。

####font
和字体相关的样式也是经常用到的，特别是英文类型的网站。

+ 使用`font-family`设置字体的类型，比如微软雅黑等
+ 使用`font-size`设置字体的大小
+ 使用`font-weight`设置字体的粗细
+ 使用`line-height`设置行高

####float 

可选值为 `left|right|none`，表示在其父block中靠左或者右悬放置。

####z-index
表示网页元素的曾层叠，当出现元素之间的覆盖时，`z-index`数值越大的，处在覆盖数值较小的。

-------------

#jQuery

jQuery是一个应用非常广泛的JavaScript框架，它为网页DOM元素操作以及事件处理提供了强大的支持。
