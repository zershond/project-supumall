
//
$(function(){
	
	//加载脚部
	$('#footer').load('footer.html',function(){
		$('.culture-container').hide();
		$('.footer-nav').hide();
		$('.footer-info').css('background','#F3F3F3');
	});
	
	//检查cookie，若有，则添加到登录界面
	checkCookie();
	
	//生成验证码,点击生成新验证码
	var code = getCode();
	var globalCode = code;
	var globalPhoneCode = '';
	$('#code').html(code).click(function(){
		var code = getCode();
		globalCode = code;
		$(this).html(code);
	})
	
	
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
		},800)
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
		},800)
	})
	
	
	//登录页面滑块
	$('.arrow').mousedown(function(event){
		var disX = event.clientX - this.offsetLeft;
		$(this).mousemove(function(event){
			var x = event.clientX - disX + 'px';
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

	
	//登录验证
	$('#login-submitBtn').click(function(){
		var account = $('#username').val();
		var pwd = $('#login-pwd').val();
		if($('.pullbox .text').html() == '验证通过'){
			//调用验证函数
			login(account,pwd);
		}
	})
	

//注册部分
	//账户验证
	var respone = [];
	$('#regiAccount').blur(function(){
		var account = $(this).val();
		if(account.indexOf('@') == -1){
			respone[0] = checkPhone(account);
		}else{
			respone[0] = checkMail(account);
		}
		errorMsg(respone[0]);
	});
	//密码验证
	$('#regiPwd').blur(function(){
		var pwd = $(this).val();
		respone[1] = checkPwd(pwd);
		errorMsg(respone[1]);
	});
	//验证码验证
	$('#regiIdentifyCode').blur(function(){
		var code = $(this).val();
		console.log(globalCode)
		if(code == globalCode){
			errorMsg({
				check:true,
				msg: '',
			});
			respone[2] = {
				check: true,
			}
		}else{
			errorMsg({
				check:false,
				msg: '验证码不正确',
			});
			respone[2] = {
				check: true,
			}
		}
	})
	//手机验证码
	$('#call-phone').click(function(){
		globalPhoneCode = getCode();
		console.log(globalPhoneCode);
	})
	$('#regiPhoneCode').blur(function(){
		if($(this).val() == globalPhoneCode){
			errorMsg({check:true,msg:''});
			respone[3] = {check:true};
		}else{
			errorMsg({check:false,msg:'验证码错误'});
			respone[3] = {check:false};
		}
	})
	//允许注册
	$('#regiSubmitBtn').click(function(){
		if(respone[0].check && respone[1].check && respone[2].check &&respone[3].check){
			console.log('注册');
			$.cookie('account',$('#regiAccount').val());
			$.cookie('password',$('#regiPwd').val());
		}
	})
	
})

//主页函数库

//验证登录账户是否有效
function login(name, pwd){
	$.get('data/userInfo.json',function(data){
		var checkLogin = false;
		for(var i = 0; i < data.login.length; i++){
			if(name == data.login[i].account && pwd == data.login[i].pwd){
				checkLogin = true;
				addCookie(name,pwd);
				alert('欢迎回来！');
				//打开主页
				window.location.href = "index.html";//?account=+name+'&pwd='+pwd;
			}
		}
		if( !checkLogin ){
			alert('您还没注册，请前往注册页面注册');
		}
	},'json')
}
//是否添加到cookie
function addCookie(name, pwd){
	if($('#remember')[0].checked){
		$.cookie('account',name);
		$.cookie('password',pwd);
	}
	if($('#autologin')[0].checked){
		$.cookie('autologin','1');
	}
}
//检查cookie
function checkCookie(){
	var account = $.cookie('account');
	var pwd = $.cookie('password');
	if(account != null){
		$('#username').val(account);
	}
	if(pwd != null){
		$('#login-pwd').val(pwd);
	}
}



//验证用户名
function checkUsername(name){
	var checkName = {
		check: false,
		msg: '',
	}
	if(name.length <= 3){
		checkName.msg = '用户名长度不能小于3';
	}
	if(	/^[a-z0-9_-]{3,16}$/.test(name)){
		checkName.msg = '用户名合法';
		checkName.check = true;
	}
	else{
		checkName.msg = '用户名不合法';
	}
	return checkName;
}
//验证注册手机号
function checkPhone(phone){
	var checkPhone = {
		check: false,
		msg: '',
	}
	if(phone.length < 13){
		checkPhone.msg = '请输入11位手机号';
	}
	if( /^1[34578]\d{9}$/.test(phone)){
		checkPhone.msg = '合法手机号';
		checkPhone.check = true;
	}else{
		checkPhone.msg = '非法手机号';
	}
	return checkPhone;
}
//验证邮箱
function checkMail(mail){
	var checkMail = {
		check: false,
		msg: '',
	}
	if(	/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(mail)){
		checkMail.check = true;
		checkMail.msg = '有效邮箱';
	}else{
		checkMail.msg = '非法邮箱，请重新输入';
	}
	return checkMail;
}
//检查密码
function checkPwd(pwd){
	var checkPwd = {
		check: false,
		msg: '',
	}
	if(pwd.length > 16 || pwd.length < 6){
		checkPwd.msg = '密码长度要在6-16之间';
	}
	else if(/^[a-z0-9_-]{6,18}$/.test(pwd)){
		checkPwd.msg = '合法密码';
		checkPwd.check = true;
	}
	return checkPwd;
}


//提示错误信息的方法
function errorMsg(obj){
	if(!obj.check){
		$('#errorMsg').html(obj.msg).animate({height: '20px'});
	}else{
		$('#errorMsg').animate({height: '0px'});
	}
}

//获取验证码
function getCode(){
	var code = '';
	for(var i = 0; i < 4; i++){
		code += parseInt(Math.random()*10);
	}
	return code;
}


























