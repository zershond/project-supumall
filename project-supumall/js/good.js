

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
		
		//设置购物车数量
		calculateCount()
		
	});

	//加载本次页面商品信息
	setThisGood()
	
	//加载脚部
	$('#footer').load('footer.html',function(data){
		$(this).html(data);
	});
	

	
	
//	放大镜执行函数
	$(".bigPic").jqueryzoom({
		xzoom: 500,//放大区域宽度
		yzoom: 500,//放大区域高度
		preload: 1,//是否显示预加载
		offset:0,//放大区域偏离小图的距离
		position: "right",//放大区域显示的位置（left,right）
		lens:true //是否显示小图上的透明区域
	});
	//切换放大镜图片
	$('.smallImg img').mouseenter(function(){
		var src = $(this).attr('src');
		$('img',$('.bigPic')).attr('src',src).attr('jqimg',src);
	})
	
	//切换城市
	$('#province').change(function(){
		var province = $('option:selected', $(this)).val();
		var city = $.get('data/city.json',function(data){
			$('#city').html('<option value="">请选择城市</option>');
			console.log(data);
			var len = data.city[province].length;
			for(var i = 0; i < len; i++){
				var optionObj = $('#city option:eq(0)').clone();
				$(optionObj).val(data.city[province][i]).html(data.city[province][i]).appendTo('#city');				
			}
		},'json');
		if(province == '西藏自治区'){
			$('#freightCount').html('该地区不能免运费    按正常快递收费');
		}else{
			$('#freightCount').html('免运费    预计正常3-5个工作日送达');
		}
	})
	
	//点击增加购买数量
	$('.count-opa').click(function(){
		var opa = $(this).html();
		var count = $('#count').val();
		var points = parseInt($('#points').html());
		if(opa =='+'){
			$('#count').val((parseInt(count)+1));
			points += 83;
		}else{
			$('#count').val((parseInt(count)-1));
			points -= 83;
		}
		$('#points').html(points);
	});
	
	//点击添加购物车
	$('#add-mallCar').click(function(event){
//		商品添加到购物车的动画
		$('#add-mallCar-img').css({
			left: '712px',
			top: '634px',
			display: 'block',
		}).animate({
			left: 0,
			top: 0,
		},function(){
			$(this).hide()
		})
		
//		设置cookie json='"aa":"aa"'
//		将购物信息更新到cookie
		var count = parseInt($('#count').val());
		var num = $(this).attr('num');
		if($.cookie('mallCar') == undefined){console.log('cookie unexit')
			var goodObj = [{num: num,count: count,}];
			var info = JSON.stringify(goodObj);
		}
		else{console.log('cookie exit')
			var info = $.cookie('mallCar');
			var goodObj = JSON.parse(info);
			var check = false;
			for(var k in goodObj){
				if(goodObj[k].num == num){
					var temp = parseInt(goodObj[k].count);
					temp += count;
					goodObj[k].count = temp;
					check = true;
				}
			}
			if(!check){
				var o = {num: num,count: count,};
				goodObj.push(o);
			}
			info = JSON.stringify(goodObj);
		}
		//添加到cookie
		$.cookie('mallCar',info);
		//console.log($.cookie('mallCar'))
		calculateCount();
	})
	
	//商品详情与评论之间切换
	$('.more-info-title li').click(function(){
		$('.more-info-title li').removeClass('active');
		$(this).addClass('active');
		var src = $(this).attr('a');
		console.log(src);
		$('.more-info-container').load(src);
	})
	
	
})


//获取本次页面详情信息
function setThisGood(){
	var _url = window.location.href.split('?');
	var _url1 = _url[1].split('=')
	var num = _url1[1];
	//main-img>img smallImg>img
	// $('.main-img .bigPic img').attr('src',num);
	$.get('data/goods.json',function(data){
		//console.log(data);
		for(k in data.goods){
			if(num == data.goods[k].num){
				setImgSrc(data.goods[k]);
				setInfo(data.goods[k]);
			}
		}
	})
}

// 设置详情页图片
function setImgSrc(obj){
	var _src = obj.imgSrc;
	var _price = obj.price;
	$('.main-img .bigPic img').attr('src',_src);
	$('.main-img .bigPic img').attr('jqimg',_src);
	for(var i = 0; i < 4; i++){
		$('.smallImg img').eq(i).attr('src',obj.small[i]);
	}
}
//设置详情页其他信息
function setInfo(obj){
	var _info = obj.info;
	var _title = obj.title;
	var _detail = obj.detail;
	$('.info-title').html(_title);
	$('.detail-info h3').html(_info);
	$('.detail-info p').html(_detail);
	$('#add-mallCar').attr('num',obj.num);
	$('.more-info-title li').eq(0).attr('a',obj.moreInfo);
	$('.more-info-container').attr('_src',obj.moreInfo)
	loadMoreInfo();
}
//加载详情页面
function loadMoreInfo(){
	//加载详情页面
	var _src = $('.more-info-container').attr('_src');
	console.log(_src)
	$('.more-info-container').load(_src);
}


//滚动条滚动时
$(window).scroll(function(){
	var top = $(window).scrollTop();
	if(top >= 950){
		$('.more-info-title').css({
			position: 'fixed',
			top: 0
		})
	}else{
		$('.more-info-title').css({
			position: '',
			top: 0
		})
	}
})


function process(){
	var account = $.cookie('account');
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}

//计算购物车里面商品数量
function calculateCount(){
	if($.cookie('mallCar')){
		var car = JSON.parse($.cookie('mallCar'));
		var count = 0;
		for(k in car){
			count += car[k].count;
		}
		console.log(count);
		setMallCarNum(count);
	}
	else{
		setMallCarNum(0);
	}
	
}

