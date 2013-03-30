---
layout: page
title: Python筆記
tagline: 脚本语言
group: language
---
{% include JB/setup %}

##数据类型

###Dict

####創建
字典是python中目前仅有的内置mapping类型。其基本数据结构为{key:value..}，是一种`无序`的存储结构。其中key是不可变类型，而value可以是任何类型。

{% highlight python %}
aPerson = {} # set a new empty dict
aPerson = {'name':'sara','age':22} #set a new dict
aPerson = dict([('name','sara'),('age',22)]) # set dict from a list
{% endhighlight %}

####基本使用
{% highlight python %}
aPerson = {'name':'sara','age':22}
len(aPerson) # return the number of keys in a dict
aPerson['age'] = 21 # set the value of a key
aPerson['age'] #read the value of a key, I prefer using get()
del aPerson['age'] # delete a particular key
'age' in aPerson # True
{% endhighlight %}

####內置函數
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

####遍歷
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