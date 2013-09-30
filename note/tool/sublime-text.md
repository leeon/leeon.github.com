---
layout: page
title: Sublime Text 2
tagline: 性感的编辑器
group: tool
---
{% include JB/setup %}


## Start

+ `shift+command+p` 调出command pannel
+ `command +P ` 快速的切换文件
+ `command + 数字` 快速切换某个编号的标签页

##多窗口
sublime中每一个新的窗口成为一个group

+ `ctrl+ 数字` 切换到对应编号的group
+ `shift + ctrl + 数字` 将某个文件移到对应编号的组
+ `alt+ command + 数字` 将窗口分为几列 
+ `shift + alt + command + 数字` 将窗口分为几行



## Plugins

插件的安装方法：

1. 打开command pannel
2. 打开package control
3. 输入要安装的插件


------------

###Emmet

一个用来快速编写前端代码的插件，采用`Zen Coding`的语法规则。

最简单的使用是直接敲标签的名字，比如`div`然后按`Tab`键，会直接产生`<div></div>`的代码，当然emmet还支持更加丰富以及高级的代码生成，类似CSS的选择器，你可以通过快速的编写下面的语句来快速的生成代码。

输入`ul>li`

{% highlight html%}
<ul>
  <li></li>
</ul>
{% endhighlight%}

输入`ul > li*3`

{% highlight html%}
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
{% endhighlight %}

输入`div#navbar>ul>li.item{text}*3`

{% highlight html%}
<div id="navbar">
  <ul>
    <li class="item">text</li>
    <li class="item">text</li>
    <li class="item">text</li>
  </ul>
</div>
{% endhighlight%}

当然上面的只是emmet很少的一部分功能，作为非前端的用户，已经很方便了。了解详细的语法可以参照emmet的 <a href="http://docs.emmet.io/" target=_blank>文档</a>

## Tips

> [利用Sublime Text 2 查看开源代码]({{ BASE_PATH }}/經驗分享/subl-source) 



