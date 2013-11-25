---
layout: page
title: Nginx
tagline: 轻量级并发服务器
group: tool
---


###Info
Nginx（发音同engine x）是一款由俄罗斯程序员Igor Sysoev所开发轻量级的网页服务器、反向代理服务器以及电子邮件（IMAP/POP3）代理服务器。Nginx相较于Apache、lighttpd具有占有内存少，稳定性高等优势，并且依靠并发能力强，丰富的模块库以及友好灵活的配置而闻名。

### Setup 
在`Mac OS`上安装Nginx非常简单，可以用port或者`homebrew`等软件来安装比如：

{% highlight bash %}
brew install nginx
{% endhighlight%}

brew会自动的安装nginx所依赖的其他软件包，新版本`1.2.7`安装完成后会自动开启在`8080`端口。当使用下面命令时：

{% highlight bash %}
sudo nginx
{% endhighlight%}

nginx会在`80`端口开启。

### Command

>Options:

> -?,-h         : this help

>-v            : show version and exit

>-V            : show version and configure options then exit
 
>-t            : test configuration and exit
 
>-q            : suppress non-error messages during configuration testing
 
>-s signal     : send signal to a master process: stop, quit, reopen, reload
 
>-p prefix     : set prefix path (default: /usr/local/Cellar/nginx/1.2.7/)
 
>-c filename   : set configuration file (default: /usr/local/etc/nginx/nginx.conf)
 
>-g directives : set global directives out of configuration file



### Configuration
MacOS 10.8上通过brew安装后，其配置文件在`/user/local/etc/nginx/nginx.conf`这个路径，当然页可以通过下面的命令直接查找：
{% highlight bash %}
find / -name nginx.conf
{% endhighlight%}

