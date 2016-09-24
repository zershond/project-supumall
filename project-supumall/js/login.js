
//
$(function(){
	
	//进入登录页面，默认隐藏注册板块
//	$('.login-form').eq(1).css();
	
	//点击注册时，登录页面消失，显示注册页面
	$('a:eq(0)', $('.login-form').eq(0)).click(function(){
		var $this = $('.login-form').eq(0);
		var $next = $('.login-form').eq(1);
		$this.animate({
			right: '-80px',
			opacity: 0,
		},function(){$this.css('right','500px')});
		$next.show();
		$next.animate({
			right: 0,
			opacity: 1,
		})
	})
	//点击登录时，注册页面消失，显示登录页面
	$('a:eq(0)', $('.login-form').eq(1)).click(function(){
		var $this = $('.login-form').eq(1);
		var $next = $('.login-form').eq(0);
		$this.animate({
			right: '-80px',
			opacity: 0,
		},function(){$this.css('right','500px')});
		$next.show();
		$next.animate({
			right: 0,
			opacity: 1,
		})
	})
	
	
	//登录页面滑块
	$('.arrow').mousedown(function(event){
		var disX = event.clientX - this.offsetLeft;
		$(this).mousemove(function(event){
			var x = event.clientX - disX + 'px';console.log(x);
			$(this).css({
				left: x,
			});
			$(this).mouseup(function(){
				$(this).unbind('mousemove');
			})
			if( parseInt(x) >= 291 ){
				$(this).unbind('mousedown').unbind('mousemove').unbind('mouseup').addClass('check');
				$(this).parent().css('background','rgb(166, 230, 154)');
				$(this).next().html('验证通过');
			}
		});
	});

/*
	$('#login-form').validate({
		rules: {
			username: {
				required: true,
				minlength: 3,
			}
		},
		messages: {
			username: {
				minlength: '长度不能小于3',
			}
		},
	})
*/
	
	//登录验证
	$('#login-submitBtn').click(function(){
		var account = $('#username').val();
		var pwd = $('#login-pwd').val();
		login(account,pwd);
	})
})



function checkUsername(name){
	if(name.length <= 3){
		return '用户名长度不能小于3';
	}
	if(	/^[a-z0-9_-]{3,16}$/.test(name)){
		return '用户名合法';
	}
}

function login(name, pwd){
	$.get('data/userInfo.json',function(data){
		console.log(data);
		var checkLogin = false;
		for(var i = 0; i < data.login.length; i++){
			if(name == data.login[i].account && pwd == data.login[i].pwd){
				checkLogin = true;
				alert('欢迎回来！');
				window.location.href = "index.html?account="+name+'$pwd='+pwd;
//				$.post('index.html',{
//					account: name,
//					pwd: pwd,
//				},function(data){
//					$('html').html(data);
//					console.log(data);
//				},'json');
			}
		}
	},'json')
}


























