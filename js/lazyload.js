/**
*lazyload图片延迟加载
*version: 1.0
*author: WISHES
*time: 2016/10/06
*qq:1527127028
*版权:转载使用需要保留头部信息！前端菜鸟，欢迎朋友拍砖指正！
**/
;(function($){
    $.fn.lazyload=function(options){
		var defaults={
			event: "scroll", //触发事件
			speed: 500,    //延迟时间
			effect: true, //是否渐入
			top : 0  //元素距可视区多少显示
		};
		var option=$.extend({},defaults,options);
		var timer=null;
		var oimg_show = $("img[data-src]");//图片对象
		
		function loadFn(){//滚动函数
		    clearTimeout(timer);
		    timer=setTimeout(function(){
				oimg_show = $("img[data-src]");//图片对象
				if(oimg_show.length){
				    oimg_show.each(function(){
					    if($(this).offset().top<($(window).height() + $(document).scrollTop()+option.top) && $(document).scrollTop() < ($(this).offset().top + $(this).height())){
						   // console.log($(this))
							$(this).hide().attr("src",$(this).attr("data-src"));
							option.effect==true?$(this).fadeIn():$(this).show();
						    oimg_show=oimg_show.not($(this).removeAttr("data-src"));
					    }
				    });
				}else{
				    timer=null;
					$(window).unbind(option.event,loadFn); //加载完之后解绑
					$(window).unbind("resize",loadFn); 
				}
			
			},option.speed);
		}
		
	    loadFn();
		$(window).bind(option.event,loadFn);
		$(window).bind("resize",loadFn);
	};
})(jQuery);

$(function(){
   $(window).lazyload();
})