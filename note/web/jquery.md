---
layout: note
title: jQuery
tagline: 我会的就这么多
group: web
update: 2013.12.1
---
>追求生活中美的东西，所以我也学一点前端  2013-10-16 updated



#jQuery

jQuery是一个应用非常广泛的JavaScript框架，它为网页DOM元素操作以及事件处理提供了强大的支持。

###选择器

选择ID `$("#Id");`

选择类 `$(".myClass")`

选择元素 `$("div")`

复合选择 `$("#contents ul.people li")`

####检测元素
无论获得元素是否，`$()`永远返回一个object,因此要判断元素是否获取成功，可以使用：
    
    if($("#container").length){
        //do your job
    }
####过滤元素
有时选择器包括一个元素结合，可以使用一些方法进行过滤选择自己的元素

    // Refining selections.
    $( "div.foo" ).has( "p" );   // 选择包含<p>的div.foo
    $( "h1" ).not( ".bar" );     // 选择不包含.bar 的h1
    $( "ul li" ).filter( ".current" ); // 选择类为.current的item
    $( "ul li" ).first();        // 只选择列表中第一个
    $( "ul li" ).eq( 5 );        // 选择第6个元素

####对表单支持

    $( "form :button" ); //选择type="button"的元素
    $( "form :checkbox" );  //选择checkbox

###Getters&Setters

query重载了这些方法，所以get和set操作，取决于传递的参数，名字完全相同。同类的方法还有很多，比如`attr()`修改元素的属性，`css()`修改元素的CSS样式。

    $("h1").html(); //get
    $("h1").html("new content")//set
    
    
    
###Ajax
jquery对于ajax的支持非常好，官方的例子就可以清晰懂得：

    // Using the core $.ajax() method
    $.ajax({
    // the URL for the request
    url: "post.php",
 
    // the data to send (will be converted to a query string)
    data: {
        id: 123
    },
 
    // whether this is a POST or GET request
    type: "GET",
 
    // the type of data we expect back
    dataType : "json",
 
    // code to run if the request succeeds;
    // the response is passed to the function
    success: function( json ) {
        $( "<h1/>" ).text( json.title ).appendTo( "body" );
        $( "<div class=\"content\"/>").html( json.html ).appendTo( "body" );
    },
 
    // code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status ) {
        alert( "Sorry, there was a problem!" );
    },
 
    // code to run regardless of success or failure
    complete: function( xhr, status ) {
        alert( "The request is complete!" );
    }
    });