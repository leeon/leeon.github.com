---
layout:  page
title: Categories
description: 分类
---
那时候觉得生活一团乱，后来回味其实就是那么几件事情：

<div class="tagcloud upper gray">
{% for cat in site.categories %}
<a href="#{{ cat[0] }}">{{ cat[0] }}</a>
{% endfor %}
</div>

<ul class="archive">
{% for cat in site.categories %}
	<li class="year" id="{{ cat[0] }}">{{ cat[0] }} ({{ cat[1].size }})</li>
	{% for post in cat[1] %}
	<li class="item">
		<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
		<a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
	{% endfor %}
{% endfor %}
</ul>
