---
layout: note
title: Python笔记
tagline: 脚本语言
group: language
update: 2013.6.12
---
>笔记中源码可参考 项目 <a href="https://github.com/leeon/pythonTaste" target=_blank >pythonTaste</a>

##Hello World
Python采用缩进控制代码的结构，这是其直观的特点。

###基本操作符

加减乘除 `+`  `-`  `*`  `/` `//` 

取摸`%` 

指数`**`

比较大小 `>`  `<`  `<= ` `>=`

与 或 异或  `&`  `|` `^`

复合加减乘除 `+=`  `-=`  `*=` `\=` 

等与不等`==`  `!=`

**其中**`/`表示普通除法， `//`表示执行整除，其结果舍弃小数位.


###注释
    
    #Python中使用单行注释
    
    #多行
    #注释
    
    """
       还可以使用
       文档字符串
       进行多行注释
    """



##数据结构

###序列（List & Tuple）
python中的序列主要有list和tuple,后者是一种不可变的list。list类似于一个动态的数组，可以动态添加元素，同时允许每一个元素可以为不同类型，支持嵌套。

    aList = [] #set a new empty list
    
####索引
序列支持正向和负向的索引,`0`表示左边第一个元素，`-1`表示从右边数第一个元素。比如：

    aList = ['a','b','c','d']
    aList[0] #'a'
    aList[-1] #'d'
    'hello'[2] #also support this way , 'l'

####切片
分片（slice）操作是为了获取序列中的某一个子序列，其基本语法是:

`'squence'[start:end:step]`

其中索引是左闭右开的。

`'sequence'[1:2]` 等价于`'sequence'[1:2:1]'`

如果把start或者end置为空，就表示尽可能取最长,几个例子：

    'hello'[1：2] #‘e’
    'hello'[1:] #‘ello’
    'hello[:]' #actually the whole string 可以生成一份当前list的副本

列表的索引还可以是负数，表示负向索引，从右边开始选。例如
    
    'hello'[1,-1]  #'ell'

下面的图可以帮助你更好的理解索引

     +---+---+---+---+---+
     | H | e | l | p | A |
     +---+---+---+---+---+
     0   1   2   3   4   5
    -5  -4  -3  -2  -1
    
    

####基本操作

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

> 表和元组的区别 :前者可变，后者只读

###字典

####创建
字典是python中目前仅有的内置mapping类型。其基本数据结构为{key:value..}，是一种`无序`的存储结构。其中key是不可变类型，而value可以是任何类型。

    aPerson = {} # set a new empty dict
    aPerson = {'name':'sara','age':22} #set a new dict
    aPerson = dict([('name','sara'),('age',22)]) # set dict from a list

####基本使用
    
    aPerson = {'name':'sara','age':22}
    len(aPerson) # return the number of keys in a dict
    aPerson['age'] = 21 # set the value of a key
    aPerson['age'] #read the value of a key, I prefer using get()
    del aPerson['age'] # delete a particular key
    'age' in aPerson # True

####內置函数
    
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
    
####遍历

基本有兩種實現方式：一是遍歷`items()`生成的list,二是通過iteritems()生成的迭代器，後者效率更高。

    aPerson = {'name':'sara','age':22}
    for k,v in aPerson.iteritems():
        print k,v


###集合

Python中的集合和数学中集合的概念相同，具有**无序性**和**唯一性**，它支持添加、遍历、判断是否包含某个元素等操作，但是不支持索引、分片等序列化的操作。

一般集合用在数学计算的场景，例如将一个list转换为set,Python还提供了`frozenset`表示已经创建就不会再改变的集合。


    mSet = set(mList)
    num = len(mSet) #count
    

###布尔

`True`和`False`两个内置类型用来表示布尔值，除此之外：

+ 0 is false; all other numbers are true.
+ An empty string ("") is false, all other strings are true.
+ An empty list ([]) is false; all other lists are true.
+ An empty tuple (()) is false; all other tuples are true.
+ An empty dictionary ({}) is false; all other dictionaries are true.


------------------------
##內存模型
####關於深拷貝和淺拷貝
python中的`copy`和`deep copy`兩個函數，下面是一段代碼形象的表示區別。
原理概括：對一個對象進行淺拷貝其實新創建了一個類型跟原型對象一樣，其內容是原對象元素的引用。

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

顯示結果：

    a =  [1, 2, 3, 4, ['a', 'b', 'c'], 5]    
    b =  [1, 2, 3, 4, ['a', 'b', 'c'], 5]
    c =  [1, 2, 3, 4, ['a', 'b', 'c']]
    d =  [1, 2, 3, 4, ['a', 'b']]

------------------------
##控制流

###赋值

Python中没有传统语言中的变量声明，当我们第一次对一个变量进行赋值的时候，就表示声明了一个变量。Python在提供单个变量赋值的同时，还支持多个变量的一起赋值，比如：

    (a,b,c) = (1,2,3)
    
就完成了三个变量的同时赋值。



###逻辑
其中逻辑比较的操作符包括，当比较内建类型或者常量的时候不建议使用`is`，因为`is`比较的是对象的虚拟内存地址，内建类型经常被优化，比如两个值相同的整形变量会指向同一块地址，因此`is`会返回`True`.

    a > b
    a < b
    a >= b
    a <= b
    a == b #判断值是否相等
    a is b #判断是否为同一对象
    a is not b
    a in b #判断元素是否在制定集合中
    a not in b 

逻辑的与或非分别用 `and`, `or `,`not`表示，Python中同样采用`逻辑短路`原则，即`and`前的布尔值为假，则后面的条件表达式不再被执行。

###if/else/elif

    age = input('How old are you? ')
    if age > 20:
        print 'you are older than me.'
    elif age < 20:
        print 'you are younger than me.'
    else:
        print 'we are the same age!'

###while

    while condtion:
	    pass

###for

基础用法，遍历一个列表
    
    team = ['duncan','parker','spliter','bannor']
    for player in team:
	    print player

高级用法：TODO itertools

###break/continue
同其他语言一样：

+ `break` 不再执行当前循环体内下面的语句，循环结束
+ `continue` 不再直行当前循环体内下面的语句，循环继续



------------------------
##函数
####结构
函数定义以关键字 `def` 开始，之后是函数名，在之后是参数列表。如同类一样，每一个函数可以在第一行声明一个`doc string`,然后就是函数体，Python中病不要求显式的`return`语句，正如你在函数名前也没有见到函数的返回值类型。

虽然Python不要求返回值，但是即使没有return，函数也会一个内置的类型 `None`

    def function(params):
	    '''doc string'''
	    pass
	    return 

Python中支持函数的嵌套声明，比如:

    def produce():
        print"in the process of producing.."
        def pack():
            print"in the process of packing..."
        pack()

####作用域
调用函数的时候，Python会创建一个新的作用域，解释器维护一个新的符号表，当遇到一个变量的时候，解释器会首先在当前符号表中寻找，然后是上一级作用域。如果要在函数体内使用全局的变量，需要使用`global`关键字。

Python使用字典维护变量的作用域，下面两个方法比较重要：

+ locals() 获取局部作用域中的变量字典
+ globals()  获取全局变量字典


  

####参数
python 函数参数支持比较丰富，主要包括：

+ 位置参数
+ 关键字参数
+ 收集参数

#####位置参数
调用的时候需要按照特地的顺序传递参数，缺点比较明显，你需要记住参数列表，形如：

    def func(param1,param2):
        pass
    func(1,2) #bad code hard to read
    func(param1 = 1,param2 =2) #keyword arguments

#####关键字参数
在定义函数的时候，可以指明参数的默认值，调用的时候，传递参数显式声明参数名，虽然写起来有点多，但是在调用的时候方便了很多。比如大项目中，当调用某些函数的时候，调用者可以选择性的填充参数。

    def func(param1=value1,param2=value2):
        pass

#####收集参数or可变参数列表
Python提供了很好的可变参数列表的支持，`*params`表示一个参数元组，而`**params`表示参数字典，一个小例子就可以看明白，例如：

    def params_collect(*params):
        print params

    def params_collect_dict(**params):
        print params

    params_collect_dict(name="liyang",sex="man",location="HIT")
    params_collect(1,2,3,4)

至于如何使用这些参数，看打印结果就知道我们已经获得元组或者字典了，怎么用，你懂的。

这些参数的使用是可以综合在一起的。

##String


##模块

####import
Python提供模块机制来组织不同文件中的代码。每一个Python文件都被视为一个模块，彼此可以进行引用。

    # module.py 
    def test_add(a, b):
        return a+b

当需要调用`test_add`方法的时候，可以使用下面的语句：
    
    import module
    print module.test_add(1,2)
    #or
    from module import test_add
    print test_module(1,3)
    
    #or even 
    import module
    my_add = module.test_add
    print my_add(1,2)

####\_\_main__
    
    #script.py
    if __name__ == "__main__":
    import sys
    do_sth(int(sys.argv[1]))

通过下面的命令执行
    
    python script.py <arguments>
    
####搜索路径
当遇到`import someModule`语句 时，Python会进行下面的搜索，寻找模块。

1. 首先会去内置模块中寻找`someModule`
2. 如果没有找到，在`sys.path`中寻找。

`sys.path`包括当前脚本执行目录，PYTHON_PATH。


##异常

Python使用从`try.. except`语句来捕获异常。
    
    try:
        f = open("file_not_exist")
    except IOError:
        print "file not exist"
    finally:
        pass
        #do some cleaning
    

##文件与目录



##面向对象编程

####封装--类定义
在Python中定义一个类非常的简单，直接使用`class`关键字：
    
    class Student:
	    '''Student doc string'''
	    #vars 
    
	    def __init__(self,name):
		    """Constructor for Class Student"""
		    self.name = name
    
	    def say(self):
		    print "hello, I am "+ self.name

其中属于对象的变量（类似于Java中的普通变量）和绑定方法（类似Java中的对象方法）都需要`self`。比如上面代码中的`self.name`就表示对象的一个属性，如果不加self则属于类属性（类似于Java中的静态属性），为所有该类型的对象所共享。

类的绑定方法，第一个参数为`self`表示当前的对象，在实际调用的时候不用传入，当调用时
    
    MyObject.method(arg1, arg2)
Python会自动转为

    MyClass.method(MyObject, arg1, arg2）
    
####生命周期
类的构造方法是`__init__`，以双下划线开头。`__del__`方法，是对象消亡的时候调用的，但是在实际编码中并不能确定其具体的调用时机，除非显式的使用`del`关键字。

####权限
Python中并没有提供一个严格的类属性和方法的访问权限，理论上可以访问所有的对象。如果要保护某一个方法或者变量不被直接访问可以使用双下划线开头,这样就可以防止调用者*直接*访问了，但是实际上Python只是转换了双下划线开头的变量了而已，并非真的为其设定了权限。

    class Student:
	    '''Student doc string'''
	    #vars 
	    def __init__(self,name,age):
		    """Constructor for Class Student"""
		    self.name = name
		    self.age = age
    
	    def say(self):
		    print "hello, I am "+ self.name
    
	    def __whisper(self):
		    print "I am %d years old." %self.age
    
    
    s = Student("susie",20) #create an instance of Student
    s.say()
    #s.__whisper() error code
    s._Student__whisper()
    
比如定义了`__whisper`这个私有方法，其实他被解释器改为了新的名字，下划线+类名+方法名。同样可以调用，因此Python开发中尝尝约定，单下划线开始的变量为私有，当然这只是编码习惯上的约束而已。

####继承
Python 中支持多重继承，子类和可以调用或者覆写父类中的方法。

####hasattr(obj,str)
在处理多态的问题时候可以使用h`hasattr()`方法来确定某一个类是否支持某一种行为，比如：

    hasattr(duck,"talk") #can a duck talk?
    

##其他
###编码
Python的对象有两种编码表示，一种是str，属于8bit的字节流，另一种是unicode编码，Python内部用这种形式表示。unicode序列以`u`开头，比如`u"name"`。

因此`decode`方法是将其他字符编码解码为`unicode`，而`encode`是将unicode编码为其他编码。下面两种硬编码定义中文的例子：

    str = "中文"
    ustr = u"中文"

第一种的中文实际编码会根据当前文件的编码而决定，编码解码需要知道具体的编码，而后者自动编码为Python的内置编码unicode，因此更值得推荐。

##内置函数
###len()

返回一个元组，列表，或者字典的长度


###range()

反回一个列表

**range(stop)**

**range(start, stop[, step])**

调用的例子：

+ range(4)  *[0,1,2,3]*
+ range(1,4) *[1,2,3]*
+ range(3,1) *[]*
+ range(-3,-1) *[-3,-2]*
+ range(1,6,2) *[1,3,5]*

range在for循环中比较常用，比如实现形如`for(int i = 0, i < 5; i++)`

    for item in range(5):
        print item

###zip()
返回一个元素为元组的列表，接收不同数量的列表或元组，将这些列表按照元素对应的位置合并。

    x = [1,2,3]
    y = ['a','b','c']
    zipped = zip(x,y)
    tx,ty = zip(*zipped) # like unzip
    
    for xx , yy in zip(x,y):
	    print xx,yy
