


$(function(){
	//加载头部
	$('#header').load('heater.html',function(){
//		隐藏头部搜索部分、导航栏部分
		$('.nav-allClass-menu').hide();
		$('.adv-right').hide();
		$('#search-container').hide();
		$('#bigbox').hide();
		
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
	loadMallCar();
	

	
})



//加载购物车数据的函数
function loadMallCar(){
	var obj = [{num: '12138',count: 2,},{num: '12140',count: 1,},{num: '12141',count: 1,}];
	$.cookie('mallCar',JSON.stringify(obj));
	var car  = JSON.parse($.cookie('mallCar'));
	var goodsdata;
	$.get('data/goodsInfo.json',function(data){
		goodsdata = data;
		for(var i = 0; i < car.length; i++){
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
	});
	
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
	for(var i = 0; i < $checked.length; i++){
		var price = parseFloat($checked.find('.sumPrice').eq(i).html());console.log(price);
		gatherPrice += price;
	}
	sumPrice = gatherPrice * sale;
	$('#gather-price', $('#gather-tab')).html(gatherPrice);
	$('#sum-price',$('#gather-tab')).html(sumPrice);
}




function process(){
	var account = $.cookie('account');
	//Hi 130*****331 欢迎来到速普商城！ [ 退出 ] 
	var str = 'hi  <a href="#">';
	str = str + account + '</a> 欢迎来到速普商城！ [ <a id="quit" href="#">退出</a> ]';
	$('.header-title span').eq(0).html(str);
}




















