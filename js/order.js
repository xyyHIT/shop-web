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
						/*_t.parents(".box").find("h2 em").html("交易取消");
						_t.parents(".dOperate").remove();*/
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
			location.href = "/shop/html/cart/cashierDesk.html?orderId="+order_id;
		})
		
		/**************** 待发货 *****************/
		//买家提醒发货
		$("body").on("click",".tixingfahuo",function(){
			var _t = $(this),
				order_id = _t.parents(".box").attr("data_order_id");
			$.ajax({
				url: host + '',
				type: "post",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading();
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("提醒发货成功！");
						/*_t.parents(".box").find("h2 em").html("交易取消");
						_t.parents(".dOperate").remove();*/
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
				type: "post",
				dataType: "json",
				data:{"order_id":order_id,"invoice_no":invoice_no},
				beforeSend:function(){
					allFun.loading();
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						/*_t.parents(".box").find("h2 em").html("交易取消");
						_t.parents(".dOperate").remove();*/
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
			$(".dScanCode").remove();
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
				type: "post",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading("正在确认收货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("确认收货成功！")
						/*_t.parents(".box").find("h2 em").html("交易取消");
						_t.parents(".dOperate").remove();*/
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
				type: "post",
				dataType: "json",
				data:{"order_id":order_id},
				beforeSend:function(){
					allFun.loading("正在延长收货！");
				},
				success: function(rs) {
					allFun.removeLoading();
					if(rs.code == 0) {
						allFun.alertDiv("延长收货成功！")
						/*_t.parents(".box").find("h2 em").html("交易取消");
						_t.parents(".dOperate").remove();*/
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
				order_id = _t.parents(".box").attr("data_order_id");
			
		})
	})
})();
