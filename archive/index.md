---
layout:  page
title: Archive
description: 归档
---

这里有一些**[标签](../tags)**帮你选择喜欢的话题：

<div class="row">
    <div class="col-md-12 categories-list">
        <ul class="archive">
        {% for post in site.posts %}
          {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
          {% if year != y %}
            {% assign year = y %}
            <li class="year">{{ y }}</li>
          {% endif %}
          <li class="item">
            <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
            <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
          </li>
        {% endfor %}
        </ul>        
    </div>
</div>
