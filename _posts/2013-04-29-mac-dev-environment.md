---
layout: post
title: "Mac终端开发环境：iTerm2 + zsh + oh-my-zsh"
description: "Mac终端开发环境：iTerm2 + zsh + oh-my-zsh"
category: 經驗分享
---
{% include JB/setup %}

##关于iTerm 2

iTerm 2 是一款替代原生系统终端工具的利器，它支持多窗口多标签的操作，同时允许用户自定义很多种主题。

我喜欢的特性：

####自定义主题
在preferences -> Profiles -> Colors -> loadPresets下可以导入本地的主题文件。

我使用的主题文件是：[Solarized](https://github.com/leeon/dotFiles/tree/master/res/iterm)

####多窗口管理
我们可以使用多窗口，也可以使用多标签来操作。

分割当前的窗口可以使用：

`cmd + d` 水平分割窗口

`cmd + shift + d` 垂直分割窗口

`cmd + [` 和 `cmd + ]`在分割窗口之间切换



使用多标签页可以采用

`cmd + n` 创建新的标签页

`cmd + 数字`  在不同的标签中切换

`cmd + w`关闭当前的标签页


### 关于zsh
如果觉得每天不断的敲cd命令烦死了人，或者被各种tab扰乱，那么肯能你就是需要换一个终端环境了，那就是zsh.

zsh和原来的bash相比主要的优势就是更多的人性化的操作体验，主要在命令补全方面,一些tips:

+ 输入`d`,zsh会列出最近访问的目录，再输入对应的编号，即可快速切换到某个目录
+ 输入一些命令的一部分，`tab`自动补全

Mac OS 上推荐使用homebrew安装:

{% highlight bash %}
brew install zsh
{% endhighlight %}



### 关于oh-my-zsh
oh-my-zsh是很多程序员使用zsh的一个重要的原因，他是一个管理zsh配置的工具，提供了主题和插件等的管理，下面一段是来自其Github主页的介绍：

> A community-driven framework for managing your zsh configuration. Includes 120+ optional plugins (rails, git, OSX, hub, capistrano, brew, ant, macports, etc), over 120 themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community.

安装方法：
可以参照 Github项目主页 ：[链接](https://github.com/robbyrussell/oh-my-zsh)

安装完成后，可以看到你的`~`目录下，多了`.oh-my-zsh`，里面包含了很多主题和插件，可以在`.zshrc`下面进行具体的配置，动手吧。

###参考
我的配置文件放在Github上进行管理，[链接](https://github.com/leeon/dotFiles)