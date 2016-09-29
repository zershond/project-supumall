


$(function(){
	//加载头部
	$('#header').load('heater.html',function(){
//		隐藏头部搜索部分、导航栏部分
		$('.nav-allClass-menu').hide();
		$('.adv-right').hide();
		$('#search-container').hide();
		$('#bigbox').hide();
		
		//头部显示登录用户信息
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
	
	$('.arrow-container li').click(function(){
		$('.arrow-container li').removeClass('arrowActive');
		$(this).addClass('arrowActive');
	})
	
	
	//加载购物车信息
	if($.cookie('mallCar') == undefined){
		$('#mallCar-table tr:eq(1)').detach();
	}else{
		loadMallCar();
	}
	
	
	//删除选中商品
	$('.acount-operation a').eq(0).click(function(){
		deleteChecked();
	})
	
	//删除所有商品
	$('.acount-operation a').eq(1).click(function(){
		deleteAll();
	})
})



//加载购物车数据的函数
function loadMallCar(){
//	var obj = [{num: '12138',count: 2,},{num: '12140',count: 1,},{num: '12141',count: 1,}];
//	$.cookie('mallCar',JSON.stringify(obj));
	var car  = JSON.parse($.cookie('mallCar'));
	var goodsdata;
	var len = 0;
	if(car != null){
		len = car.length;
	}
	$.get('data/goodsInfo.json',function(data){
		goodsdata = data;
		for(var i = 0; i < len; i++){
			createTr(car[i].num, car[i].count, goodsdata);
		}
		$('#mallCar-table tr:eq(1)').detach();
		fn();
		calculate();
	});
}
//创建tr节点，改变节点内容并添加到tbody
function createTr(num, count, data){
//	$.get('data/goodsInfo.json',function(data){})
		var len = data.count;
		for(var i = 0; i < len; i++){
			if(num == data.goods[i].num){
				var trObj = $('#mallCar-table tr:eq(1)').clone();
				$('img', trObj).attr('src',data.goods[i].imgSrc);
				$('img', trObj).attr('id',data.goods[i].num);
				$('a:eq(0)', trObj).html(data.goods[i].info);
				$('.price', trObj).html(data.goods[i].price);
				$('.count-info', trObj).val(count);
				var sum = parseFloat(data.goods[i].price) * count;
				$('.sumPrice', trObj).html(sum);
				trObj.appendTo('tbody:eq(0)');
			}
			
		}
	
}


//声明和绑定每个tr里面的函数
function fn(){
	//点击增加数量
	$('.count-container .count-opa').click(function(){
		var opa = $(this).html();
		var value = parseFloat($('.count-info',$(this).parent()).val());
		var price = parseFloat($('.price',$(this).parent().parent().parent()).html());
		if(opa == '+'){
			value += 1;
		}else{
			value -= 1;
		}
		$('.count-info',$(this).parent()).val(value);
		price *= value;
		$('.sumPrice',$(this).parent().parent().parent()).html(price);
		calculate();
	});
	
	//点击删除购物车里面的对应商品
	$('tr .delete').click(function(){
		$(this).parent().parent().parent().parent().remove();
		calculate();
		var num = $('img', $(this).parent().parent().parent().parent()).attr('id');
		console.log(num);
		deleteCookie(num);
	});
	//点击选择购物车里面的商品
	$('#mallCar-table :checkbox').slice(1).click(function(){
		calculate();
	});
	$('#mallCar-table :checkbox').eq(0).click(function(){
		if(this.checked){
			$('#mallCar-table :checkbox').prop('checked',true);
		}else{
			$('#mallCar-table :checkbox').prop('checked',false);
		}
		calculate();
	})
	
	
}

//计算购物车小计的函数
function calculate(){
	$checked = $('#mallCar-table input:checked').slice(1).parent().parent();
	var gatherPrice = 0;
	var sumPrice = 0;
	var sale = 1;
	var counts = 0;
	for(var i = 0; i < $checked.length; i++){
		var price = parseFloat($checked.find('.sumPrice').eq(i).html());
		var c = parseInt($checked.find('.count-info').eq(i).val());
		counts += c;
		gatherPrice += price;
	}
	sumPrice = gatherPrice * sale;
	$('#gather-price', $('#gather-tab')).html(gatherPrice);
	$('#sum-price',$('#gather-tab')).html(sumPrice);
	$('#goodSumPrice').html(sumPrice);
	$('.goodsCount').html(counts)
}

//删除选中商品的函数
function deleteChecked(){
	$checked = $('#mallCar-table input:checked').parent().parent();
	$checked.each(function(){
		$(this).find('.delete').trigger('click');
	})
}

//删除所有商品
function deleteAll(){
	$checked = $('#mallCar-table input').parent().parent();
	$checked.each(function(){
		$(this).find('.delete').trigger('click');
	})
	deleteCookie(0);
}
//删除cookie里面对应商品信息
function deleteCookie(num){
	var $cookie = JSON.parse($.cookie('mallCar'));
	if(num == 0){
		$.cookie('mallCar','',{expires:-1})
	}else{
		for(k in $cookie){
			if($cookie[k].num == num){
				$cookie.splice(k,1);
			}
		}
		$.cookie('mallCar',JSON.stringify($cookie))
		console.log($.cookie('mallCar'));
	}
}



function process(){
	//获取cookie
	var account = $.cookie('account');
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}




















