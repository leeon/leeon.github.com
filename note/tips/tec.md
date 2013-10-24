---
layout: page
title: Tech Trouble issues
tagline: 
group: tips
---
> `cmd+f`查找你想了解的关键词

###issue 1001 
`Android SDK 更新时报“https://dl-ssl.google.com refused”错误`

    打开Android SDK Manager->Tools-Options ，勾选Force https://… sources to be fetched using http://
    在系统的hosts文件中添加：(IN Mac  type sudo vim /etc/hosts)
    203.208.46.146 www.google.com
    203.208.46.146 dl.google.com 
    203.208.46.146 dl-ssl.google.com


###issue 1002
`Mac上无法打开部分网页，但是可以上QQ等工具`

    打开 系统偏好设置--网络--高级--DNS
    添加新的DNS 8.8.4.4 或者 8.8.8.8
