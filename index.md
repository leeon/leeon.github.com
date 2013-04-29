---
layout: page
title: 
tagline: 仰望星空 脚踏实地
---
{% include JB/setup %}

  <p>
    Hello! I'm a <strong><a target="_blank" href="http://en.wikipedia.org/wiki/Software_engineering">SE</a></strong> student from <strong><a target="_blank" href="http://en.hit.edu.cn/" >HIT</a></strong>. I'm now working in Web Intelligence laboratory of CS in HIT, resposible for <strong>WI Inputmethod </strong>android version and <strong>Cloud Platform</strong>.
	I hava many hobbies like photograph, basketball and reading.
  </p>

  <p>
    You can find my Resume <strong><a target="_blank" href="/resume">Here</a></strong></p>
    
#### I want to say
从六楼俯视校园,各种树木摇曳着缤纷的绿,映着高楼和远山.而在寒冷的冬天里，缤纷落尽，繁华消亡，只留下黑色或褐色的枝干，如一支支手伸向清白的天空。可是这些光秃秃的枝干就是树的本来面目吗？冬日看去，便觉万物终归于寂，可是后面还有个春天，有那黝黑的枝干上刹时间涌出绿芽的生机。我总觉得在这些苦难的背后，有什么力量正在生长。

------摘自网络

#### What's New
不管怎么样，遇到困难，就得像个爷们儿一样挺过去

正在努力的實現云詞推送平臺

最近在聽 《青春》

#### Recent 10 Posts

<ul class="posts">
  <!--User limit to set the number of posts listed in the page-->
  {% for post in site.posts limit:10 %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

#### See My Friends
<a href="/links.html">[Links]</a>



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