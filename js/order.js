(function() {
	$(function() {
		/**************** 待付款 *****************/
		//买家取消订单
		$("body").on("click",".quxiaodingdan",function(){
			if(confirm("确定取消订单吗?")){
				var _t = $(this),
					order_id = _t.parents(".box").attr("data_order_id");
				$.ajax({
					url: host + '/index.php?app=buyer_order&act=cancel_order',
					type: "post",
					dataType: "json",
					data:{"order_id":order_id},
					beforeSend:function(){
						allFun.loading("正在取消订单！");
					},
					success: function(rs) {
						allFun.removeLoading();
						if(rs.code == 0) {
							allFun.alertDiv("取消订单成功！");
							var str = location.href.split('#')[0];
							if(str.indexOf("orderList") > 0){//列表页
								_t.parents(".box").find("h2 em").html("交易关闭");
								_t.parents(".dOperate").remove();
							}else{//详情页
								location.replace(location.href+"&t="+Date.now());
							}
						} else {
							allFun.alertDiv(rs.msg);
						}
					},
					error: function() {
						allFun.removeLoading();
						allFun.alertDiv("error!")
					}
				})
			}
		});
		//买家去付款
		$("body").on("click",".qufukuan",function(){
			var _t = $(this),obj = {},order_id = _t.parents(".box").attr("data_order_id");
			
			var str = location.href.split('#')[0];
			if(str.indexOf("orderList") > 0){//列表页
				obj.linkType = linkType;
				sessionStorage.setItem("orderListShopStorage", JSON.stringify(obj));
				history.replaceState(null,null,"?linkType="+linkType+"&type="+type+"&history=-1");
			}
			location.href = "/shop/html/cart/cashierDesk.html?orderId="+order_id+"&type=0";
		});
		
		/**************** 待发货 *****************/
		//买家提醒发货
		$("body").on("click",".tixingfahuo",function(){
			var _t = $(this),
				order_id = _t.parents(".box").attr("data_order_id");
			$.ajax({
				url: host + '/index.php?app=buyer_order&act=remindship',
				type: "get",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading("正在提醒发货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("提醒发货成功！");
					} else {
						allFun.alertDiv(rs.msg);
					}
				},
				error: function() {
					allFun.removeLoading();
					allFun.alertDiv("error!")
				}
			})
		});
		//卖家去发货
		$("body").on("click",".qufahuo",function(){
			$(this).parents(".box").append("<div class='dScanCode'><div class='cc'><h2><i class='iconfont icon-123'></i></h2><p><label>运单号</label><input placeholder='请输入货单号' /><i class='iconfont icon-erweima'></i></p><a>确认</a></div><div class='bb'></div></div>")	
		});
		//确认二维码
		$("body").on("click",".dScanCode a",function(){
			var _t = $(this),
				order_id = _t.parents(".box").attr("data_order_id"),//订单id
				invoice_no = _t.parents(".cc").find("input").val();//货运单号
			if(invoice_no == ""){
				allFun.alertDiv("请输入货运单号！");
				return false;
			}
			$.ajax({
				url: host + '/index.php?app=seller_order&act=shipped',
				type: "get",
				dataType: "json",
				data:{"order_id":order_id,"invoice_no":invoice_no},
				beforeSend:function(){
					allFun.loading("正在发货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("发货成功！");
						var str = location.href.split('#')[0];
						if(str.indexOf("orderList") > 0){//列表页
							_t.parents(".box").find("h2 em").html("卖家已发货");
							_t.parents(".box").find(".dOperate").html("<a class='chakanwuliu'>查看物流</a><a class='tixingshouhuo'>提醒收货</a>");
							_t.parents(".box").attr("data_invoice_no",invoice_no);
							$(".dScanCode").remove();
						}else{//详情页
							location.replace(location.href+"&t="+Date.now())
						}
					} else {
						allFun.alertDiv(rs.msg);
					}
				},
				error: function() {
					allFun.removeLoading();
					allFun.alertDiv("error!")
				}
			})
		});
		//扫描二维码
		$("body").on("click",".dScanCode p i",function(){
			wx.ready(function(){
				wx.scanQRCode({
				    desc: 'scanQRCode desc',
				    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				    success: function (res) {
				    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				    	result=result.split(",");
				    	$(".dScanCode input").val(result[1]);
					}
				});
			})
		});
		//关闭二维码框
		$("body").on("click",".dScanCode .bb,.dScanCode h2 i",function(){
			$(".dScanCode").remove();
		});
		
		/**************** 待收货 *****************/
		//买家确认收货
		$("body").on("click",".querenshouhuo",function(){
			var _t = $(this),
				order_id = _t.parents(".box").attr("data_order_id");
			$.ajax({
				url: host + '/index.php?app=buyer_order&act=confirm_order',
				type: "get",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading("正在确认收货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("确认收货成功！");
						var str = location.href.split('#')[0];
						if(str.indexOf("orderList") > 0){//列表页
							_t.parents(".box").find("h2 em").html("交易完成");
							_t.parents(".dOperate").html("<a class='chakanwuliu'>查看物流</a><a class='qupingjia'>去评价</a>");
						}else{//详情页
							location.replace(location.href+"&t="+Date.now());
						}
					} else {
						allFun.alertDiv(rs.msg);
					}
				},
				error: function() {
					allFun.removeLoading();
					allFun.alertDiv("error!")
				}
			})
		});
		//买家延长收货
		$("body").on("click",".yanchangshouhuo",function(){
			var _t = $(this),
				order_id = _t.parents(".box").attr("data_order_id");
			$.ajax({
				url: host + '/index.php?app=buyer_order&act=delayship',
				type: "get",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading("正在延长收货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("延长收货成功！");
						var str = location.href.split('#')[0];
						if(str.indexOf("orderList") > 0){//列表页
							
						}else{//详情页
							location.replace(location.href+"&t="+Date.now());
						}
					} else {
						allFun.alertDiv(rs.msg);
					}
				},
				error: function() {
					allFun.removeLoading();
					allFun.alertDiv("error!")
				}
			})
		});
		//卖家提醒收货
		$("body").on("click",".tixingshouhuo",function(){
			var _t = $(this),
				order_id = _t.parents(".box").attr("data_order_id");
			$.ajax({
				url: host + '/index.php?app=seller_order&act=remindreceipt',
				type: "get",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading("正在提醒收货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("提醒收货成功！");
						/*var str = location.href.split('#')[0];
						if(str.indexOf("orderList") > 0){//列表页
							
						}else{//详情页
							location.replace(location.href+"&t="+Date.now());;
						}*/
					} else {
						allFun.alertDiv(rs.msg);
					}
				},
				error: function() {
					allFun.removeLoading();
					allFun.alertDiv("error!")
				}
			})
		});
		
		/****************  *****************/
		//买家、卖家 查看物流(待收货、待评价、已完成)
		$("body").on("click",".chakanwuliu",function(){
			var _t = $(this),obj = {},invoice_no = _t.parents(".box").attr("data_invoice_no");
			
			var str = location.href.split('#')[0];
			if(str.indexOf("orderList") > 0){//列表页
				obj.linkType = linkType;
				sessionStorage.setItem("orderListShopStorage", JSON.stringify(obj));
				history.replaceState(null,null,"?linkType="+linkType+"&type="+type+"&history=-1");
			}
			location.href = "/shop/html/my/logistics.html?invoice_no="+invoice_no;
		});
		
		//买家去评价(待评价)
		$("body").on("click",".qupingjia",function(){
			var _t = $(this),obj = {},order_id = _t.parents(".box").attr("data_order_id");
			var str = location.href.split('#')[0];
			if(str.indexOf("orderList") > 0){//列表页
				obj.linkType = linkType;
				sessionStorage.setItem("orderListShopStorage", JSON.stringify(obj));
				history.replaceState(null,null,"?linkType="+linkType+"&type="+type+"&history=-1");
			}
			location.href = "/shop/html/order/comment.html?order_id="+order_id;
		});
		
		//卖家回复评论(待评价)
		$("body").on("click",".huifupinglun",function(event){
			event.stopPropagation();
			var _t = $(this),obj = {},rec_id = _t.parents(".reply").attr("data_rec_id"),order_id = _t.parents(".box").attr("data_order_id");
			var str = location.href.split('#')[0];
			if(str.indexOf("orderList") > 0){//列表页
				obj.linkType = linkType;
				sessionStorage.setItem("orderListShopStorage", JSON.stringify(obj));
				history.replaceState(null,null,"?linkType="+linkType+"&type="+type+"&history=-1");
			}
			location.href = "/shop/html/order/sellerReply.html?order_id="+order_id+"&rec_id="+rec_id;
		});

        /**************** 退款 *****************/
        /**************** 退款 *****************/
        //买家取消退款
        $("body").on("click",".quxiaotuikuan",function(){
            if(confirm("确定取消退款吗?")){
                var _t = $(this),
                    refund_id = _t.parents(".tent").attr("data_refund_id");
                $.ajax({
                    url: host + '/index.php?app=refund&act=cancle_refund',
                    type: "post",
                    dataType: "json",
                    data:{"refund_id":refund_id},
                    beforeSend:function(){
                        allFun.loading("正在取消退款！");
                    },
                    success: function(rs) {
                        allFun.removeLoading();
                        if(rs.code == 0) {
                            location.href = "/shop/html/order/refundDetails.html?refund_id="+refund_id+"&type=0";
                            var str = location.href.split('#')[0];
                            if(str.indexOf("orderList") > 0){//列表页
                                _t.parents(".box").find("h2 em").html("退款关闭");
                                _t.parents(".dOperate").remove();
                            }
                        } else {
                            allFun.alertDiv(rs.msg);
                        }
                    },
                    error: function() {
                        allFun.removeLoading();
                        allFun.alertDiv("error!")
                    }
                })
            }
        });
        //买家申请退款 和买家重新申请
        $("body").on("click",".chongxinshenqing,.agreeapply,.b-agreeapply,.shenqingtuikuan",function(event){
                event.stopPropagation();
                var _t = $(this),rec_id = _t.parents(".tent").attr("data_rec_id"),order_id = _t.parents(".tent").attr("data_order_id");
                location.href = "/shop/html/order/refundApplication.html?order_id="+order_id+"&rec_id="+rec_id+"&type=0";
            }
        );
        //买家去退货
        $("body").on("click",".qutuihuo",function(){
            var _t = $(this),
                refund_id = _t.parents(".tent").attr("data_refund_id");
            location.href = "/shop/html/order/returnedGoods.html?refund_id="+refund_id+"&type=0";
        });
        //查看钱的去向
        $("body").on("click",".qiandequxiang,.qianquxiang",function(){
                var id = allFun.getRequest("id");
                var _t = $(this), id = _t.parents(".tent").attr("data_streamid");
                location.href = hostPm+"/yjpai/platform/myPurse/historydDetail.html?id="+id+"";
            }
        );
        //买家退款中
        $("body").on("click",".tuikuanzhong",function(event){
                event.stopPropagation();
                var _t = $(this),
                    refund_id = _t.parents(".refund").attr("data_refund_id");
                location.href = "/shop/html/order/refundDetails.html?refund_id="+refund_id+"";
            }
        );

        //卖家同意退款
        $("body").on("click",".tongyituikuan,.tongyituihuo",function(){
            if(confirm("同意申请钱就会退还给买家了，真的想好了吗？")){
                var _t = $(this),
                    refund_id = _t.parents(".tent").attr("data_refund_id");
                $.ajax({
                    url: host + '/index.php? app=refund&act=do_refund&refund_id='+refund_id+'',
                    type: "get",
                    dataType: "json",
                    beforeSend: function () {
                    },
                    success: function (rs) {
                        allFun.removeLoading();
                        if (rs.code == 0) {
                            var d=rs.data;

                            location.href = "/shop/html/order/refundDetails.html?refund_id="+refund_id+"&id="+d.id+"";
                        } else {
                            allFun.alertDiv(rs.msg);
                        }
                    },
                    error: function () {
                        allFun.removeLoading();
                        allFun.alertDiv("error!")
                    }
                });
            }
        });
        //卖家同意申请
        $("body").on("click",".tongyishenqing",function(){
            if(confirm("同意申请钱就会退还给买家了，真的想好了吗？")){
                var _t = $(this),
                    refund_id = _t.parents(".tent").attr("data_refund_id");
                location.href = "/shop/html/order/refundAddAddress.html?refund_id="+refund_id+"&type=1";
            }
        });
        //卖家拒绝退款
        $("body").on("click",".jujueshenqing ,.jujuetuikuan",function(){
            $(".divTwoInfo").append("<div class='editFont'><div class='cc'><h2>请输入拒绝理由</h2><textarea id='fontContents' placeholder='请输入内容,不超过50个字'></textarea>" +
                "<div class='edit'><a href='javascript:;' class='callOff'>取消</a><a class='editFont_a' data_t='0'>确认</a></div></div><div class='bb'></div></div>");
            $("body").append("<div class='bg'></div>");
            $(".bg").show();
            //点击取消
            $("body").on("click",".callOff",function(){
                $(".bg,.editFont").remove();
            });
            var _t = $(this), refund_id = _t.parents(".tent").attr("data_refund_id");
            //点击确认
            $("body").on("click",".editFont_a",function(){
                var reason=$("#fontContents").val();
                if(reason==''){
                    allFun.alertDiv("请输入拒绝理由！")
                }
                $.ajax({
                    url: host + '/index.php?app=refund&act=refuse_apply&refund_id='+refund_id+'&reason='+reason+'',
                    type: "get",
                    dataType: "json",
                    beforeSend: function () {
                    },
                    success: function (rs) {
                        allFun.removeLoading();
                        if (rs.code == 0) {
                            location.href = "/shop/html/order/refundDetails.html?refund_id="+refund_id+"";
                        } else {
                            allFun.alertDiv(rs.msg);
                        }
                    },
                    error: function () {
                        allFun.removeLoading();
                        allFun.alertDiv("error!")
                    }
                })
            });
        });

    })
})();
