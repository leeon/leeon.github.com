---
layout: page
title: Sublime Text 2
tagline: 性感的编辑器
group: tool
---
{% include JB/setup %}


### Start

`shift+command+p` 调出command pannel

### Plugins

插件的安装方法：

1. 打开command pannel
2. 打开package control
3. 输入要安装的插件


-----------
####Gist
使用Github上的Gist服务，管理代码片段。

首先进行配置，在插件包的配置文件中填写Github的账号信息，如果你的OS X上有github的keychain的话，就不用配置了

#####创建
在command pannel中输入`gist`就可以看到所有的命令，我们可以选中一部分代码，然后使用`create public Gist` 来添加到版本库中。

因为Gists没有分类支持，所以为了方便检索，我们可以这样定义 `Java:File Comments`

#####使用
在command pannel中输入`open gist`，就可以列出所有的代码片段,输入`Java`就会过滤出所有Java的代码片段了，只可惜学校的网速太差，效果并不是很爽

#####管理
通过open Gist打开的片段都可以进行自由的管理，更新，删除等操作。

------------
####Code
### Tips

> [利用Sublime Text 2 查看开源代码]({{ BASE_PATH }}/經驗分享/subl-source) 



