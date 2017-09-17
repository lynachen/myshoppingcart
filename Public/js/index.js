// max-stock
$(function(){
    //输入设置最大值
    $("input.sum").keypress(function(e){
        if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
            return false;
        }
    });
    $("input.sum").bind("input propertychange",function(){       
        if($("input.sum").val() == 1){
            var $reduce = $(this).prev("a.reduce");
            $reduce.addClass("reSty");
        };
        if($("input.sum").val() > 1){
            var $reduce = $(this).prev("a.reduce");
            $reduce.removeClass("reSty");
        };
        if($("input.sum").val()>1000){
            $(this).val(1000);
            alert("商品数量超限！");
        };
    });

    //点击设置最大值
    var $add = $("a.add");
    $add.click(function(){
        var $inputSum = $(this).prev("input.sum");
        if($inputSum.val()>1000){
            $inputSum.val(1000);
            alert("商品数量超限！");
        }
    });
})
//显示卖家促销下拉列表：
$(function(){
    $(".promotion").mouseover(function(){
        $(this).find(".proSlidedown").show("fast");
    });
    $(".promotion").mouseout(function(){
        $(this).find(".proSlidedown").hide();
    });
})

// -----------------------------------------------------------购物车结算---------------------------------------------
$(function(){
    //全局的checkbox选中和未选中的样式
    var $allCheckBox = $("input[type='checkbox']");  //所有的checkbox
    var $checkAll = $(".check-all");  //全选的checkbox
    var $cartBox = $(".cart-box");    //获取每个商铺
    var $shopCheckBox = $(".shop-check");  //每个商铺的checkbox
    var $goodsCheckBox = $(".goods-check"); //每个商铺下商品的checkbox

    // -----全选的checkbox与单个商品的关系-----
    //1.选中全选checkbox，则选中每个商品，否则反选
    $checkAll.click(function(){
        var $checkboxes = $cartBox.find("input[type='checkbox']");  //获取每个商铺下的checkbox（包括商铺和商品）
        if($(this).is(":checked")) {
            $(".cart-box .cart-list").css("background-color","#fff4f0");
            $(".cart-box .cart-list.list-void").css("background-color","#f0f0f0");
            $checkboxes.prop("checked",true);
        } else {
            $(".cart-box .cart-list").css("background-color","transparent");
            $checkboxes.prop("checked",false);
        }
        totalMoney();
    });
    //2.选中每个商品，则选中全选checkbox，否则不选中
    $goodsCheckBox.click(function(){
        $checkAll.prop("checked",$goodsCheckBox.length == $goodsCheckBox.filter(":checked").length);
    });

    //-----每个商铺的checkbox与全选checkbox的关系-----

    //1.若商铺全部选中，则全选checkbox选中；若商铺有一个未选中，则全选checkbox不选中。
    // $shopCheckBox.click(function(){
    //  $checkAll.prop("checked",$shopCheckBox.length == $shopCheckBox.filter(":checked").length);
    // });
    $shopCheckBox.each(function(){  //遍历每个商铺的checkbox
        $(this).click(function(){
            if($(this).is(":checked")) {  //（1）若商铺全部选中，则全选checkbox选中，
                $(this).parents(".cart-box").find(".cart-list").css("background-color","#fff4f0");
                $(".cart-box .cart-list.list-void").css("background-color","#f0f0f0");
                var len = $shopCheckBox.length;  
                var num = 0;
                $shopCheckBox.each(function(){
                    if($(this).is(":checked")) {
                        num++;
                    }
                });
                if(num == len) {
                    $checkAll.prop("checked",true);
                }
                $(this).parents(".cart-box").find(".goods-check").prop("checked",true);  //同时，获取商铺下的商品，并选中；
            } else {  //（2）否则，全选checkbox取消选中，同时，商铺下的商品取消选中
                $(this).parents(".cart-box").find(".cart-list").css("background-color","transparent");
                $checkAll.prop("checked",false);
                $(this).parents(".cart-box").find(".goods-check").prop("checked",false);
            }
            totalMoney();
        });
    });

    //-----每个商铺与其下商品的关系-----
    //若商品的checkbox全部选中，则商铺checkbox选中；若商品的checkbox有一个未选中，则商铺checkbox取消选中
    $cartBox.each(function(){  //遍历每个商铺盒子
        var $this = $(this);
        var $goodsChecks = $this.find(".goods-check");
        $goodsChecks.each(function(){
            $(this).click(function(){
                if($(this).is(":checked")) {  //（1）若商品的checkbox全部选中，则商铺checkbox选中；
                    $(this).parents(".cart-list").css("background-color","#fff4f0");
                    var len = $goodsChecks.length;
                    var num = 0;
                    $goodsChecks.each(function(){
                        if($(this).is(":checked")) {
                            num++;
                        }
                    });
                    if(num == len) {
                        $(this).parents(".cart-box").find(".shop-check").prop("checked",true);
                    }
                } else {  //（2）否则，商铺checkbox取消选中
                    $(this).parents(".cart-box").find(".shop-check").prop("checked",false);
                    $(this).parents(".cart-list").css("background-color","transparent");
                }
                totalMoney();
            });
        });
    });


    //-----商品数量增减-----
    var $add = $(".amount-box .add");
    var $reduce = $(".amount-box .reduce");
    var $sum = $(".amount-box .sum");
    //数量增
    $add.click(function(){
        var $inputVal = $(this).prev("input");  //加号前的input
        var $count = parseInt($inputVal.val()) + 1; //获取数字，每点击一次add加1
        var $obj = $(this).parents(".amount-box").find(".reduce");  //获取减号
        var $priceTotalObj = $(this).parents(".cart-list").find(".sum-price"); //获取总价
        var $price = $(this).parents(".cart-list").find(".price").html();  //获取单价
        var $priceTotal = $count*parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html("￥" + $priceTotal);
        if($inputVal.val() > 1 && $obj.hasClass("reSty")){
            $obj.removeClass("reSty");
        };
        totalMoney();
    });
    //数量减
    $reduce.click(function(){
        var $inputVal = $(this).next("input");  //减号后的input
        var $count = parseInt($inputVal.val()) - 1; //获取数字，每点击一次reduce减1
        var $priceTotalObj = $(this).parents(".cart-list").find(".sum-price"); //获取总价
        var $price = $(this).parents(".cart-list").find(".price").html();//获取单价
        var $priceTotal = $count * parseInt($price.substring(1));
        if($inputVal.val() > 1) {
            $inputVal.val($count);
            $priceTotalObj.html("￥" + $priceTotal);
        } 
        if($inputVal.val() == 1 && !$(this).hasClass("reSty")) {
            $(this).addClass("reSty");
        }
        totalMoney();
    });
    $sum.keyup(function(){
        var $count = 0;
        var $priceTotalObj = $(this).parents(".cart-list").find(".sum-price"); //获取总价
        var $price = $(this).parents(".cart-list").find(".price").html();//获取单价
        var $priceTotal = 0;
        if($(this).val() == ""){
            $(this).val("1");
        }
        $(this).val($(this).val().replace(/\D|^0/g,''));
        $count = $(this).val();
        $priceTotal = $count * parseInt($price.substring(1));
        $(this).attr("value",$count);
        $priceTotalObj.html("￥" + $priceTotal);
        totalMoney();
    });

     //-----删除商品-----
     var $cartList = null;
     var $cartContent = "";
     $(".btn-operation .btn-del").click(function(){
        $cartList = $(this).parents(".cart-list");
        $cartContent = $(this).parents(".cart-content"); 
        $cartBox = $(this).parents(".cart-box");       
        $(".modal-backdrop").fadeIn(300);
        $(".modal-goodsdel").fadeIn(300);
    });

    //确定按钮，移除商品
    $(".btn-goodsdel .btn-sure").click(function () {
        $cartList.remove();
        if($cartContent.html().trim() == null || $cartContent.html().trim().length == 0){
            $cartBox.remove();
        }  
        if($(".cart-box").length == 0){
            window.location.href='empty.html';
        }        
        closeM();
        $goodsCheckBox = $(".goods-check");
        totalMoney();        
    })    
    //关闭模态框
    $(".closeModal").click(function () {
        closeM();
    });
    $(".btn-goodsdel .btn-close").click(function () {
        closeM();
    });
    function closeM() {
        $(".modal-backdrop").fadeOut(300);
        $(".modal-goodsdel").fadeOut(300);
    }    

    //-----收藏商品-----
    var $btnCol = $(".btn-operation .btn-col");
    $btnCol.click(function(){
        if(!$(this).hasClass("highlight")) {
            $(this).addClass("highlight")
            .text("已收藏");
        } else {
            $(this).removeClass("highlight")
            .text("收藏");
        }
    });

    //-----删除选中的商品-----
    $(".cart-footer .btn-del-choose").click(function(){ 
        $(".goods-check").each(function(){
            var $goodsChecked = $(this).filter(":checked");
            if(!$goodsChecked.length == 0 ) {  
                var $cartList = $goodsChecked.parents(".cart-list");
                var $cartContent = $goodsChecked.parents(".cart-content");
                var $cartBox = $goodsChecked.parents(".cart-box");
                $(".modal-backdrop").fadeIn(300);
                $(".modal-seldel").fadeIn(300);                          
                $(".btn-seldel .btn-sure").click(function(){
                    $cartList.remove();
                    $goodsChecked.prop("checked",false);
                    if($cartContent.html().trim() == null || $cartContent.html().trim().length == 0){
                        $cartBox.remove();
                    }    
                    if($(".cart-box").length == 0){
                        window.location.href='empty.html';
                    }    
                    closeM();
                    totalMoney(); 
                });
                    //关闭模态框
                    $(".closeModal").click(function () {
                        closeM();
                    });
                    $(".btn-seldel .btn-close").click(function () {
                        closeM();
                    });
                    function closeM() {
                        $(".modal-backdrop").fadeOut(300);
                        $(".modal-seldel").fadeOut(300);
                    }  
                } 

            });   
    });
    //-----收藏选中的商品-----
    $(".cart-footer .btn-col-choose").click(function(){        
        var $btnOK = $(this).siblings(".btn-col-ok");
        $(".goods-check").each(function(){
            var $goodsChecked = $(this).filter(":checked");
            if(!$goodsChecked.length == 0){
                $btnOK.show()
                .delay(1000).hide(0);
            }
        });
    });

    //-----清除无效商品-----
    $(".cart-footer .btn-void").on("click",function(){
        $listVoid = $(".list-void");
        $cartContent = $listVoid.parents(".cart-content"); 
        $cartBox = $cartContent.parents(".cart-box");               
        $(".modal-backdrop").fadeIn(300);
        $(".modal-voiddel").fadeIn(300);
        $(".btn-voiddel .btn-sure").on("click",function(){
            $listVoid.remove();
            if($cartContent.html().trim() == null || $cartContent.html().trim().length == 0){
                $cartBox.remove();
            }    
            if($(".cart-box").length == 0){
                window.location.href='empty.html';
            }    
            closeM();           
        });

        //关闭模态框
        $(".closeModal").click(function () {
            closeM();
        });
        $(".btn-voiddel .btn-close").click(function () {
            closeM();
        });
        function closeM() {
            $(".modal-backdrop").fadeOut(300);
            $(".modal-voiddel").fadeOut(300);
        } 
    });




    
    //-----总价-----
    function totalMoney(){
        var totalMoney = 0;
        var totalCount = 0;
        var btnSum = $(".btn-sum");
        $goodsCheckBox.each(function(){
            if($(this).is(":checked")){
                var goods = parseInt($(this).parents(".cart-list").find(".sum-price").html().substring(1));
                var num = parseInt($(this).parents(".cart-list").find(".sum").val());
                totalMoney += goods;
                totalCount += num;
            }
        });
        $(".total-sum").html("￥" + totalMoney);
        $(".amount-num").html(totalCount);

        if(totalMoney !== 0 && totalCount !== 0){
            if(!btnSum.hasClass("btn-sty")){
                btnSum.addClass("btn-sty");
            } 
        } else {
            if(btnSum.hasClass("btn-sty")){
                btnSum.removeClass("btn-sty");
            }
        }
    }


})