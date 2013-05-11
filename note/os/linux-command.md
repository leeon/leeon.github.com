---
layout: page
title: Linux 常用命令
tagline: 喜欢看屏幕翻滚的赶脚
group: os
---
{% include JB/setup %}

##文件管理

------------------

### _find_

根据名字的目录或者文件

`find [dir] [-name] [name]` 

*arguments:* 

-  *-ls* 查找文件并显示



### _ls_
显示当前的目录下的文件

ls [arguments][Dir]

*arguments:* 

- *-a* 显示所有文件（包括隐藏）
- *-l* 显示文件的详细信息
- *-i* 显示文件索引节点信息


### _ln_
创建连接（使用绝对路径创建链接）

ln [arguments] [sourceFile] [targetFile]

*arguments:* 

- *-s* 创建软连接 [关于软链接](http://www.cnblogs.com/itech/archive/2009/04/10/1433052.html)
