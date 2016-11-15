var data_i = 0,
	data_password = "",//输入的完整密码
	data_password1 = "",//原密码
	data_password2 = "",//设置第一次密码
	data_password3 = "",//设置第二次密码
	data_num = 1,//输入密码次数
	data_type = "";
	data_type2 = "";
var fun = function(){
	
}
function funKeybord(data_typ,data_typ2,fu){//data_typ 1:验证输入一次密码   2：设置输入两次密码   3：重设密码验证原密码再输入两次密码     data_typ2 1:重设密码 0:验证、设置密码
	data_i = 0;
	data_password = "";//输入的完整密码
	data_password1 = "";//原密码
	data_password2 = "";//设置第一次密码
	data_password3 = "";//设置第二次密码
	data_num = 1;//输入密码次数
	
	data_type = data_typ;
	data_type2 = data_typ2;
	fun = fu;
	if($(".bg").length <= 0){
		$("body").append("<div class='bg'></div>");
	}
	$(".bg").show();
	$(".keybordpw").remove();
	$("body").append("<div class='keybordpw'><h6><span>请输入交易密码</span><i class='iconfont icon-chahao'></i></h6><div class='keybord_t'><ul class='keybord_value fix'><li></li><li></li><li></li><li></li><li></li><li></li></ul></div><div class='keybord_d'><div class='keybord_list'><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><em class='keybord_cancel'>取消</em><span>0</span><em class='keybord_back'><i>0</i></em></div></div></div>");
	if(data_type2 == 1){
		$(".keybordpw h6 span").html("请输入交易密码，以验证身份");
	}else{
		if(data_type2 == 2){//重设密码
			$(".keybordpw h6 span").html("请输入新的交易密码");
		}else{
			$(".keybordpw h6 span").html("请输入交易密码");
		}
	}
}
$("body").on("click",".keybord_list span",function(){//赋值
	if(data_i < 6){
		if($(".keybord_value li").eq(data_i).html() == ""){
			$(".keybord_value li").eq(data_i).html("<i class='iconfont icon-dian'></i>");
			data_password = data_password+$(this).html();
			data_i++;
			if(data_i == 6){//输入完密码执行事件
				setTimeout(function(){
					if(data_type == 1){//验证密码
						data_password1 = data_password;
						fun(md5(data_password1));
						//$(".keybordpw").remove();
						data_i = 0,
						data_num = 1,//输入密码次数
						data_password = "";//输入的完整密码
						$(".keybord_value li").html("");
						
					}else if(data_type == 2){//设置密码
						if(data_num == 1){
							data_password2 = data_password;
							data_i = 0;
							$(".keybord_value li").html("");
							data_num = 2;
							data_password = "";
							$(".keybordpw h6 span").html("请再次输入交易密码");
							return false;
						}else if(data_num == 2){
							data_password3 = data_password;
							if(data_password2 == data_password3){//判断两次密码是否一样
								//返回密码数值
								fun(md5(data_password3));
								
								$(".keybordpw").remove();
								$(".bg").hide();
								data_i = 0,
								data_num = 1,//输入密码次数
								data_password = "";//输入的完整密码
							}else{
								data_i = 0;
								data_num = 1;
								data_password = "";
								$(".keybord_value li").html("");
								$(".keybordpw h6 span").html("请输入交易密码");
								allFun.alertDiv("密码不一致请重新输入");
							}
						}
					}
				},100)
			}
		}
	}
})
$("body").on("click",".keybord_back",function(){//删除
	if($(".keybord_value li").eq(data_i-1).html() != ""){
		$(".keybord_value li").eq(data_i-1).html("");
		data_password = data_password.substring(0,data_password.length-1);
		$(".keybord_value").attr("data_password",data_password);
		data_i--;
	}
})
$("body").on("click",".bg,.keybord_cancel,.keybordpw h6 i",function(){//取消
	$(".keybordpw").remove();
	$(".bg").hide();
})