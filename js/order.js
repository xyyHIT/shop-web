(function() {
	$(function() {
		/**************** 待付款 *****************/
		//买家取消订单
		$("body").on("click",".quxiaodingdan",function(){
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
						if(str.indexOf("orderList.html") > 0){//列表页
							_t.parents(".box").find("h2 em").html("交易关闭");
							_t.parents(".dOperate").remove();
						}else{//详情页
							location.reload();
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
		})
		//买家去付款
		$("body").on("click",".qufukuan",function(){
			var order_id = $(this).parents(".box").attr("data_order_id");
			location.href = "/shop/html/cart/cashierDesk.html?orderId="+order_id+"&type=0";
		})
		
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
		})
		//卖家去发货
		$("body").on("click",".qufahuo",function(){
			$(this).parents(".box").append("<div class='dScanCode'><div class='cc'><h2><i class='iconfont icon-123'></i></h2><p><label>运单号</label><input placeholder='请输入货单号' /><i class='iconfont icon-erweima'></i></p><a>确认</a></div><div class='bb'></div></div>")	
		})
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
						if(str.indexOf("orderList.html") > 0){//列表页
							_t.parents(".box").find("h2 em").html("卖家已发货");
							_t.parents(".box").find(".dOperate").html("<a class='chakanwuliu'>查看物流</a>");
							_t.parents(".box").attr("data_invoice_no",invoice_no);
							$(".dScanCode").remove();
						}else{//详情页
							location.reload();
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
		})
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
		})
		//关闭二维码框
		$("body").on("click",".dScanCode .bb,.dScanCode h2 i",function(){
			$(".dScanCode").remove();
		})
		
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
						allFun.alertDiv("确认收货成功！")
						var str = location.href.split('#')[0];
						if(str.indexOf("orderList.html") > 0){//列表页
							_t.parents(".box").find("h2 em").html("交易完成");
							_t.parents(".dOperate").html("<a class='chakanwuliu'>查看物流</a>");
						}else{//详情页
							location.reload();
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
		})
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
						allFun.alertDiv("延长收货成功！")
						var str = location.href.split('#')[0];
						if(str.indexOf("orderList.html") > 0){//列表页
							/*_t.parents(".box").find("h2 em").html("交易完成");
							_t.parents(".dOperate").html("<a class='chakanwuliu'>查看物流</a>");*/
						}else{//详情页
							location.reload();
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
		})
		
		/****************  *****************/
		//买家、卖家 查看物流(待收货、已完成)
		$("body").on("click",".chakanwuliu",function(){
			var _t = $(this),
				invoice_no = _t.parents(".box").attr("data_invoice_no");
			location.href = "/shop/html/my/logistics.html?invoice_no="+invoice_no;
		})
	})
})();
