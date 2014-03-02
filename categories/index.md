---
layout:  page
title: Categories
description: 主题归档
---
按时间排序,可以通过[日期归档](/archive/)查看：


<div class="row">
    <div class="col-md-2 cover">
        <a href="#tech"><img src="../lib/img/cover-tech.jpg" alt=""></a>
        <h4>技术</h4>
    </div>
        <div class="col-md-2 cover">
        <a href="#share"><img src="../lib/img/cover-share.jpg" alt=""></a>
        <h4>分享</h4>
    </div>
        <div class="col-md-2 cover">
        <a href="#blog"><img src="../lib/img/cover-blog.jpg" alt=""></a>
        <h4>随笔</h4>
    </div>
        <div class="col-md-2 cover">
        <a href="#log"><img src="../lib/img/cover-log.jpg" alt=""></a>
        <h4>日志</h4>
    </div>
        <div class="col-md-2 cover">
        <a href="#book"><img src="../lib/img/cover-book.jpg" alt=""></a>
        <h4>读书</h4>
    </div>
</div>



<div class="row categories-list">
    <div class="col-md-12">
        <ul class="archive">
        {% for cat in site.categories %}
            <li class="year" id="{{ cat[0] }}">{{ cat[0] }} ({{ cat[1].size }})</li>
            {% for post in cat[1] %}
            <li class="item">
                <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
            </li>
            {% endfor %}
        {% endfor %}
        </ul>        
    </div>
</div>
