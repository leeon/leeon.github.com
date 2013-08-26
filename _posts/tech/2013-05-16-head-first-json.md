---
layout: post
title: "Hello,JSON"
description: "Python 中使用JSON"
category: tech
tags: json python 网络
---
> 从未有过，如此轻便

##介绍
JSON(Javascript Object Notation)是一种轻量级的交换语言，易于读写，并且便于转换和生成。它是一种文本格式和语言无关，所以你可以在不同的语言轻松的交换数据，加上轻量级的特点，使得JSON成为一种理想的数据交换格式。

##语法
JSON有两种组成形式：

+ 一个 key/value的集合，比如`{"name":"parker","age":22}`
+ 一个有序列表 比如`["leeon","susie"]`

你可以在 [JSON官网](http://www.json.org/)上找到详细的语法规则。JSON中value支持的数据类型包括：

+ object `{key:value}` key用双引号包围
+ number `{"num":12}`
+ string `{"name":"someone"}`
+ boolean `{"is_married":false}`
+ array `{"lucky_number":[1,2,3]}`
+ null

注意，JSON支持数据的嵌套。


##使用
JSON目前最主要的用途是web数据交换，同样也应用于数据库中。下面是在不同的语言中使用Python的例子。

###In Python
python 2.6 版本后内置了`json`模块，因此可以直接import使用。

{% highlight python %}
# coding=utf-8
import json
import sys

dict_obj = {"name":"leeon","age":22,"lucky_numbers":[1,2,3]}
json_str = json.dumps(dict_obj)
print json_str
json_obj = json.loads(json_str)
print json_obj
{% endhighlight %}

json编码和解码操作是根据Python提供的covert ion table来决定的，会发现string都被转称unicode对象了。


