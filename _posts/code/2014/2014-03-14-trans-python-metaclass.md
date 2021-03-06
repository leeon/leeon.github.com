---
layout: post
title: Python中的元类
category: code
description: 翻译
tags: Python
---

翻译一篇来自StackOverflow的回答，原问题地址[What is a metaclass in Python](http://stackoverflow.com/questions/100003/what-is-a-metaclass-in-python). 投票最高的答案非常完整描述了Python Metaclass机制。说起元类，大致可以才想到其作用，关于类的类。**元**或者**meta**常用来表示关于一个事物本身的属性。比如一份学生名单，这份数据的格式doc, 字数1000字，这就是这份数据的元数据，而文本描述的学生信息就是具体的数据本身，元数据描述了这份数据。你有可能听说过元编程,道理也是一样，编写去生产代码的程序。那么元类呢？

<!-- break -->

下面为原文部分

## 类也是对象
在理解元类之前，你需要掌握Python中类的概念。Python中对于类的处理借鉴了Smalltalk语言。在大多数编程语言中，类只是用来生成对象的代码，从这方面来讲，Python也是一样的：

    >>> class ObjectCreator(object):
    ...     pass
    ...
    >>> my_object = ObjectCreator() #实例化一个对象
    >>> print(my_object)
    <__main__.ObjectCreator object at 0x8974f2c>


但是Python类还有更特殊的身份：类也是对象。当你使用**class**关键字的时候，Python会执行并创建一个对象.

    >>> class ObjectCreator(object):
    ...     pass
    ...

上面的代码在内存中创建一个名字为ObjectCreator的对象.

**这个对象(类)本身具有创建对象(实例)的能力，因此它成为一个类**. 但是其本身仍然是个对象，因此:

+ 可以将类赋值给一个变量
+ 可以复制类
+ 可以给类添加属性
+ 可以把类作为函数参数传递

举例:

    >>> print(ObjectCreator) # 你可以打印一个类，因为它也是一个对象
    <class'__main__.ObjectCreator'>
    >>> def echo(o):
    ... print(o)
    ...
    >>> echo(ObjectCreator) # 也可以把类作为函数参数
    <class'__main__.ObjectCreator'>
    >>> print(hasattr(ObjectCreator,'new_attribute'))
    False
    >>> ObjectCreator.new_attribute ='foo' # 可以给类添加新的属性
    >>> print(hasattr(ObjectCreator,'new_attribute'))
    True
    >>> print(ObjectCreator.new_attribute)
    foo
    >>> ObjectCreatorMirror = ObjectCreator # 把类赋值给其他变量
    >>> print(ObjectCreatorMirror.new_attribute)
    foo 
    >>> print(ObjectCreatorMirror())
    <__main__.ObjectCreator object at 0x8997b4c>


## 动态的创建类

因为类也是对象，所以我们可也像创建其他对象那样创建类。首先，可以在函数中使用 **class** 创建类：

    >>> def choose_class(name):
    ...     if name =='foo':
    ...         class Foo(object):
    ...             pass
    ...         return Foo # 返回类本身，而不是实例
    ...     else:
    ...         class Bar(object):
    ...             pass
    ...         return Bar
    ...
    >>> MyClass = choose_class('foo')
    >>> print(MyClass) # 函数返回一个类而不是实例
    <class'__main__.Foo'>
    >>> print(MyClass()) # 可以通过这个类创建对象
    <__main__.Foo object at 0x89c6d4c>

但这并不是真正的动态创建，你还是需要自己编写全部所需的代码。因为类也是对象，所以它一定可以通过某种方式生成，当你使用**class**关键字的时候，Python自动创建对象。但是就像Python中很多机制一样，它允许你自己手动控制。

还记得`type`函数吗？这个有点历史并且很棒的函数可以判断一个对象是什么类型：

    >>> print(type(1)) 
    <type 'int'>
    >>> print(type("1")) 
    <type 'str'>
    >>> print(type(ObjectCreator)) 
    <type 'type'>
    >>> print(type(ObjectCreator())) 
    <class'__main__.ObjectCreator'>

其实，`type`还有一个完全不同的功能，它可以在运行时创建类。`type`可以接受一个描述类的参数，并且返回一个类。(针对不同的参数有两个完全不同功能的函数看起来挺愚蠢。这是Python向后兼容的问题)。

`type`方法工作方式如下：

    type(name of the class,      
        tuple of the parent class(for inheritance, can be empty),      
        dictionary containing attributes names and values)

例如：

    >>> class MyShinyClass(object):
    ...     pass

这个类可以通过下面的方式创建：


    >>> MyShinyClass= type('MyShinyClass',(),{}) # 返回一个对象
    >>> print(MyShinyClass)
    <class'__main__.MyShinyClass'>
    >>> print(MyShinyClass()) # 用创建的类实例化一个对象
    <__main__.MyShinyClass object at 0x8997cec>

注意到，我们使用 `MyShinyClass`作为类的名字，并且引用它。这个名字可以不同，但是没有必要把事情变得更加复杂(一个就够了吧)。`type`方法接受一个字典参数来定义类的属性：

    >>> class Foo(object):
    ...       bar = True
    
可以转换为：
    
    >>> Foo = type('Foo', (), {'bar':True})
    
Foo可以作为一个正常的类的使用。

    >>> print(Foo)
    <class'__main__.Foo'>
    >>> print(Foo.bar)
    True
    >>> f = Foo()
    >>> print(f)
    <__main__.Foo object at 0x8a9b84c>
    >>> print(f.bar)
    True

当然你也可以继承这个类：

    >>> class FooChild(Foo):
    ...     pass

换成动态写法：

    >>> FooChild = type('FooChild',(Foo,),{})
    >>> print(FooChild)
    <class'__main__.FooChild'>
    >>> print(FooChild.bar) # bar继承自Foo
    True

最后如果想给自己创建的类添加方法，只要定义一个合适的方法并且将其赋值给类的属性就可以了

    >>> def echo_bar(self):
    ...     print(self.bar)
    ... 
    >>> FooChild = type('FooChild',(Foo,),{'echo_bar': echo_bar})
    >>> hasattr(Foo,'echo_bar')
    False
    >>> hasattr(FooChild,'echo_bar')
    True
    >>> my_foo =FooChild()
    >>> my_foo.echo_bar()
    True

可以看到，在Python中我们可以在运行时动态创建类，这就是class关键字真正执行的操作，利用了元类。

## 什么是元类
元类是用来创建类的，你定义class来创建类，对吧？但是我们了解到Python的类其实也是对象。总之元类就是类的类，你可以用下面的方式描述它：

    MyClass=MetaClass()
    MyObject=MyClass()

我们知道`type`方法允许我们做下面的这种事情：

    MyClass= type('MyClass',(),{})

这是因为type函数实际上是一个元类，Python用它来创建所有对象。你也许会想为什么`type`全写成小写而不是`Type`，我猜是为了和`str`(创建字符串对象的类)，`int`(创建整型对象的类)保持一致.你可以通过**__class__**属性查看。

Python中一切都是对象，包括所有的字符串，整型 ，函数和类。他们都是通过某个类创建的：

    >>> age = 35
    >>> age.__class__
    <type 'int'>
    >>> name = 'bob'
    >>> name.__class__
    <type 'str'>
    >>> def foo():
    pass
    >>> foo.__class__
    <type 'function'>
    >>> classBar(object):
            pass
    >>> b = Bar()
    >>> b.__class__
    <class'__main__.Bar'>

那么 `__class__.__class__`代表什么呢？

    >>> age.__class__.__class__
    <type 'type'>
    >>> name.__class__.__class__
    <type 'type'>
    >>> foo.__class__.__class__
    <type 'type'>
    >>> b.__class__.__class__
    <type 'type'>

可以看出元类就是创建类的，你可以给它叫做类工厂，`type`是Python的内置元类，当然你也可以创建自己的元类。

## \_\_metaclass\_\_属性

创建一个类的时候，可以给它添加 `__classmeta__`属性：
    
    class Foo(object):  
        __metaclass__ = something...
        [...]

这样做，Python就会使用指定的元类创建Foo类。这个要小心处理。你首先要写`class Foo(object)`，但是Foo类此时还没有被创建。Python会寻找`__metaclass__`的定义，如果找到就是用它创建Foo，如果没有找到，就使用type创建。

记住下面的步骤：

    class Foo(Bar):
        pass

Python会做下面的事情：

1. 检查Foo中是不是有\_\_metaclass\_\_属性
2. 如果有，创建一个类对象，名字为Foo,通过\_\_metaclass\_\_指定的类创建
3. 如果Python找不到\_\_metaclass\_\_，它会在父类Bar中寻找\_\_metaclass\_\_，重复相同的规则
4. 如果在任何父类中都找不到\_\_metaclass\_\_，就会到MODULE中去找，重复相同规则
5. 如果还找不到，则使用type创建

\_\_metaclass\_\_到底应该放什么呢？就是创建类


## 自定义元类

元类的主要目的是动态改变类。常见的使用场景是创建API,你需要根据运行环境创建类。考虑一个笨拙的例子，你希望模块中所有的类属性都改为大写的。这有几种实现方式，其中之一就是在模块中设置\_\_metaclass\_\_。

这样，模块中所有的类都是通过这个元类创建的，我们只需要告诉元类把所有的类属性改为大写。幸运的是，\_\_metaclass\_\_可以以任何形式调用，不一定是正式的class。

所以我们用一个简单例子开始，使用函数：

    # 这个元类接收和type相同的参数
    def upper_attr(future_class_name, future_class_parents, future_class_attr):
        """    
          返回一个类对象，其属性转换为大写
        """
        # 选择不是__开头的属性，并且转换为大写  
        uppercase_attr ={}
        for name, val in future_class_attr.items():
            if not name.startswith('__'):
                uppercase_attr[name.upper()]= val      
            else:          
                uppercase_attr[name]= val  
        # 使用type创建类
        return type(future_class_name, future_class_parents, uppercase_attr)

        __metaclass__ = upper_attr # 作用于模块中所有的类

    class Foo():
        # 我们也可以在这里指定__metaclass__只作用于这一个类
        # 这会影响子类 
        bar ='bip'

    print(hasattr(Foo,'bar'))
    # Out: False
    print(hasattr(Foo,'BAR'))
    # Out: True
    f = Foo()
    print(f.BAR)
    # Out: 'bip'

现在实现相同的效果,使用真实的类作为元类：

    # 注意type和int ，str一样，所以你可以继承它
    class UpperAttrMetaclass(type):# __new__ 在 __init__之前被调用
        # 这个方法负责创建并且返回对象
        # __init__ 方法只是初始化对象参数
        # 平时很少用 __new__, 除非你想要控制对象的创建
        def __new__(upperattr_metaclass, future_class_name,                 
                    future_class_parents, future_class_attr):

            uppercase_attr ={}
            for name, val in future_class_attr.items():
                if not name.startswith('__'): 
                    uppercase_attr[name.upper()]= val            
                else:
                    uppercase_attr[name]= val

            return type(future_class_name, future_class_parents, uppercase_attr)

实际上这种方式并不是真正的面向对象，我们直接调用了type，没有重载父类的\_\_new\_\_方法，这样改写一下：

    class UpperAttrMetaclass(type):# __new__ 在 __init__之前被调用

        def __new__(upperattr_metaclass, future_class_name,                 
                    future_class_parents, future_class_attr):

            uppercase_attr ={}
            for name, val in future_class_attr.items():
                if not name.startswith('__'): 
                    uppercase_attr[name.upper()]= val            
                else:
                    uppercase_attr[name]= val

            # 重用type.__new__ method
            return type.__new__(upperattr_metaclass, future_class_name,
                                future_class_parents, uppercase_attr)

你可能发现了额外的参数uperattr_metaclass,这个参数是对象方法总是将当前实例作为第一个参数传入。当然我使用的这个名字不够明确，就像self，所有参数都有规定名字，所以真实的元类应该是这样的

    class UpperAttrMetaclass(type):# __new__ 在 __init__之前被调用

        def __new__(cls, clsname, bases, dct):

            uppercase_attr ={}
            for name, val in future_class_attr.items():
                if not name.startswith('__'): 
                    uppercase_attr[name.upper()]= val            
                else:
                    uppercase_attr[name]= val

            return type.__new__(cls, clsname, bases, uppercase_attr)

我们可以使用super关键字使代码变得更加清晰

    class UpperAttrMetaclass(type):# __new__ 在 __init__之前被调用

        def __new__(cls, clsname, bases, dct):

            uppercase_attr ={}
            for name, val in future_class_attr.items():
                if not name.startswith('__'): 
                    uppercase_attr[name.upper()]= val            
                else:
                    uppercase_attr[name]= val

            return super(UpperAttrMetaclass,cls).__new__(cls, clsname, bases, uppercase_attr)

关于元类真的就是这么多了，使用元类的代码错综复杂的原因不是因为元类，而是因为你通常使用元类在自省，继承和_\_dict\_\_这样的变量上进行依赖反转。

事实上元类在使用一些"黑魔法"时很有用，这也使事情更复杂，但是他们本身很简单：

+ 拦截一个类创建的过程
+ 修改类
+ 返回修改后的类


## 为什么使用类做元类而不是函数

元类接受任何形式调用（上面显示了两种基本方式，通过函数和类），使用类作为元类显然更加复杂，为什么这样做的？

原因有几个：

+ 意图清晰，当你阅读` UpperAttrMetaclass(type)`,你知道接下来要做什么
+ 利用面向对象，元类可以继承自元类，覆写父类的方法，元类甚至可以使用元类
+ 可以更好的控制代码结构，你不可能用元类处理像上面那样微不足道的例子，通常是处理比较复杂的情景，使用类可以将不同方法封装到一起，是的代码更加容易阅读
+ 你可以在`__new__`,`__init__`,`__call__`使用hook，这样可以处理不同的事情，或许你可能喜欢把所有代码写到`__new__`里，其他人可能觉得`__init__`更方便
+ 这东西本来就叫元“类”！

##到底为什么用元类
最大的问题来了，为什么使用这么复杂的特性呢？

事实上，通常不会使用：

> 元类是99%开发者不会考虑的特性，如果你疑惑自己是不是需要他们，那么一般答案是，不需要。

元类的主要用处是创建API,一个典型的例子是Django ORM. 它允许你这样定义类：

    class Person(models.Model):
        name = models.CharField(max_length=30)
        age = models.IntegerField()

但是如果你这样做：

    guy = Person(name='bob',age='35')
    print(guy.age)

它就不会返回一个`IntegerField`，而是返回一个`int`，甚至直接从数据库中读取。这是有可能的，因为`models.Model`定义了`__metaclass__`，并且它可能会改变你定义的`Person`类，使得它Hook到数据库的某个字段。Django将复杂的hook用简单的API呈现，并且使用元类重新创建代码来完成背后真正复杂的工作。

## 最后
首先你要知道类是对象，并且可以创建对象，然而事实上类自己也是一个实例

    >>> class Foo(object):pass
    >>> id(Foo)
    142630324

Python中一切都是对象，他们要么是类的实例，要么是元类的实例。

type除外。type是它自己的元类，这是在实现层完成的。其次元类是复杂的，你可能不希望使用它进行简单的类变换，你可以使用下面的方式改变类：

+ Monkey patching
+ 类装饰器

如果你需要修改类，99%的情况下，你最好使用上面两个方法，但是99%的情况下，你根本不需要修改类。。。。。
