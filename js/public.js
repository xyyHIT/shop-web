var host = hostPm = "http://"+location.host;

(function() {
	$(function() {
		$.ajax({
			url: host + '/yjpai/jssdk/wx/getJsConfig',
			type: "get",
			data: {
				'url': encodeURIComponent(window.location.href.split('#')[0])
			},
			dataType: "json",
			error: function() {
				allFun.alertDiv("网络异常，加载微信配置失败！");
			},
			success: function(rs) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: rs.data.appId, // 必填，公众号的唯一标识
					timestamp: rs.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: rs.data.nonceStr, // 必填，生成签名的随机串
					signature: rs.data.signature, // 必填，签名，见附录1
					jsApiList: [
						'hideAllNonBaseMenuItem',
						'showAllNonBaseMenuItem',
						'scanQRCode',
						'chooseImage',
						'previewImage',
						'uploadImage',
						'onMenuShareAppMessage',
						'onMenuShareTimeline',
						'onMenuShareQQ',
						'chooseWXPay',
						'openAddress'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			}
		});
		wx.ready(function(){
			wx.hideAllNonBaseMenuItem();
		});
		//添加底部导航
		allFun.publicIcon();
	});
})();

var allFun = {
	//获取地址栏参数
	getRequest: function (name) {
		var url = window.location.search;
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
		}
		return theRequest[name];
	},
	//上传图片提示(正在加载)
	uploadImgPrompt: function (n1, n2) {
		if ($(".load_upload").length <= 0) {
			$("body").append("<div class='load_upload'><div class='com-loading' style='margin-right:9px;'><div style='border: 1px solid #fff;border-bottom-color: transparent;'></div></div>正在上传...<br /><span>" + n1 + " / " + n2 + "</span></div>");
		} else {
			$(".load_upload span").html(n1 + " / " + n2);
		}
	},
	//移除图片提示(正在加载)
	removeUploadImgPrompt: function () {
		$(".load_upload").remove();
	},
	//加载中
	loading: function (msg) {
		if (!msg) {
			msg = "拼命加载中...";
		}
		if ($(".loading").length > 0) {
			$(".loading span").html(msg);
		} else {
			$("body").append("<div class='loading'><div class='com-loading'><div style=' border: 1px solid #fff;border-bottom-color: transparent;'></div></div><br /><span>" + msg + "</span></div>");
		}
	},
	//加载中(提交的时候用，避免重复提交)
	loadingPost: function (msg) {
		if (!msg) {
			msg = "拼命加载中...";
		}
		if ($(".loading").length > 0) {
			$(".loading span").html(msg);
		} else {
			$("body").append("<div class='loading_post'><div><div class='com-loading'><div style=' border: 1px solid #fff;border-bottom-color: transparent;'></div></div><br /><span>" + msg + "</span></div></div>");
		}
	},
	//移除加载中
	removeLoading: function () {
		$(".loading,.loading_post").remove();
	},
	//弹出提示层
	alertDiv: function (msg) {
		$(".alertDiv").remove();
		$("body").append("<div class='alertDiv'><div>" + msg + "</div></div>");
		$(".alertDiv").fadeIn().css("opacity", "1");
		setTimeout(function () {
			$(".alertDiv").css("opacity", "0").fadeOut()
		}, 2000);
	},
	//从底部往上移出
	fromBottomToTop: function (c) {//c:class
		$(".bg").fadeIn('fast');
		$(c).fadeIn('fast').css("-webkit-transform", "translate(0,0)");
	},
	//从上移到底部
	fromTopToBottom: function (c) {
		$(c).css("-webkit-transform", "translate(0,100%)").fadeOut();
		$(".bg").fadeOut();
	},
	//分转元
	centToDollar: function (money) {
		return parseInt(money) / 100;
	},
	//元转分
	dollarToCent: function (money) {
		return parseInt(money) * 100;
	},
	expressCompany: function (code) {
		if (code == "SF") {
			return "顺丰快递"
		}
		if (code == "STO") {
			return "申通快递"
		}
		if (code == "YTO") {
			return "圆通速递"
		}
		if (code == "ZTO") {
			return "中通速递"
		}
		if (code == "HTKY") {
			return "百世汇通"
		}
		if (code == "YD") {
			return "韵达快递"
		}
		if (code == "EMS") {
			return "EMS"
		}
	},
	noDataImg: function (msg) {
		if(!msg){
			msg = "暂时没有数据！";
		}
		return "<div class='nonePageImg'><i class='iconfont icon-kongyemian'></i>" + msg + "</div>";
	},
	showAllNonBaseMenuItem: function () {
		wx.ready(function () {
			wx.showAllNonBaseMenuItem();
		})
	},
	timeNoYear: function (y) {
		var yy = y.substring(5).replace("-", ".");
		return yy;
	},
	timeNoYearNoSecond: function (y) {//去掉年和秒
		var yy = y.substring(5);
		yy = yy.substring(0, yy.length - 3);
		return yy;
	},
    getLocalTime:function(nS) {//1177824835把时间戳转换成日期格式2010-2-23
        function add0(m) { return m < 10 ? '0' + m : m }
        //nS，否则要parseInt转换
        var time = new Date(parseInt(nS)*1000);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d);
    },
    getTime:function(nS) {//1177824835把时间戳转换成日期格式2010-2-23 13:13:22
        function add0(m) { return m < 10 ? '0' + m : m }
        //nS，否则要parseInt转换
        var time = new Date(parseInt(nS)*1000);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    },
	gzewm: function () {
		if ($(".gzewm").length <= 0) {
			$("body").append("<div class='gzewm animated bounceInDown'><img src='/shop/imgs/test/erweima.jpg' /><div>~长按二维码关注我们~<span>Wuli小艺关注后就能接收消息提醒哦！ </span></div></div>");
		}
		if ($(".bg1").length <= 0) {
			$("body").append("<div class='bg1 animated fadeIn' onclick=$('.gzewm,.bg1').hide()></div>");
		}
		$(".gzewm,.bg1").show();
	},
	share: function (hTitle, hDesc, hLink, imgUrl) {
		wx.ready(function () {
			//分享给朋友
			wx.showAllNonBaseMenuItem();
			wx.onMenuShareAppMessage({
				title: hTitle, // 分享标题
				desc: hDesc, // 分享描述
				link: hLink, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			//分享到朋友圈
			wx.onMenuShareTimeline({
				title: hTitle, // 分享标题
				desc: hDesc, // 分享描述
				link: hLink, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			//分享到qq
			wx.onMenuShareQQ({
				title: hTitle, // 分享标题
				desc: hDesc, // 分享描述
				link: hLink, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			//分享到qq空间
			wx.onMenuShareQZone({
				title: hTitle, // 分享标题
				desc: hDesc, // 分享描述
				link: hLink, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
		});
	},
	//icon给当前图片加on
	publicIcon: function () {
		$("body").append("<div class='footer footerInit footerDay'>"
		+ "<a href='/shop/html/index/index.html?from=wechat'><i></i>首页</a>"
		+ "<a href='/shop/html/category/category.html'><i></i>分类</a>"
		+ "<a href='/shop/html/cart/cart.html' class='cartNum'><i></i>购物袋</a>"
		+ "<a href='/shop/html/my/myBuyer.html'><i></i>我的</a>"
		+ "</div>");
		$(".footerInit a:nth-child(1) i").attr("class","iconfont icon-shouye");
		$(".footerInit a:nth-child(2) i").attr("class","iconfont icon-fenlei1");
		$(".footerInit a:nth-child(3) i").attr("class","iconfont icon-gouwudai1");
		$(".footerInit a:nth-child(4) i").attr("class","iconfont icon-wode");
		$(".footerInit a:nth-child(5) i").attr("class","iconfont icon-dibudaohangwodeoff");
		
		var publicNavUrl = window.location.href.split('#')[0];
		// 用数组存关键词
		var publicNavKeywords = ["/index/", "/category/", "/cart/", "/my/", "/order/"];
		// 创建正则
		var publicNavReg = new RegExp(publicNavKeywords.join('|'));
		// 如果想知道匹配到哪个，那么用match
		var publicNavResult = publicNavUrl.match(publicNavReg);
		if (publicNavResult) {
			// 如果匹配到，publicNavResult是数组
			switch (publicNavResult[0]) {
				case "/index/":
					$(".footer a").eq(0).addClass("on");
					break;
				case "/category/":
					$(".footer a").eq(1).addClass("on");
					break;
				case "/cart/":
					$(".footer a").eq(2).addClass("on");
					break;
				case "/my/":
					$(".footer a").eq(3).addClass("on");
					break;
				case "/order/":
					$(".footer a").eq(3).addClass("on");
					break;
			}
		}
		//底部统计购物袋的产品数量
		$.ajax({
            url: host + '/index.php?app=cart&act=ejCount',
            type: "get",
            success: function (rs) {
                if (rs.code == 0) {
                	if(rs.data.count > 0){
                		$(".footer a.cartNum i").append("<em>"+rs.data.count+"</em>");
                		$(".detailFooter .icon-gouwudai1").html('<em class="r-red">'+rs.data.count+'</em>');
                	}
                }
            }
        });
	},
    //关注和喜欢
    attention:function (type,status,t) {// type=store 商品 type=goods  //status: add-关注 drop-取消关注
	    $.ajax({
	        url: host + '/index.php?app=my_favorite&act='+status+'&type='+type+'&item_id='+item_id+'',
	        type: "get",
	        beforeSend: function () {
	        },
	        success: function (rs) {
	            if (rs.code == 0) {
	            	var num=parseInt($("#likeCount").html());
		            if(type=="store"){
		                if(status == "drop"){//取消关注
                            $(".more em").addClass("on");
                            $(".faxian2 em").addClass("on");
		                    t.html("+关注");
		                    t.attr("dataStatus","add");
		                }else{
                            $(".more em").removeClass("on");
                            $(".faxian2 em").removeClass("on");
		                    t.html("已关注");
                            t.attr("dataStatus","drop");
		                }
		            }else if(type=="goods"){
		                if(status == "drop") {
		                    t.removeClass("grey");
		                    t.attr("dataStatus","add");
		                    $("#likeCount").html(num-1);
		                }
		                else{
		                    t.addClass("grey");
		                    t.attr("dataStatus","drop");
		                    $("#likeCount").html(num+1);
		                }
		            }
	            }else if (rs.code == 3005) {//未登录
	                /*$.ajax({
		                url: host + '/index.php?app=wechat&act=redirectBusiness',
		                type: "get",
		                data:{"url":encodeURIComponent(location.href.split('#')[0])},
		                success: function (rs) {
		                    
		                }
		            })*/
                    if(type=="store"){
                        location.href = host + '/index.php?app=wechat&act=redirectBusiness&url='+encodeURIComponent(location.href.split('#')[0]+"&addStore=addStore");
					}else if(type=="goods"){
                        location.href = host + '/index.php?app=wechat&act=redirectBusiness&url='+encodeURIComponent(location.href.split('#')[0]+"&addGoods=addGoods");
                    }
	            }else{
	            	allFun.alertDiv(rs.msg);
	                return false;
	            }
	        },
	        error: function() {
	            allFun.removeLoading();
	            allFun.alertDiv("error!")
	        }
	    });
	},
    //打开二维码
    openQrcode:function(id){//id：id
        $("body").on('click',"#openQrcode",function(){
            allFun.loading("正在生成二维码");
            $.ajax({
                url:  host + '/index.php?app=goods&act=ejQRCode&id='+id+'',
                type: "get",
                dataType: "json",
                success: function(rs) {
                    allFun.removeLoading();
                    if (rs.code == 0) {
                        var erweimaimgList = [];
                        erweimaimgList.push(rs.data.img);
                        wx.ready(function() {
                            wx.previewImage({
                                current: erweimaimgList[0], // 当前显示图片的http链接
                                urls: erweimaimgList // 需要预览的图片http链接列表
                            });
                        })
                    } else {
                        allFun.alertDiv(rs.msg);
                    }
                }
            });
        })
    },
	//格式化金额
	fmoney: function(s, n) {
	    n = n > 0 && n <= 20 ? n : 2;  
	    f = s < 0 ? "-" : ""; //判断是否为负数
	    s = parseFloat((Math.abs(s) + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//取绝对值处理, 更改这里n数也可确定要保留的小数位
	    var l = s.split(".")[0].split("").reverse(),  
	    r = s.split(".")[1];  
	    t = "";  
	    for(i = 0; i < l.length; i++ ) {  
	       t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	    }  
	    return f + t.split("").reverse().join("") + "." + r.substring(0,2);//保留2位小数  如果要改动 把substring 最后一位数改动就可
	}  
};
