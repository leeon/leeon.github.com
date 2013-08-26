---
layout: post
title: "Android使用HTTP访问网络"
description: "Android使用HTTP访问网络"
category: tech
tags: android 网络 http
---

> 移动终端上的应用基本上都离不开网络，HTTP协议是移动应用最长使用的WEB协议，Android很好的支持了HTTP通讯。


###HTTP协议

HTTP协议全称是**超文本传输协议**，是目前网络中最常用的web 协议。它主要有两种请求的方式：

1. **GET**:将请求参数和query以明文的形式置于URL中。
2. **POST**:将参数放置在请求体中而URL不会发生变化。


###支持

目前在Android实现HTTP通讯主要有两个方式：

1. HttpClient
2. HttpURLConnection

`HttpClient`是封装的Apache的http客户端，里面包含了丰富的API，并且比较稳定.`HttpURLConnection`来自于`java.net`,是目前Android team主要在维护的一个组件，在压缩和缓存方面更加的适合Android的程序开发，官方文档更加推荐后者。

使用HttpURLConnection发送一个http请求非常简单，他默认采用GET的方式：

{% highlight java%}
URL url = new URL("http://leeon.org"); //don't miss the 'http'
HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
{% endhighlight %}

当我们在Activity中直接运行上面的代码时，如果targetSDK是2.3以上，就会出现异常：

`android.os.NetworkOnMainThreadException`

从名字来看，是因为在main thread 中进行了网络的访问操作，这和Android的线程机制有关，Android程序启动后会有一个main thread，这个thread也叫做UI Thread,专门用来响应和绘制交互界面，所以在这个线程里面进行比如网络访问，数据存储等阻塞操作可能会导致程序响应缓慢，甚至无响应。

###Strict Mode
Strict Mode是Android 2.3引入的一个重要的类，主要是为了帮助开发者找出程序中的一些瓶颈风险，比如我们在主线程中进行了磁盘读写或者网络访问等操作，他就可以很快的抛出异常来阻止。

我们可以通过`StrictMode.setThreadPolicy(StrictMode.ThreadPolicy)`这样的代码来修改当前的检测参数。下面的代码就是说在线程中不进行网络方面的检测。

{% highlight java %}
StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().permitNetwork().build());
{% endhighlight %}


###Worker Thread

在实际开发中，显然是不应该在main thread中进行网络请求操作了，比如我们实现一个点击按然后发起一个http请求，将请求得到的内容显式在界面里面，会发现即使在链接WIFI的情况下，界面也会卡顿一下。所以我们需要新建一个线程来处理网络请求数据或者是IO读写等操作。

可以立刻想到的方式便是创建一个`Thread`来执行某个特殊的任务。那么，Android在处理多线程的时候有两个基本的原则：

1. Do not block the UI thread
2. Do not access the Android UI toolkit from outside the UI thread

如果创建新的线程处理网络连接那么就遵循了第一条原则，但是如果我们不仅仅是获取网络数据还要将得到的数据及时的显示到界面里，就破坏了第二条原则。android提供的最佳方案是使用`AsyncTask`来实现UI的实时渲染。

AsyncTask的使用比较简单，只要继承AsyncTask并且实现其中的`doInBackground`方法就可以了，并且在`onPostExecute`方法中处理UI渲染实践，大家可以参照Google的[文档](http://developer.android.com/guide/components/processes-and-threads.html)

下面是一段基本的处理**get**和**post**的代码：
{% highlight java%}
package org.leeon.android.http;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.apache.http.client.ClientProtocolException;
import org.leeon.android.R;
import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class HttpTestActivity extends Activity implements OnClickListener{

	private static final String TAG = "androidtaste";

	private Button bt_get;
	private Button bt_post;
	private EditText et_url;
	private TextView tv_result;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_http_test);
		
		//get the widgets
		bt_get = (Button)this.findViewById(R.id.bt_http_get);
		bt_post = (Button)this.findViewById(R.id.bt_http_post);
		et_url = (EditText)this.findViewById(R.id.et_http_url);
		tv_result =(TextView)this.findViewById(R.id.tv_http_result);
		
		//set the listener
		bt_get.setOnClickListener(this);
		bt_post.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		String urlStr = et_url.getText().toString();
		if(v.equals(bt_post)){
			new DownloadDataTask().execute(urlStr,"post");
		}else if(v.equals(bt_get)){
			Log.i(TAG,urlStr);
			new DownloadDataTask().execute(urlStr,"get");

		}else{
		}
	}
	
	/**
	 * An asyncTask that handle downloading issues.
	 * */
	private class DownloadDataTask extends AsyncTask<String,Void,String>{

		@Override
		protected String doInBackground(String... params) {
			BufferedReader in = null;
			StringBuilder sb = new StringBuilder("");
			URL url = null;
			HttpURLConnection urlConnection = null; 
			try {
				 url = new URL(params[0]);//don't miss the 'http'
				 urlConnection = (HttpURLConnection)url.openConnection();
				if(params.length > 1 && "get".equals(params[1])){
					
					in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
					String line = "";
					while((line = in.readLine())!= null){
						sb.append(line+"\n");
					}	
				}else if(params.length > 1 && "post".equals(params[1])){
					urlConnection.setDoOutput(true); // this invoke will doPost
					OutputStream out = urlConnection.getOutputStream();
					String args = "age=12";
					out.write(args.getBytes());
					out.flush();
					out.close();
					
					in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
					String line = "";
					while((line = in.readLine())!= null){
						sb.append(line+"\n");
					}	
					
				}
				
			} catch (ClientProtocolException e) {
				e.printStackTrace();
				
			} catch (IOException e) {
				e.printStackTrace();
				
			}finally{
				urlConnection.disconnect();
				if(in != null){
					try {
						in.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		
			return sb.toString();
		}
		
		/*perform the UI work safely*/
		protected void onPostExecute(String resutlt){
			tv_result.setText(resutlt);
		}

	}


}

{% endhighlight %}

程序的完整源码可以参照 [androidtaste@github](https://github.com/leeon/androidTaste)

> 本篇文章涉及的代码在 `org.leeon.android.package`中