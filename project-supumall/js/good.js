

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
	});
	
	//加载脚部
	$('#footer').load('footer.html',function(data){
		$(this).html(data);
	});
	
	
//	放大镜执行函数
	$(".bigPic").jqueryzoom({
		xzoom: 355,//放大区域宽度
		yzoom: 355,//放大区域高度
		preload: 1,//是否显示预加载
		offset:10,//放大区域偏离小图的距离
		position: "right",//放大区域显示的位置（left,right）
		lens:true //是否显示小图上的透明区域
	});
	//切换放大镜图片
	$('.smallImg img').mouseenter(function(){
		var src = $(this).attr('src');
		$('img',$('.bigPic')).attr('src',src).attr('jqimg',src);
	})
	
	
	//点击增加购买数量
	$('.count-opa').click(function(){
		var opa = $(this).html();
		var count = $('#count').val();
		if(opa =='+'){
			$('#count').val((parseInt(count)+1));
		}else{
			$('#count').val((parseInt(count)-1));
		}
	});
	
	
})
























function process(){
	var account = $.cookie('account');
	//Hi 130*****331 欢迎来到速普商城！ [ 退出 ] 
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}


