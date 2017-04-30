$(function(){
	$(".switch-cart li").hover(function(){
		$(this).css("borderBottom","2px solid #f40").siblings().css("borderBottom","none");
		$(this).addClass("selectColumn").siblings().removeClass("selectColumn");
	});


	$(".promotion").mouseover(function(){
		$(this).siblings(".proSlidedown").show("fast");
	});
	$(".promotion").mouseout(function(){
		$(this).siblings(".proSlidedown").hide();
	});

	$(".add").click(function(){
		var t=$(this).parent().find(".count-input");
		t.val(parseInt(t.val())+1);
		console.log("+:",t.val());
		TotalPrice();
	});
	
	$(".reduce").click(function(){
		var t=$(this).parent().find(".count-input");
		t.val(parseInt(t.val())-1);
		if(parseInt(t.val())<1){
			t.val(1);
		}
		TotalPrice();
		console.log("-:",t.val());
	});


	$(".GoodsCheck").click(function(){
		var goods=$(this).closest(".mainCommodity").find(".GoodsCheck");   
		var goodsC=$(this).closest(".mainCommodity").find(".GoodsCheck:checked");  
		var Shops=$(this).closest(".mainCommodity").find(".shopMsg-input");  
		if(goodsC.length==goods.length){   
			Shops.prop("checked",true);      
			if($(".shopMsg-input").length==$(".shopMsg-input:checked").length){  
				$("#selectAll").prop("checked",true);   
				TotalPrice();
			}else{
				$("#selectAll").prop("checked",false);  
				TotalPrice();
			}
		}else{  
			Shops.prop("checked",false);   
			$("#selectAll").prop("checked",false); 
			TotalPrice(); 
		}
	});

	$(".shopMsg-input").click(function(){
		if($(this).prop("checked")){   
			$(this).parents(".mainCommodity").find(".goods-check").prop("checked",true); 
			console.log("DIANPU:",$(".shopMsg-input").length+"---"+$(".shopMsg-input:checked").length);
			if($(".shopMsg-input").length==$(".shopMsg-input:checked").length){  
				$("#selectAll").prop("checked",true);  
				TotalPrice();
			}else{
				$("#selectAll").prop("checked",false);  
				TotalPrice();
			}
		}else{  
			$(this).parents(".mainCommodity").find(".goods-check").prop("checked",false); 
			$("#selectAll").prop("checked",false);   
			TotalPrice();
		}
	});

	
	$(".allSelected").click(function(){
		console.log("click");
		if($(this).prop("checked")){  
			$(".goods-check").prop("checked",true);
			TotalPrice();
		}else{
			$(".goods-check").prop("checked",false);  
			TotalPrice();
		}
		$(".shopMsg-input").change(); 
	});
	
	$(".goods-check").click(function(){
		if($(this).is(":checked")){ 
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
		var oprice=0;  
		var onum=0;  
		$(".mainCommodity .commodityInfo .GoodsCheck").each(function(){  
			if($(this).is(":checked")){  
				var num=parseInt($(this).parents(".commodityInfo").find("input[class*=count-input]").val()); 
				//console.log("数量：",num);
				var price=parseFloat($(this).parents(".commodityInfo").find(".unit-price").text()); 
				//console.log("单价：",price);
				var total=price*num;  
				oprice+=parseFloat(total);  
				onum+=parseInt(num);
			}
			$(".total-amount").text(onum);
			$(".total-sum").text(oprice.toFixed(2));
		});
	};


});
	
