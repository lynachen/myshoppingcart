$(function(){
	//下边框移动：
	$(".switch-cart li").hover(function(){
		$(this).css("borderBottom","2px solid #f40").siblings().css("borderBottom","none");
		$(this).addClass("selectColumn").siblings().removeClass("selectColumn");
	});

	//显示卖家促销下拉列表：
	$(".promotion").mouseover(function(){
		$(this).siblings(".proSlidedown").show("fast");
	});
	$(".promotion").mouseout(function(){
		$(this).siblings(".proSlidedown").hide();
	});

	//数量加
	$(".add").click(function(){
		var t=$(this).parent().find(".count-input");
		t.val(parseInt(t.val())+1);
		// console.log("+:",t.val());
		TotalPrice();
	});
	//数量减
	$(".reduce").click(function(){
		var t=$(this).parent().find(".count-input");
		t.val(parseInt(t.val())-1);
		if(parseInt(t.val())<1){
			t.val(1);  //数量最小为1
		}
		TotalPrice();
		// console.log("-:",t.val());
	});	

	//点击商品按钮
	$(".GoodsCheck").click(function(){
		var goods=$(this).closest(".mainCommodity").find(".GoodsCheck");   //获取本店铺的所有商品
		var goodsC=$(this).closest(".mainCommodity").find(".GoodsCheck:checked");  //获取本店铺所有被选中的商品 
		var Shops=$(this).closest(".mainCommodity").find(".shopMsg-input");  //获取本店铺的全选按钮 
		if(goodsC.length==goods.length){   //如果选中的商品等于所有商品
			Shops.prop("checked",true);      //店铺全选按钮被选中 
			if($(".shopMsg-input").length==$(".shopMsg-input:checked").length){  //如果店铺被选中的数量等于所有店铺的数量 
				$("#selectAll").prop("checked",true);   //全选按钮被选中
				TotalPrice();
			}else{
				$("#selectAll").prop("checked",false);  //全选按钮不被选中 
				TotalPrice();
			}
		}else{   //如果选中的商品不等于所有商品 
			Shops.prop("checked",false);   //店铺全选按钮不被选中 
			$("#selectAll").prop("checked",false);  //全选按钮也不被选中
			TotalPrice(); 
		}
	});

	// 点击店铺按钮 
	$(".shopMsg-input").click(function(){
		if($(this).prop("checked")){   //如果店铺按钮被选中
			$(this).parents(".mainCommodity").find(".goods-check").prop("checked",true); //店铺内的所有商品按钮也被选中 
			console.log("DIANPU:",$(".shopMsg-input").length+"---"+$(".shopMsg-input:checked").length);
			if($(".shopMsg-input").length==$(".shopMsg-input:checked").length){  //如果店铺被选中的数量等于所有店铺的数量
				$("#selectAll").prop("checked",true);   //全选按钮被选中 
				TotalPrice();
			}else{
				$("#selectAll").prop("checked",false);  //全选按钮不被选中 
				TotalPrice();
			}
		}else{  //如果店铺按钮不被选中 
			$(this).parents(".mainCommodity").find(".goods-check").prop("checked",false); //店铺内的所有商品按钮将不会被全选 
			$("#selectAll").prop("checked",false);    //全选按钮也不被选中 
			TotalPrice();
		}
	});

	// 点击全选按钮 
	$(".allSelected").click(function(){
		console.log("click");
		if($(this).prop("checked")){   //如果全选按钮被选中
			$(".goods-check").prop("checked",true); //所有按钮都被选中 
			TotalPrice();
		}else{
			$(".goods-check").prop("checked",false);  //所有按钮都被不选 
			TotalPrice();
		}
		$(".shopMsg-input").change();//执行店铺全选的操作  
	});
	
	$(".goods-check").click(function(){
		if($(this).is(":checked")){  //如果商品被选中
			$(".btn-common").css({
				"background-color":"#FF4400",
				"cursor":"pointer"
			});
		}else{
			$(".btn-common").css({
				"background-color":"#aaa",
				"cursor":"not-allowed"
			});
		}
	});


	function TotalPrice(){
		var oprice=0;  //总价
		var onum=0;  //数量
		$(".mainCommodity .commodityInfo .GoodsCheck").each(function(){  //循环店铺里面的商品 
			if($(this).is(":checked")){  //如果该商品被选中 
				var num=parseInt($(this).parents(".commodityInfo").find("input[class*=count-input]").val()); //得到商品的数量
				//console.log("数量：",num);
				var price=parseFloat($(this).parents(".commodityInfo").find(".unit-price").text()); //得到商品的单价 
				//console.log("单价：",price);
				total=price*num;  //计算单个商品的总价
				oprice+=parseFloat(total);  //计算该店铺的总价 
				onum+=parseInt(num);
			}
			$(".total-amount").text(onum);
			$(".total-sum").text(oprice.toFixed(2));
		});
	};

});
