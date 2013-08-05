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

## Plugins

插件的安装方法：

1. 打开command pannel
2. 打开package control
3. 输入要安装的插件


-----------
###Gist
使用Github上的Gist服务，管理代码片段。

首先进行配置，在插件包的配置文件中填写Github的账号信息，如果你的OS X上有github的keychain的话，就不用配置了

####创建
在command pannel中输入`gist`就可以看到所有的命令，我们可以选中一部分代码，然后使用`create public Gist` 来添加到版本库中。

因为Gists没有分类支持，所以为了方便检索，我们可以这样定义 `Java:File Comments`

####使用
在command pannel中输入`open gist`，就可以列出所有的代码片段,输入`Java`就会过滤出所有Java的代码片段了，只可惜学校的网速太差，效果并不是很爽

####管理
通过open Gist打开的片段都可以进行自由的管理，更新，删除等操作。

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



