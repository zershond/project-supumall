

$(function(){
	
	//如果已经登录，在左上角显示登录用户信息
//	$('.header-title span:eq(0)').html();
	
	$('.nav-menu-info').each(function(){
		$(this).hide();
	})
	
	//题头部分显示下拉列表
	$('.header-info li').each(function(){
		$(this).mouseover(function(){
			$('.header-info li').each(function(){$('ul', this).hide();})
			$('ul',this).show();
		})
		$('ul',this).mouseenter(function(){$(this).show();})
		$('ul',this).mouseleave(function(){console.log(	$(this))
			$(this).hide();
		})
	});

	//导航栏换图标
	
	function setNavPosition(){
		$('.nav-allClass-menu li').each(function(){
			var index = $(this).index();
			var position= '0px ' + (-index*30 - 150) + 'px';
			$('span:eq(0)',$(this)).css('background-position',position);
			$('.navTab-bottomIcon').css('background-position','192px -137px');
		})
	}
	setNavPosition();
	
	$('.nav-allClass-menu li').mouseenter(function(){
		var index = $(this).index();
		var position= '-35px ' + (-index*30 - 150) + 'px';
		
		$('.nav-menu-info').each(function(){$(this).hide();})
		$('.nav-menu-info').eq(index).show();
		
		$('.nav-allClass-menu li').each(function(){
			var index = $(this).index();
			$(this).css({
				background: '',
				color: 'white',
			});
			$('span:eq(0)',$(this)).css('background-position','0px ' + (-index*30 - 150) + 'px');
			$('.navTab-bottomIcon').css('background-position','192px -137px');
		})
		$(this).css({
			background: 'white',
			color: '#e5004a',
		})
		$('span:eq(0)',$(this)).css('background-position',position);
		$('.navTab-bottomIcon',$(this)).css('background-position','192px -235px');
	});
	$('.nav-allClass-menu li').mouseleave(function(){
		$('.nav-allClass-menu li').each(function(){
			var index = $(this).index();
			$(this).css({
				background: '',
				color: 'white',
			});
			$('span:eq(0)',$(this)).css('background-position','0px ' + (-index*30 - 150) + 'px');
			$('.navTab-bottomIcon').css('background-position','192px -137px');
		})
		setNavPosition();
	})
	
	$('.nav-menu-info').mouseleave(function(){
		$(this).hide();
	})
	
})