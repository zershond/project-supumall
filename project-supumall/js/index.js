$(function(){
	
	//引入头部
	$('#header').load('heater.html',function(data){
//		$(this).html(data);
		console.log(window.location.href);
		//若有传过来用户名密码，则登录
		if($.cookie('autologin') == '1'){
			process();
		}
		
		//退出按钮绑定执行函数
		$("#quit").click(function(){
			$.cookie('autologin','0');
			window.location.href = 'index.html';
		})
		
	});
	
	
	//引入脚部
	$('#footer').load('footer.html',function(data){
		$(this).html(data);
	});
	

//swiper js
	 var swiper1 = new Swiper('#index-swiper .swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
    
    var swiper2 = new Swiper('#special-zone .swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
    
    //整点抢购js 今日特卖部分
    $('.sale-goods-list li').each(function(){
    	$(this).hover(function(){
    		var disable = $('.disable', $(this)).css('left');
    		//如果被设置了不能购买，则不会弹出提示框
    		if(disable == '-143px'){
    			$('.sale-advise').each(function(){$(this).stop().css('left','-143px')});
	    		$('.able',$(this)).animate({opacity: 1},function(){
	    			$(this).next().animate({left: 64})
	    		});
    		}
    	},function(){
    		$('.sale-advise').each(function(){$(this).stop().css('left','-143px')});
    		$('.able',$(this)).animate({opacity: 0}).next().css('left','-143px');
    	})
    })
    
    //限时抢购，底部图片升起
    $('.time-sale-list-img').hover(function(){
    	console.log($('.time-sale-list-bottomImg', $(this)))
    	$('.time-sale-list-bottomImg', $(this).parent()).stop().animate({height: '56px'});
    },function(){
    	$('.time-sale-list-bottomImg', $(this).parent()).stop().animate({height: '0px'});
    });
    
    //专区图片特效
	$('.special-zone-list img').hover(function(){
		$(this).stop().animate({left: 10});
	},function(){
		$(this).stop().animate({left: 0});
	})
})


function process(){
	var account = $.cookie('account');
	console.log();
	//Hi 130*****331 欢迎来到速普商城！ [ 退出 ] 
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}































