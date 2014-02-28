---
layout: note
title: CSS笔记
tagline: 我会的就这么多
group: web
update: 2014.1.1
---
>追求生活中美的东西，所以我也学一点前端  2014-01-07 updated


##基础

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



###使用框架

常见的框架主要有：Bootstrap,Pure


##布局

###display
表示如何渲染一个元素，常见的几种属性有：

`display:none|inline|block`

+ none 不显示元素，其他元素假设该元素不存在一样处理
+ inline 行内元素，优先将元素在行块内进行布局
+ block 块元素，多个块元素会垂直分布
+ inline-block 

###postion

`position:static|relative|absolute|fixed`

表示一个元素的定位方式，具体定位可以由 **top**,**right**,**bottom**和**left**来决定。其中static是默认的位置值，表示在流布局中。其他位置属性都会使得元素脱离文档流，relative定位时，元素的原来位置不会被忽略，自己根据设置的偏移量参照原本所属的位置定位（人死了精神还在）。absolute定位时，元素原来的位置在文档流中会被忽略。（没了就是没了）。fixed常用来做一些页面上的小插件，比如『返回顶部』这种功能，他参照浏览器窗口进行绝对定位，所以可以一直保持在浏览器窗口的某一个位置。

值得注意的是，在relative定位时，`left:20px`表示相对元素原本应该所处的位置向左偏移20px,而在absolute定位的时候，表示相对其直接父block向左偏移20px。


###float
`float:left|right`

同于排版中浮动的概念，浮动的元素会脱离文档流向父容器的左或者右浮动，直到接触了容器的边缘或者其他浮动元素的边缘。

###clear
`clear:both|left|right|none`

清除浮动样式


###overflow
`overflow:visible|hidden|scroll|auto`

针对block类型元素，表示超出容器部分的内容如何展现。`visible`为默认值,表示超出部分继续显示，`hidden`表示超出部分不显示，`scroll`表示出现滚动条，`auto`表示交给浏览器去具体处理。



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

+ br-width 默认值为 medium.可用 `border-width`单独设置.
+ br-style 默认值是 none. 可用`border-style`单独设置.
+ color 可用`border-color`单独设置.

####width & height

表示content area的宽和高。


##常用的属性

####border-radius

用来设置元素的圆角，非常的方便，他的值为`0`的时候表示没有圆角，值为1px表示圆角的水平半径为1px，并且垂直半径也为1px。例如`#circle{width:100px;height:100px;border-radius:50px]}`就是一个圆了。

####font
和字体相关的样式也是经常用到的，特别是英文类型的网站。

+ 使用`font-family`设置字体的类型，比如微软雅黑等
+ 使用`font-size`设置字体的大小
+ 使用`font-weight`设置字体的粗细
+ 使用`line-height`设置行高


####z-index
表示网页元素的曾层叠，当出现元素之间的覆盖时，`z-index`数值越大的，处在覆盖数值较小的。


##伪类

####::after

表示在某个元素后面填充**虚拟**的元素

    div::after{content:"some";display:block;}
    li::before{contet:url(img.png)}

> 注意，::after标签产生的是虚拟内容，虽然可以显示，但是并不会出现在DOM中，因此无法对其进行进一步的操作。

#Bootstrap

使用框架的前提基础是理解HTML中的类和ID选择和组合。

##网格系统
高大上的前端开源框架，使用12\*12的网格布局。

`div.cntainer` 表示一个容器

`div.row` 表示一行，需要在container中

`div.col-md-12` 表示一列，需要在row中

`col-xs-`手机  `col-sm-`平板 `col-md-`桌面 `col-lg`桌面，分别表示不同尺寸的屏幕，选择其中一种，在大于该尺寸的设备上都会适用该样式，并且会覆盖针对小屏幕设置的样式。也就是说`col-md-`适用于普通桌面和更大的桌面。

如果都使用`col-md-`的话，表格在桌面上会水平分布，但是在手机和平板上，会出现堆叠。解决的方法是针对不同的屏幕尺寸设置分栏的效果。例如：
    
    <div class="row">
        <div class="col-xs-12 col-md-8">...</div>
        <div class="col-xs-6 col-md-4">...</div>
    </div>


`col-md-offset-` 表示照原来位置的偏移




##new in 3.x
`<img src="..." class="img-responsive" alt="Responsive image">` 

响应式图片

