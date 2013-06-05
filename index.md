---
layout: page
title: 
tagline: 仰望星空 脚踏实地
---
{% include JB/setup %}

Hello! I'm a <strong><a target="_blank" href="http://en.wikipedia.org/wiki/Software_engineering">SE</a></strong> student from <strong><a target="_blank" href="http://en.hit.edu.cn/" >HIT</a></strong>. I'm now working in Web Intelligence laboratory of CS in HIT, resposible for <strong>WI Inputmethod </strong>android version and <strong>Cloud Platform</strong>.
I hava many hobbies like photograph, basketball and reading.

You can find my Resume <strong><a target="_blank" href="/resume">Here</a></strong>

#### What's New

非常好玩的音乐排行榜 <strong><a target="_blank" href="http://rank.leeon.org"> 在这里</a></strong>

毕业季的味道越来越浓

正在练习杀球

#### Recent 10 Posts

<ul class="posts">
  <!--User limit to set the number of posts listed in the page-->
  {% for post in site.posts limit:10 %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

#### See My Friends
<a href="/links.html">[我的朋友们]</a>



####You can find me
<p>
    <a target="_blank" href="http://github.com/leeon">
     <img src="/assets/images/icons/github.png">
    </a>

     <a target="_blank" href="http://www.facebook.com/v5liyang">
        <img src="/assets/images/icons/facebook.png">
      </a>
     <a target="_blank" href="http://www.linkedin.com/in/linkleeon">
        <img src="/assets/images/icons/linkedin.png">
      </a>
      <a target="_blank" href="https://www.evernote.com/pub/liyang1031/share.leeon.org">
        <img src="/assets/images/icons/evernote.png">
      </a>
    <a target="_blank" href="http://weibo.com/v5liyang">
     <img src="/assets/images/icons/sina.png">
    </a>
 

      <a target="_blank" href="http://www.douban.com/people/octobershiner/">
      	<img src="/assets/images/icons/douban.png">
      </a>
      <a target="_blank" href="http://www.xiami.com/u/769076">
        <img src="/assets/images/icons/xiami.ico">
      </a>

</p>




>This page is edited on 2013-04-29.