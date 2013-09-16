---
layout: post
title: "详解Android中Activity的生命周期"
description: ""
category: tech
tags: android mobile
---
android中 activity有自己的生命周期，对这些知识的学习可以帮助我们在今后写程序的时候，更好的理解其中遇到的一些错误。这篇文章很长，希望不要耽误大家的时间～


今天不会涉及太多关于activity栈的东西，主要说activity自身的生命周期

###区分几个概念 

#####1 *Activity* 官方解释为:
> “An Activity is an application component that provides a screen with which users can interact in order to do something, such as dial the  phone, take a photo, send an email, or view a map. Each activity is given a window in which to draw its user interface. ”

也就是用户用来交互的每一个窗口，用户当前正在进行的一个操作。

#####2 *back-stack*  
用户通过触摸程序会通过application launcher来启动一个activity A，启动的activity A会被压入栈顶，如果当前的activity A再启动一个新的activity B，那么此时A调用onStop函数，系统会维护这个activity信息.当用户按下back键的时候，back stack会进行一个pop的操作，并且调用A的onResume()  具体的进出栈细节，以后会详细介绍。


#####3 *Tasks*  
当用户处于某个activi提: Activity A在名称为"TaskOne应用ty的时候，按下HOME键用户返回到launcher，此时，如果用户再触摸新的应用，则新建一个Task，一个back stack就代表一个task.不同程序的activity可以压入同一个栈中，也就是说可以组成一个task，比如你的程序启动了一个系统自带的发短信的activity，给用户的感觉就是发短信好像是你的程序中的一个功能一样。


注释：

>以上的行为均为系统的默认设置，有两种方式可以改变activity的行为，加入A启动B，一是在B的manifest设置中，改变行为，另一种是在Activity发起的intent中指定要启动的activity设置，其中Intent的优先级要高于manifest.xml文件,并且有些mode在并不是同时都存在于两种方式中。


android的生命周期包括  onCreate onStart onRestart onResume onPause onStop onDestroy ,activity在声明周期中会调用以上方法来执行不同状态对应的操作，下面介绍各个方法的调用时间

###Activity状态
---------------------------------------------------------------------------------

#####onCreate()     此状态下activity不可被终结 

>Called when the activity is first created. This is where you should do all of your normal static set up: create views, bind data to lists, etc. This method also provides you with a Bundle containing the activity's previously frozen state, if there was one.
Always followed by onStart().

当activity第一次被创建的时候调用。你应该在这个方法里进行所有的静态创建，创建views，（通过setContnetView方法）向lists绑定数据等等。如果存在保存的状态的话，该方法也提供给你一个包含activity最近状态的一个bundle。onStart方法总是在此方法之后调用


#####onRestart()    此状态下activity不可被终结 

>Called after your activity has been stopped, prior to it being started again.
Always followed by onStart()

在你的activity停止后被调用，在重新开始之前调用


#####onResume()    此状态下activity不可被终结 

>Called when the activity will start interacting with the user. At this point your activity is at the top of the activity stack, with user input going to it.
Always followed by onPause().

当activity将被启动与用户交互的时候被调用。此刻你的activity处于activity栈的顶端，用于用户输入，永远///在onPause之后被调用

#####onPause()    此状态下activity不可被终结 ，android HoneyComb系统除外

>Called when the system is about to start resuming a previous activity. This is typically used to commit unsaved changes to persistent data, stop animations and other things that may be consuming CPU, etc. Implementations of this method must be very quick because the next activity will not be resumed until this method returns.

Followed by either onResume() if the activity returns back to the front, or onStop() if it becomes invisible to the user.

当系统即将重新开始以前的activity的时候被调用（不懂，自己的理解是：当当前activity要启动新的activity的时候被调用），典型的应用是用来将还未保存的数据提交到当前的数据，（意思就是保存数据更新），停止animations和其他可能耗费CPU的操作。对此方法的实现必须快速因为下个activity直到此方法返回才会被重新开始。
当activity从back（翻译后台不合适）转到front（与用户交互的状态）的时候，onResume方法会在onPause方法之后被调用
当activity变为不可见的时候，onStop方法会在onPause之后被调用

#####onStop()    此状态下activity可以被终结 

>Called when the activity is no longer visible to the user, because another activity has been resumed and is covering this one. This may happen either because a new activity is being started, an existing one is being brought in front of this one, or this one is being destroyed.
Followed by either onRestart() if this activity is coming back to interact with the user, or onDestroy() if this activity is going away.


当activity对用户不再可见时被调用，因为另一个activity已经重新开始并且覆盖了当前activity（在栈中）。当有新的activity被启动，或者一个存在的activity重新回到前台状态，又或者当前的activity将被销毁。如果activity要返回前台和用户进行交互则在此方法后调用onReatart方法，如果当前activity要消亡，则onDestroy方法将在此方法后被调用


#####onDestroy()     此状态下activity可以被终结

>The final call you receive before your activity is destroyed. This can happen either because the activity is finishing (someone called finish() on it, or because the system is temporarily destroying this instance of the activity to save space. You can distinguish between these two scenarios with the isFinishing() method.

这是当你的activity被消亡时接收到的最后一个方法。调用此方法有两种情形：一是 activity将要完成，可通过调用finish方法实现。而是系统销毁activity的实例来释放空间。可以使用isFinish方法来区别两种情形。这个方法常用在onPause方法中，来判断activity是暂停还是将终止。后面的demo将会演示这个功能。


下图是官网的一个生命周期的演示

![image](/assets/images/pages/activity_lifecycle.png)

接下来是几本的Demo演示：
> 此处修改于2013-5-28，重写列子代码

    package org.leeon.android.base;
   
	import org.leeon.android.R;
	import android.app.Activity;
	import android.content.Intent;
	import android.os.Bundle;
	import android.util.Log;
	import android.view.Menu;
	import android.view.View;
	import android.view.View.OnClickListener;
	import android.widget.Button;

	public class ActivityA extends Activity {

		private static final String TAG = "androidtaste";
		
		private Button bt_atob;

		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.activity_a);
			bt_atob = (Button)this.findViewById(R.id.bt_atob);
			bt_atob.setOnClickListener(new MyButtonListener());
			
		}
		
		private class MyButtonListener implements OnClickListener{

			@Override
			public void onClick(View v) {
				Intent intent  = new Intent();
				intent.setClass(ActivityA.this, ActivityB.class);
				ActivityA.this.startActivity(intent);
			}
			
		};
		
		@Override
		protected void onDestroy() {
			// TODO Auto-generated method stub
			super.onDestroy();
			Log.i(TAG,"ActivityA onDestroy.");
		}

		@Override
		protected void onPause() {
			// TODO Auto-generated method stub
			super.onPause();
			Log.i(TAG,"ActivityA onPause.");
		}

		@Override
		protected void onRestart() {
			// TODO Auto-generated method stub
			super.onRestart();
			Log.i(TAG,"ActivityA onRestart.");
		}

		@Override
		protected void onResume() {
			// TODO Auto-generated method stub
			super.onResume();
			Log.i(TAG,"ActivityA onResume.");
		}

		@Override
		protected void onStart() {
			// TODO Auto-generated method stub
			super.onStart();
			Log.i(TAG,"ActivityA onStart.");
		}

		@Override
		protected void onStop() {
			// TODO Auto-generated method stub
			super.onStop();
			Log.i(TAG,"ActivityA onStop");
		}

	}


演示结果：

![image](/assets/images/pages/android-life-shot.png)



