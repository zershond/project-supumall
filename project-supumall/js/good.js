

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
	
	
})
























function process(){
	var account = $.cookie('account');
	//Hi 130*****331 欢迎来到速普商城！ [ 退出 ] 
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}


