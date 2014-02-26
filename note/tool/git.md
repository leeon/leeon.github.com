---
layout: page
title: Git
tagline: Git让写代码变得sexy
group: tool
---

> 学习git的一些总结 笔记版本 `v1.2` 

##背景知识
 
####历史故事：

+ 本地版本控制
+ 集中式版本控制
+ 分布式版本控制

`Git`作为分布式的版本控制软件，可以在离线的情况下实现，提交合并，创建里程碑等操作。这样每个人在本地提交的时候都不需要考虑是否会产生冲突的情况。


####实现原理：

Git保存的不是文件差异和变化量而是一些列的文件快照。
Git关注的是文件是不是发生了变化，如果有变化则记录新的快照，如果没有则创建一个单纯的链接指向原来的文件。

![](/assets/images/pages/git1.png)

Git中分为工作环境（Workspace），暂存区（State/Index），版本库（Repository）。

三种文件状态 ：

- 已提交 commited   
- 已暂存 staged (add 之后)
- 已修改 modified

![](http://marklodato.github.io/visual-git-guide/basic-usage.svg)

Git 中的分支，其实本质上仅仅是个指向 commit 对象的可变指针。


####基本的工作流：

1. 在工作目录中修改某些文件。 
2. 对修改后的文件进行快照，然后保存到暂存区域。 
3. 提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。

##配置

    git config 三个级别: 版本库  全局 系统 优先级依次递减 类似程序设计中的变量作用域
    git config --system  对应 /etc/gitconfig
    git config --global 对应~/.gitconfig 
    git config -e 执行编辑文件
    git config [--options] <section>.key value  用于编辑 .gitconfig 文件中的某一个特定项目的值

####常用配置    
    user.name value
    user.email value
    core.editor emacs 
    merge.tool vimdiff
    core.quotepath false   正常显示中文

##一人一分支（阶段一）

####git init
初始化一个版本库

####git clone
从远程初始化一个版本库,复制到本地

####git add
向staged区添加一个新的文件『变化』 git add .添加所有的文件『变化』,每当我们完成文件的部分修改后都可以使用`add`命令，将这些变化添加到staged区域。（

> 区别于svn add命令，git中文件多次变化可能会需要多次的add操作，而svn只要对一个文件进行一次add,就会一直跟踪变化

####git commit
提交版本,将暂存区的修改一起提交到版本库，形成一个版本。一次提交一般表示着项目进入了一个新的阶段。

+ -m "message"   表示附上提交信息
+ -a 表示跳过暂存区直接提交此命令只对已经被add的文件有效，即用于省去多次对一个文件add的操作，要理解-a参数，还是要理解add的是变化，而不是文件本身。
+ --amend 补充上次提交

> 区别于svn,git中的提交是提交到本地版本库而不是远端服务器

####git status
查看当前工作区域和暂存区域的状态



####git checkout -- FILE

把工作区的某个文件还原为上次提交或者上次暂存的状态


####git reset

在版本之间切换，`HEAD`指针表示当前的所在的版本，默认指向最近的一次提交。Git中每一次提交都会有唯一的校验码标识。
    
    git reset --hard HEAD^   表示切换到HEAD的前一次提交
    git reset --haed HEAD~10 切换到HEAD前十次提交

####git reflog

默认记录HEAD指针的引用变化情况，HEAD@{0}代表HEAD当前的值，HEAD@{3}代表HEAD三次变化之前的值。主要用于找回丢失的提交SHA1值。


####git log
查看历史提交记录

+ -n 3   查看最近的3次提交历史
+ --oneline  单行显示每次提交记录
+ --stat   显示变化的文件
+ -p   最详细的log
+ --author   查看指定作者的提交
+ --since    查看指定日期的提交
+ git log --graph --decorate ﻿--oneline  美化格式

####其他操作

    git rm 删除
    git mv 移动




###一人多分支（阶段二）


####git branch

    git branch 列出本地的分支
    git branch branchname 创建一个分支
    git merge branchname  将某个分支合并到当前分支 
    git branch -v 显示每一个分支的最后提交信息



#### git checkout

    git checkout 根据标签和具体的哈希值切换到响应的版本 在不同分支间切换
    git checkout -b 创建一个分支并立即切换到新的分支

#### git tag

    git tag 列出所有标签
    git tag -d 删除某一个标签
    git tag -l ' reg' 列出指定格式标签

####其他

    git diff 查看工作区文件和已经暂存的文件变化
    git diff --staged 查看已经暂存的文件和版本库中的文件区别
    git revert 撤销提交




###小伙伴们的Git (阶段三)：

    git remote add [shortname] [url] 添加
    git push [remote-name] [branch-name] 推送
    git push origin --tags 将本地标签推送到远程版本库

    git remote 显示远程库  -v现实具体地址

    git fetch origin 更新远程版本库的数据
    git push origin serverfix:somebranch 推送新的分支
    git merge origin/serverfix 合并远程分支
    git checkout --track origin/serverfix


###一些Tips:

创建 .gitignore 文件来指定忽略文件的名字
文件格式：

- 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。 * 匹配模式最后跟反斜杠（/）说明要忽略的是目录。 * 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。星号（\*）匹配零个或多个任意字符；[abc] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（?）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如[0-9] 表示匹配所有 0 到 9 的数字）。



- 执行修改后必须add否则不会被提交到版本库
- 尽量不要使用`git . `要看清是不是都需要提交的文件
- 定义别名 真有快感啊
- 利用 git hist 先看hasn码 然后checkout切换到对应的分支，主分支是master
- 撤销未跟踪的修改  checkout 版本库的该文件
