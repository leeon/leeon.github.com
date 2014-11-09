---
layout: post
title: "实现一个Android输入法"
description: 如何实现一个Android输入法，程序开发介绍。
category: code
tags: Android 输入法
---

> 原文来自[Android Developer Guide](http://developer.android.com/guide/topics/text/creating-input-method.html)，本文为原文翻译，如有错误，欢迎指出。

<!-- break -->
输入法（IME:Input method editor）是一个能够让用户输入文本的工具。Android提供了一个可扩展的输入法框架，允许应用为用户提供不同的输入法，比如触屏键盘甚至语音输入。只要安装，用户就可以从系统设置中选择自己喜欢使用的输入法，并且在整个系统环境中使用；在同一时刻，只有一种输入法可以使用。

要在Android系统中创建一个输入法，你创建的应用需要包含继承自`InputMethodService`的类。此外，通常还要创建一个"settings"的activity，用来向IME服务传递参数选项。你也可以自定义设置界面，把它作为系统设置的一部分。

本文包括以下内容：

+ 输入法的生命周期
+ 在application manifest中声明IME组件
+ 输入法 API
+ 设计输入法的用户界面
+ 从输入法向应用程序发送文本
+ 创建不同类型的输入法


如果你之前没有做过输入法的相关东西，你应该先阅读这篇介绍性的文章[Onscreen Input Methods](http://android-developers.blogspot.com/2009/04/updating-applications-for-on-screen.html)。此外，SDK中包含的Soft Keyboard sample app项目里面有样例代码，你可以修改它们，然后开始创建自己的输入法。


#输入法的生命周期

下图描述了一个输入法的生命周期：

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_lifecycle_image.png){:style="max-width:400px"}

{:.center}
Android输入法生命周期

接下来的部分描述了如何实现遵循这一生命周期，实现输入法代码和界面。

#在application manifest中声明IME组件

在Android系统中，输入法是一个包含指定的IME服务的Android应用，应用的mainifest文件必须声明此服务，请求所需的权限，提供和`action.view.InputMethod`匹配的`intent filter`，并且提供包含输入法一些参数的元数据。此外，若想提供一个允许用户修改输入法行为的设置界面，你要定义一个能从系统设置中启动的`settings`activity。

下面的代码声明了一个输入法的service.它请求了`BIND_INPUT_METHOD `权限，来允许服务把IME和系统关联起来，创建一个`intent filter`来匹配`android.view.InputMethod`,并且定义了输入法的元数据。

    <!-- Declares the input method service -->
    <service android:name="FastInputIME"
        android:label="@string/fast_input_label"
        android:permission="android.permission.BIND_INPUT_METHOD">
        <intent-filter>
            <action android:name="android.view.InputMethod" />
        </intent-filter>
        <meta-data android:name="android.view.im" android:resource="@xml/method" />
    </service>
    
下一个代码片段声明了输入法的设置activity.它包含了一个`ACTION_MAIN`的`intent filter`，表示此activity作为整个输入法应用的入口。

    <!-- Optional: an activity for controlling the IME settings -->
    <activity android:name="FastInputIMESettings" 
        android:label="@string/fast_input_settings">
        <intent-filter>
            <action android:name="android.intent.action.MAIN"/>
        </intent-filter>
    </activity>

你也可以在输入法界面中直接提供用户设置。


#输入法API

输入法相关的类可以在`android.inputmethodservice`和`android.view.inputmethodpackages`中找到。 `KeyEvent`类在处理键盘字符中非常重要。

输入法的核心组件是一个服务，它是一个继承自`InputmethodService`的类。除了实现常规的输入法声明周期外，该类还包含了一些回调函数，用来给开发者处理输入法界面，处理用户输入，并将文本发送给当前正在处理的文本域。默认情况下，`InputmethodService`类提供了管理输入法状态、可视化以及和当前输入法框交互的大部分实现。

下面的类也非常重要：

**BaseInputConnection**

定义了从输入法回到当前接收输入的应用之间的通信管道。你可以使用它来获取焦点所在位置周围的文本，向文本域提交文本以及向应哟功能程序发送原始的键盘事件。应用应该继承这个类而不要独自实现基础的`InputConnection`接口。

**KeyboardView**

继承自`View`，用来渲染绘制一个键盘，并且响应用户的输入事件。键盘的布局就是用一个`Keyboard`的实例来实现的，你可以通过创建一个xml文件来实现。

#设计输入法的用户界面

输入法中主要有两种可视化的元素：输入界面和候选界面。你只需要实现和你设计的输入法有关的界面。

###输入界面

输入法界面是用户输入文本的地方，可以是敲击键盘键位，手写，或者手势的形式。当输入法第一次调用显示的时候，系统会调用`onCreateInputView()`。在方法实现中，你可以创建想显示的布局，并将创建的布局实例返回给系统，下面的代码片段是一个实现`onCreateInputView()`方法的例子：

    @Override 
    public View onCreateInputView() { 
        MyKeyboardView inputView = 
            (MyKeyboardView) getLayoutInflater().inflate( R.layout.input, null);

        inputView.setOnKeyboardActionListener(this);                                                  
        inputView.setKeyboard(mLatinKeyboard); 
    return mInputView; 
    } 
    
在这个例子中，`MyKeyboardView`是一个用来生成一个键盘的典型的例子.如果你要创建一个传统的QWERTY键盘，可以查看[Soft Keyboard sample app](https://developer.android.com/tools/samples/index.html)作为一个如何继承`KeyboardView`类的样例。


###候选界面

候选界面是输入法为用户提示预测纠错和建议选词的地方。在输入法的生命周期中，当候选界面准备显示的时候，系统会调用`OnCreateCandidateView()`，你在实现此方法的时候，要返回用来显示建议词的界面，如果不想显示任何界面，就返回`null`。（此方法默认返回null,如果不希望显示就不必实现此方法）

关于实现给用户提供建议的例子，可以查看[Soft Keyboard sample app](https://developer.android.com/tools/samples/index.html)。

###界面设计要考虑的事情

这部分介绍一些关于输入法界面设计的东西。

####处理不同屏幕尺寸

你的输入法界面必须能够适应不同的屏幕尺寸，并且可以处理横屏和竖屏。在非全屏输入模式中，给应用留有足够的空间来显示文本框以及相关的内容，所以输入法不能占用超过一半的屏幕空间。在全屏输入的模式中，这就不是问题了。

####处理不同的输入类型

Android中的文本域允许开发者指定一个具体的输入类型，比如自由格式的文本，数字，URL，邮箱地址和查询字符串等。当你实现一个新的输入法的时候，你需要去检测每一个输入域的类型，并且为他提供合适的输入法实例。当然，你不需要去检测用户输入的数据在特定的输入类型中的合理性，那是应用的开发者的责任。

例如，这里有一些Android系统提供的拉丁键盘的在处理文本和电话号码输入界面的截图

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_text_type_screenshot.png){:style="max-width:200px"}

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_numeric_type_screenshot.png){:style="max-width:200px"}

当一个输入域得到输入焦点并且启动你的输入法的时候，系统会调用**onStartInputView()**,并且传入一个**EditorInfo**对象参数，里面包含了关于输入类型和其他文本域属性的细节，在这个对象中，**inputType**字段包含了文本域的输入类型。

**inputType**字段是一个整型变量，它包含了基于位的规则表示各种各样的输入类型设置。若需要用它来检测不同的输入类型，用它和常量**TYPE_MASK_CLASS**进行如下操作：

**inputType & InputType.TYPE_MASK_CLASS **

输入类型的位模式可以是下面多种值之一：

+ **TYPE_CLASS_NUMBERA**
输入数字的区域，就像前面截图中展示的那样，拉丁键盘在这种输入模式下显示了一个数字面板。

+ **TYPE_CLASS_DATETIMEA**
用于输入日期和时间的文本域。

+ **TYPE_CLASS_PHONEA**
用于输入电话号码的文本域

+ **TYPE_CLASS_TEXTA**
可以输入所有支持的字符的文本域。

这些常量在参考文档[InputType](https://developer.android.com/reference/android/text/InputType.html)中，有更加详细的描述。

输入类型还包括其他的数值，表示普通文本输入的变体，例如：

+ **TYPE_TEXT_VARIATION_PASSWORDA**
用于输入密码的**TYPE_CLASS_TEXT**的变体,输入法会将输入的字符显示为圆点。

+ **TYPE_TEXT_VARIATION_URIA**
用于输入URL和URI的**TYPE_CLASS_TEXT**变体。

+ **TYPE_TEXT_FLAG_AUTO_COMPLETEA**
用于输入可以通过词典、查询或者其他组件自动完成的文本。

要用这些常量检查输入类型的时候，注意要用正确的常量去和**inputType**相与，可用的常量列表包含在文档[InputType](https://developer.android.com/reference/android/text/InputType.html)中。

**注意:**在你实现的输入法中，输入密码的时候，请确保正确的处理文本，在输入界面和候选界面中都要隐藏密码，同时，你不应该在设备中存储密码。要了解更多，参考[安全性设计](https://developer.android.com/guide/practices/security.html)指引。

#从输入法向应用程序发送文本

当用户使用你开发的输入法输入文本时，你可以发送独立的键盘事件或者编辑光标所在的文本，来将文本发送到应用程序。在任何一种情况中，你可以使用一个**InputConncetion**实例来发送文本，可以通过调用**InputMethodService.getCurrentInputConnection()**来获得实例。

###编辑光标所在文本

在一个文本框中处理文本的时候，**BaseInputConnection**类中包含了一些有用的方法：

**getTextBeforeCursor()**

返回一个包含光标前指定个数的字符**CharSequence**

**getTextAfterCursor()**

返回一个包含光标后面指定个数的字符**CharSequence**

**deleteSurroundingText()**

删除光标前后指定个数的字符

**commitText()**

提交文本并且重新设置光标的位置。

例如，下面的代码片段展示了如何用文本『Hello』替换文本『Fell』左边的内容。

    InputConnection ic = getCurrentInputConnection();
    ic.deleteSurroundingText(4, 0);
    ic.commitText("Hello", 1);
    ic.commitText("!", 1);
    
###发送前组织文本

如果你的输入法支持文本预测或者需要多个步骤来组成一个符号或者单词，你可以在文本编辑区域展示这个过程，直到用户最终提交了这个单词，然后你可以用完整的文本替换掉部分的编辑中的文本。你可以在间断的通过`InputConnection#setComposingText()`提交文本。

下面的代码展示了如何在文本域中显示过程：

    InputConnection ic = getCurrentInputConnection();
    ic.setComposingText("Composi", 1);
    ...
    ic.setComposingText("Composin", 1);
    ...
    ic.commitText("Composing ", 1);

下面 的截图显示了用户看到的界面：

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_composing_text_1.png){:style="max-width:200px"}

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_composing_text_2.png){:style="max-width:200px"}

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_composing_text_3.png){:style="max-width:200px"}

###监听硬键盘事件

输入法窗口没有明确的焦点，它会首先接收来自硬键盘的事件，并且决定是处理事件还是继续向应用传递转发事件。例如，你可能会使用方向键在输入法界面中进行候选词的选择操作，也可能使用退格键来取消所有的从输入法窗口生成的弹出界面。

要监听硬键盘事件，覆写`onKeyDown()`和`oKeyUp`方法，查看Softkeybaord [sample app ](https://developer.android.com/tools/samples/index.html)中的例子。

记得调用`super()`方法，如果你不想自己处理这些事件。

#创建输入法子类型

子类型允许输入法展现不同的输入模式，同时在一个输入法中支持不同语言。一个子类型可能是：

+ 一个区域 比如en_US或者fr_FR
+ 一个输入模式，比如声音、键盘或者手写
+ 其他输入法风格，表单或者其他特性，比如九健或者全键盘布局

基本上,模式可以是任何文本描述的，类似『键盘』，『声音』诸如此类。

子类型信息用于输入法切换的对话框，可以通过通知栏中的输入法切换或输入法设置中找到。这些信息可以让框架为输入法直接选择专门的子类型。当你创建一个输入法的时候，使用子类型，因为它可以帮助用户识别和在不同的输入法语言和模式中切换。

使用`<subtype>`标签，在输入法的xml资源文件中定义子类型。下面的代码片段定义了一个包含两种子类型的输入法：一个针对美国英语区域，另一个针对法法语地区：

    <input-method xmlns:android="http://schemas.android.com/apk/res/android"
            android:settingsActivity="com.example.softkeyboard.Settings"
            android:icon="@drawable/ime_icon"
        <subtype android:name="@string/display_name_english_keyboard_ime"
                android:icon="@drawable/subtype_icon_english_keyboard_ime"
                android:imeSubtypeLanguage="en_US"
                android:imeSubtypeMode="keyboard"
                android:imeSubtypeExtraValue="somePrivateOption=true"
        />
        <subtype android:name="@string/display_name_french_keyboard_ime"
                android:icon="@drawable/subtype_icon_french_keyboard_ime"
                android:imeSubtypeLanguage="fr_FR"
                android:imeSubtypeMode="keyboard"
                android:imeSubtypeExtraValue="foobar=30,someInternalOption=false"
        />
        <subtype android:name="@string/display_name_german_keyboard_ime"
                ...
        />
    />
    
为了确保你的子类型在用户界面中标记正确。使用`%s`类获取和子类型区域一样的标签，下面的两段代码演示了这个方法。第一段代码来自输入法xml配置文件的一部分:

    <subtype
        android:label="@string/label_subtype_generic"
        android:imeSubtypeLocale="en_US"
        android:icon="@drawable/icon_en_us"
        android:imeSubtypeMode="keyboard" />

下一段代码是`strings.xml`文件的一部分，`label_subtype_generic`字符串资源用来设置输入法UI定义子类型的标签：

    <string name="label_subtype_generic">%s</string>
在任何的英语区域，这段代码会将子类型显示的名字设置为『英语（美国）』，或者对应其他区域的语言。


###通过通知栏选择输入法的子类型

Android系统会管理所有输入法定义的子类型。输入法子类型作为定义他们的输入法的一种模式存在。在通知栏，用户可以选择当前使用的输入法的可用子类型，如下面的截图所示：

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_subtype_notification.png){:style="max-width:200px"}

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_subtype_preferences.png){:style="max-width:200px"}

###通过系统设置选择输入法子类型

在系统设置的`语言与输入`设置面板中，用户可以选择子类型如何被使用。在Soft Keyboard的例子中，`InputMethodSettingsFragment.java`文件实现了一个输入法设置中的子类型激活开关。请参照Android SDK中输入法的例子，获得更多关于输入法子类型的信息。

{:.center}
![](http://developer.android.com/resources/articles/images/inputmethod_subtype_settings.png){:style="max-width:200px"}

#输入法注意事项

在开发你自己的输入法时，还有一些要注意的问题：

+ 让用户可以在输入法界面中直接进入设置功能
+ 因为设备上可能安装了不同类型的输入法，让用户可以在输入法界面上直接切换不同的输入法
+ 快速的渲染输入法界面，预加载或者只加载需要的大的资源，这样用户可以在敲击文本框的时候立刻看到输入法界面。缓存资源和视图以便之后对输入法的调用。
+ 相反，你应该在输入法界面隐藏后，释放占用较大的内存，使应用程序拥有充足的内存运行。当输入法在一小段时间处于隐藏状态时，可以考虑使用延时消息来释放资源。
+ 确保用户在所处的语言区域中输入尽可能多的字符。记住用户可能在用户名或者密码中使用标点符号，所以你的输入法需要提供尽可能多的不同的字符，以便用户可以输入密码来访问设备。

