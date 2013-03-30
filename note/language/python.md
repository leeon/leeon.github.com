---
layout: page
title: Python筆記
tagline: 脚本语言
group: language
---
{% include JB/setup %}

###序列
python中的序列主要有list和tuple,后者是一种不可变的list。list类似于一个动态的数组，可以动态添加元素，同时允许每一个元素可以为不同类型，支持嵌套。
{% highlight python %}
aList = [] #set a new empty list
{% endhighlight %}
######索引
序列支持正向和负向的索引,`0`表示左边第一个元素，`-1`表示从右边数第一个元素。比如：
{% highlight python %}
aList = ['a','b','c','d']
aList[0] #'a'
aList[-1] #'d'
'hello'[2] #also support this way , 'l'
{% endhighlight %}

######切片
分片（slice）操作是为了获取序列中的某一个子序列，其基本语法是:

`'squence'[start:end:step]`


`'sequence'[1:2]` 等价于`'sequence'[1:2:1]'`

如果把start或者end置为空，就表示尽可能取最长,几个例子：
{% highlight python %}
'hello'[1：2] #‘e’
'hello'[1:] #‘ello’
'hello[:]' #actually the whole string

{% endhighlight %}

######基本操作

{% highlight python %}
# coding=utf-8
 
 # Filename : list.py
 # Date: 2012 11 20
 
 
 
 # 创建一个list方式
 heatList = ['wade','james','bosh','haslem']
 tableList = list('123')  #list方法接受一个iterable的参数
 
 print 'Miami heat has ',len(heatList),' NBA Stars , they are:'
 
 #遍历list中的元素
 for player in heatList:
     print player,
 
 
 #向list添加元素
 heatList.append('allen') #方式一：向list结尾添加 参数object
 print '\nAfter allen join the team ,they are: '
 print heatList
 
 heatList.insert(4,'lewis') #方式二：插入一个元素 参数一：index位置 参数二：object
 print 'After lewis join the team, they are:'
 print heatList
 
 heatList.extend(tableList)  #方式三：扩展列表，参数：iterable参数
 print 'After extend a table list,now they are :'
 print heatList
 
 #从list删除元素
 heatList.remove('1')   #删除方式一：参数object 如有重复元素，只会删除最靠前的
 print" Remove '1' ..now '1' is gone\n",heatList
 
 heatList.pop()   #删除方式二：pop 可选参数index删除指定位置的元素 默认为最后一个元素
 print "Pop the last element '3'\n",heatList
 
 del heatList[6] #删除方式三：可以删除制定元素或者列表切片
 print "del '3' at the index 6\n",heatList
 
 
 #逻辑判断
 
 #统计方法 count 参数：具体元素的值
 print 'james apears ',heatList.count('wade'),' times'
 
 #in 和 not in 
 print 'wade in list ? ',('wade' in heatList)
 print 'wade not in list ? ',('wade' not in heatList)
 
 #定位 index方法：参数：具体元素的值 可选参数：切片范围
 print 'allen in the list ? ',heatList.index('allen')
 #下一行代码会报错，因为allen不在前三名里
 #print 'allen in the fisrt 3 player ? ',heatList.index('allen',0,3)
 
 #排序和反转代码
 print 'When the list is reversed : '
 heatList.reverse()
 print heatList
 
 print 'When the list is sorted: '
 heatList.sort() #sort有三个默认参数 cmp=None,key=None,reverse=False 因此可以制定排序参数以后再讲
 print heatList
 
 #list 的分片[start:end] 分片中不包含end位置的元素
 print 'elements from 2nd to 3rd ' , heatList[1:3]
{% endhighlight %}

######列表和元组的区别

- 前者可变，后者只读

###字典

######創建
字典是python中目前仅有的内置mapping类型。其基本数据结构为{key:value..}，是一种`无序`的存储结构。其中key是不可变类型，而value可以是任何类型。

{% highlight python %}
aPerson = {} # set a new empty dict
aPerson = {'name':'sara','age':22} #set a new dict
aPerson = dict([('name','sara'),('age',22)]) # set dict from a list
{% endhighlight %}
######基本使用
{% highlight python %}
aPerson = {'name':'sara','age':22}
len(aPerson) # return the number of keys in a dict
aPerson['age'] = 21 # set the value of a key
aPerson['age'] #read the value of a key, I prefer using get()
del aPerson['age'] # delete a particular key
'age' in aPerson # True
{% endhighlight %}

######內置函數
{% highlight python %}
aPerson = {'name':'sara','age':22}
aPerson.get('name','someone') 
# recommend! if name not in dict return 'someone'  PS:like getItem() in HTML5
aPerson.keys() # get all the keys in the form of list
aPerson.values() # get all the values in the form of list
aPerson.items() # guess !
aPerson.pop('age') # act the same as pop in stack
aPerson.clear() # clean the dict --> {}
aPerson.fromkeys([1,2,3],0) # set a dict from a list of keys with default value 0
aPerson.copy() #swallow copy of a dict
{% endhighlight %}

######遍歷
基本有兩種實現方式：一是遍歷items()生成的list,而是通過iteritems()生成的迭代器，後者效率更高。

{% highlight python %}
aPerson = {'name':'sara','age':22}
for k,v in aPerson.iteritems():
    print k,v
{% endhighlight %}



##內存模型
####關於深拷貝和淺拷貝
python中的`copy`和`deep copy`兩個函數，下面是一段代碼形象的表示區別。
原理概括：對一個對象進行淺拷貝其實新創建了一個類型跟原型對象一樣，其內容是原對象元素的引用。
{% highlight python %}
import copy
a = [1, 2, 3, 4, ['a', 'b']] 
b = a 
c = copy.copy(a) 
d = copy.deepcopy(a) 
a.append(5) 
a[4].append('c')

print 'a = ', a
print 'b = ', b
print 'c = ', c
print 'd = ', d

{% endhighlight %}
顯示結果：
{% highlight bash %}
a =  [1, 2, 3, 4, ['a', 'b', 'c'], 5]
b =  [1, 2, 3, 4, ['a', 'b', 'c'], 5]
c =  [1, 2, 3, 4, ['a', 'b', 'c']]
d =  [1, 2, 3, 4, ['a', 'b']]
{% endhighlight %}


##String
##模块
##Class