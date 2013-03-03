---
layout: page
title: Yang Lee
tagline: 仰望星空 脚踏实地
---
{% include JB/setup %}


Hey, welcome to my homepage. I am Li Yang from [Harbin Institute of Technology](http://www.hit.edu.cn) majoring in software engineering. Coding is bringing me with a lot of fun. Besides, I am also fond of reading about finance and psychology which used to be my first choice before coming to college. I am now working in Web Intelligence laboratory of CS in HIT, resposible for WI Inputmethod android platform. You can learn more [here](http://wi.hit.edu.cn/im). After the internship in Tencent, I am doing some work in building the Cloud Platform for WI. The technologies I focus on are Java、UNIX、Python、MySQL and some JS framworks. Sometimes I also do some ACM puzzles

In my spare time, I enjoy writing blogs and traveling. Here are some [Photos](http://leeon.pp.163.com/) I took. Now I prefer a calm life

## Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## To-Do


>This page is edited on 2013-03-03.