---
layout: page
title: Linux 常用命令
tagline: 喜欢看屏幕翻滚的赶脚
group: os
---
##文件管理

------------------

### _find_

查找文件命令，根据名字的目录或者文件

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
创建连接（使用绝对路径创建链接）,默认创建硬连接

ln [arguments] [sourceFile] [targetFile]

*arguments:* 

- *-s* 创建软连接 [关于软链接](http://www.cnblogs.com/itech/archive/2009/04/10/1433052.html)

### _cat_
显示文件或者链接文件并且打印

`cat filename` 显示一个文件
`cat > filename` 从输入创建一个文件
`cat file1 file2` 将file1的内容追加到file2

*arguments:* 

- *-n*在每一行上加上编号
- *-b*非空行加上编号


### _ps_
查看进程信息

`ps` 查看当前用户在当前terminal下的进程信息
`ps -ef|git` 查看git相关进程
*arguments:*

- *-A*显示所有的进程信息
- *-c*不显示进程的绝对路径
- *|grep*用正则过滤查看进程
- *-u*指定用户进程
- *-f*显示进程关系

###_chmod_
改变目录或者文件的权限
>一个文件权限描述分为10位，第一位表示文件类型，d表示目录，-表示文件。后面9位，每3位一组，分别表示 文件拥有者、同组用户和其他用户的权限。

例如：`drwxr-xr-x` 表示这是一个目录，拥有者可以读写并执行，同组用户只读可执行，其他用户只读可执行

`chmod a+w 1.log` 给所有用户加上写权限
`chmod g+x 1.log` 给同组用户加上可执行权限
`chmod 777 1.log` 给当前用户加上文件的所有权限， 777三位分别对应三个用户组权限的2进制

