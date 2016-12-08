var phoneVerify = {
	start:function(){
		if($("#yanzhengBox").length > 0){
			$("#yanzhengMask").fadeIn('fast');
			$("#yanzhengBox").fadeIn('fast').css("-webkit-transform", "translate(0,0)");
		}else{
			$("body").append(maskDiv+yanzhengBox)//验证码方法
			$("#yanzhengMask").fadeIn('fast');
			$("#yanzhengBox").fadeIn('fast').css("-webkit-transform", "translate(0,0)");
		}
	},
	close:function(){
		$("#yanzhengBox").css("-webkit-transform", "translate(0,100%)").fadeOut();
		$("#yanzhengMask").fadeOut();
	}
}	
var yanzhengBox="",maskDiv="";wait = 60;
yanzhengBox='<div id="yanzhengBox" style="display:none;position: fixed;left: 0;bottom: 0; width: 100%; padding-bottom:2rem;background: #fff; z-index: 9999; -webkit-transform: translate(0,100%); -webkit-transition: all .3s; -webkit-transition-timing-function: ease; font-size: 1.3rem;">'
				+'<h5 style="position: relative; height: 4.5rem; line-height: 4.5rem; border-bottom: 1px solid #EFEFEF;">'
					+'<i class="iconfont icon-123" style="position: absolute; right: 1rem; font-size: 1.8rem;color:#979797;" id="closeButton"></i></h5>'
					+'<div style="position: relative; height: 4.5rem; padding: 0 1.5rem; line-height: 4.5rem; border-bottom: 1px solid #EFEFEF;">'
						+'<span>手机号：</span>'
						+'<input type="tel" id="phoneNumber" placeholder="请输入手机号" maxlength="11" style="width: 68%; height: 3rem; font-size: 1.3rem; color: #878787; line-height: 3rem; border: none;">'
						+'<input id="getyanzhengma" value="获取验证码" readonly="readonly" style="position: absolute; right: 1.5rem; top: 1.1rem; display: inline-block; width: 8rem; height: auto; line-height: 1.3rem; padding: .35rem 0; font-size: 1.25rem; color: #5F5F5F; text-align: center; border: 1px solid #828282; border-radius: 2px; background: #fff;">'
					+'</div>'
					+'<div style="position: relative; height: 4.5rem; padding: 0 1.5rem; line-height: 4.5rem; border-bottom: 1px solid #EFEFEF;">'
						+'<span>验证码：</span>'
						+'<input type="tel" id="phoneNumber" placeholder="请输入验证吗" maxlength="11" style="width: 68%; height: 3rem; font-size: 1.3rem; color: #878787; line-height: 3rem; border: none;">'
					+'</div>'
					+'<a id="yanzhengma_confirm" style=" display: block; width: 90%; height: 4rem; margin: 0 auto; margin-top: 9rem; line-height: 4rem; font-size: 1.8rem; color: #fff; text-align: center; background: #ec4747;">确认</a>'
				+'</div>'	;
maskDiv = '<div id="yanzhengMask" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.7;z-index:9998;"></div>';
//点击获取验证码
$("body").on("click","#getyanzhengma",function(){
	var phone = document.getElementById("phoneNumber").value;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
        allFun.alertDiv("手机号码有误");  
        return false; 
    }
	yanzhengma(this);
	//获取验证码接口
	getYanzhengma(phone);
});
$("body").on("click","#yanzhengma_confirm",function(){
	if($("#phoneNumber").val() != "" && $("#yanzhengma").val() != ""){
		var phone = document.getElementById("phoneNumber").value;
	    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
	        allFun.alertDiv("手机号码有误");  
	        return false; 
	    }
	    var code = $("#yanzhengma").val();
		//发送验证码接口
		sendYanzhengma(phone,code);
	}else if($("#phoneNumber").val() == ""){
		allFun.alertDiv("请输入手机号");
		return false;
	}else if($("#yanzhengma").val() == ""){
		allFun.alertDiv("请输入验证码");
		return false;
	}
});
	//验证码方法
function yanzhengma(o) {
	if (wait == 0) {
		o.removeAttribute("disabled");
		o.value = "获取验证码";
		wait = 60;
	} else {
		o.setAttribute("disabled", true);
		o.value = "(" + wait + "s)";
		wait--;
		if(wait < 10){
			wait = "0"+wait;
		}
		setTimeout(function() {
			yanzhengma(o)
		},1000);
	}
}
//获取验证码接口
function getYanzhengma(mobile){ 
    $.ajax({
		url: hostPm+'/yjpai/message/sms/send',
		type: "post",
		data: {"mobile":mobile},
		dataType: "json",
		success: function(rs) {
			if (rs.resCode == 1) {
			    
			} else {
				allFun.alertDiv(rs.msg);
			}
		}
	});
}
//发送验证码接口
function sendYanzhengma(mobile,code){ 
    $.ajax({
		url: hostPm+'/yjpai/message/sms/validate',
		type: "post",
		data: {"mobile":mobile,"sms_code":code},
		dataType: "json",
		beforeSend:function(){
			allFun.loading("验证中...");
		},
		success: function(rs) {
			if (rs.resCode == 1) {
				//保存手机号
				$.ajax({
					url: hostPm+'/yjpai/platform/user/saveProfile',
					type: "post",
					data:{"mobile":mobile},
					dataType: "json",
					success: function(rs) {
						allFun.removeLoading();
						if (rs.resCode == 1) {
							allFun.alertDiv("手机号验证成功");
							phoneVerify.close();
							
							var quantity=parseInt($(".r-red").html());
				            var spec_id=$('.pro-info .name').attr("spec_id");
				            cart(spec_id,quantity);
						}else{
							allFun.alertDiv(rs.msg);
						}
					}
				});
			} else {
				allFun.removeLoading()
				allFun.alertDiv(rs.msg);
				
			}
		}
	});
}
$("body").on("click","#closeButton,#yanzhengMask",function(){
	phoneVerify.close()
})
