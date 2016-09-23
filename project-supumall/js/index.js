$(function(){
	$('#header').load('heater.html',function(data){
		$(this).html(data);
	});
	
	$('#footer').load('footer.html',function(data){
		$(this).html(data);
	});
	
//	$('.special-zone-container').clone().appendTo('#special-zone')

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