---
layout: page
title: Tech Trouble issues
tagline: 
group: tips
---

###issue 1001 
`Android SDK 更新时报“https://dl-ssl.google.com refused”错误`

    打开Android SDK Manager->Tools-Options ，勾选Force https://… sources to be fetched using http://
    在系统的hosts文件中添加：(IN Mac  type sudo vim /etc/hosts)
    203.208.46.146 www.google.com
    203.208.46.146 dl.google.com 
    203.208.46.146 dl-ssl.google.com
