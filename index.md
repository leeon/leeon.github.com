---
layout: page
title: 
tagline: 仰望星空 脚踏实地
---
{% include JB/setup %}

  <p>
    Hello! I'm a <a target="_blank" href="http://en.wikipedia.org/wiki/Software_engineering">SE</a> student from <a href="http://en.hit.edu.cn/" >HIT</a>. I am now working in Web Intelligence laboratory of CS in HIT, resposible for <strong>WI Inputmethod </strong>android version and <strong>Cloud Platform</strong>.
	I hava many hobbies like photograph， basketball and reading.
  </p>

  <h5>You can find me</h5>
<p>
    <a target="_blank" href="http://github.com/leeon">
     <img src="/assets/images/icons/github.png">
    </a>

    <a target="_blank" href="http://weibo.com/v5liyang">
     <img src="/assets/images/icons/sina.png">
    </a>

     <a target="_blank" href="http://www.facebook.com/v5liyang">
        <img src="/assets/images/icons/facebook.png">
      </a>
 
      <a target="_blank" href="http://www.linkedin.com/in/linkleeon">
        <img src="/assets/images/icons/linkedin.png">
      </a>
      <a target="_blank" href="http://www.douban.com/people/octobershiner/">
      	<img src="/assets/images/icons/douban.png">
      </a>
</p>

#### Recent Posts

<ul class="posts">
  <!--User limit to set the number of posts listed in the page-->
  {% for post in site.posts limit:5 %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

#### To-Do


>This page is edited on 2013-03-22.