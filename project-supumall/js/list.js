


$(function(){
		//加载头部
	$('#header').load('heater.html',function(){
		$('.nav-allClass-menu').hide();
		$('.adv-right').hide();
		
		if($.cookie('autologin') == '1'){
			process();
		}
		
		//退出按钮绑定执行函数
		$("#quit").click(function(){
			$.cookie('autologin','0');
			window.location.href = 'index.html';
		})
		
		//显示主导航栏
		$('.nav-allClass').hover(function(event){
			$('.nav-allClass-menu').show()
		},function(){
			
		})
		$('.nav-menu-info').mouseleave(function(){
			$('.nav-allClass-menu').hide()
		})
		
	});
	
		

	//加载脚部
	$('#footer').load('footer.html',function(data){
		$(this).html(data);
	});
	
//	默认加载第一页
	getPage(1);
	
//	翻页按钮特效
	$('.pager').click(function(){
		$('.pager').removeClass('active');
		var index;
		if($(this).html() == 1 || $(this).html() == '首页' ){
			$('.pager').eq(0).addClass('active');
			$('.pager').eq(1).addClass('active');
			index = 1;
		}else if($(this).html() == 3 || $(this).html() == '尾页'){
			$('.pager').eq(3).addClass('active');
			$('.pager').eq(4).addClass('active');
			index = 3;
		}else{
			$(this).addClass('active');
			index = 2;
		}
		getPage(index);
	})
	
	

	
	
});




function getPage(index){
	var page = 'listDataPage' + index;
	var str = '<div class="list-item"><img src="img/list/list1-1.jpg"/><div class="title">方广 乖乖小馒头香蕉味15g</div><div class="price"><span>市场价：￥1.8</span><h3>速普特惠价：￥1</h3></div><div class="save-money">省44%</div><div class="disable"></div></div>'
	$('.listContainer').html(str)
	$.get('data/list.json',function(data){
		var len = data[page].length;
		for(var i = 1; i< len; i++){
			var obj = $('.list-item:eq(0)').clone();
			obj.find('img').attr('src',data[page][i]['imgSrc']);
			obj.find('.title').html(data[page][i]['title']);
			obj.find('.price').find('span').html(data[page][i]['price1']);
			obj.find('.price').find('h3').html(data[page][i]['price2']);
			obj.appendTo('.listContainer');
			if(i == 5){
				obj.find('.disable').show();
			}
		}
		announce();
	})
}

function announce(){
	$('.list-item .title').each(function(){
		$(this).hover(function(){
			$(this).stop().animate({top: '195px'})
		},function(){
			$(this).stop().animate({top: '210px'})
		})
	})
}


function process(){
	var account = $.cookie('account');
	//Hi 130*****331 欢迎来到速普商城！ [ 退出 ] 
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}