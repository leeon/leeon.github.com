---
layout: page
title: 
tagline: 仰望星空 脚踏实地
---
{% include JB/setup %}

<div class="pure-g">

<div class="pure-u-1-3">
  <div class="hero"><h3>What's New</h3> </div>
  <p>一起来过夏天吧</p>
</div>

<div class="pure-u-1-3">
  <div class="hero">  <h3>Recent 5 Posts</h3></div>

  <ul>
    <!--User limit to set the number of posts listed in the page-->
    {% for post in site.posts limit:5 %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
  </div>

  <div class="pure-u-1-3">
    <img src="/assets/images/me.png">
  </div>

</div>



<div class="size-chart l-vbox pure-g">
        <div class="size-chart-item size-chart-github pure-u" style="width:15%;">
            <a class="size-chart-label" target="_blank" href="http://github.com/leeon">
                Github <span class="size-chart-size">leeon</span>
            </a>
        </div>
         <div class="size-chart-item size-chart-weibo pure-u" style="width: 25%;">
            <a class="size-chart-label" target="_blank" href="http://weibo.com/v5liyang">
                微博 <span class="size-chart-size">@李陽Leeon</span>
            </a>
        </div>
        <div class="size-chart-item size-chart-douban pure-u" style="width: 20%;">
            <a class="size-chart-label" target="_blank" href="http://www.douban.com/people/octobershiner/">
                豆瓣 <span class="size-chart-size">octobershiner</span>
            </a>
        </div>
        <div class="size-chart-item size-chart-xiami pure-u" style="width: 25%;">
            <a class="size-chart-label" target="_blank" href="http://www.xiami.com/u/769076">
                蝦米 <span class="size-chart-size">leeon</span>
            </a>
        </div>
        <div class="size-chart-item size-chart-linkedin pure-u" style="width: 7%;">
            <a class="size-chart-label" target="_blank" href="http://www.linkedin.com/in/linkleeon">
                Linkedin <span class="size-chart-size">linkleeon</span>
            </a>
        </div>
        <div class="size-chart-item size-chart-facebook pure-u" style="width: 8%;">
            <a class="size-chart-label" target="_blank" href="http://www.facebook.com/v5liyang">
                Facebook <span class="size-chart-size">v5liyang</span>
            </a>
        </div>

</div>

`This page is edited on 2013-07-31. With the power of Pure.`