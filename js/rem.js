(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if(clientWidth > 640){
				clientWidth = 640;
			}
			docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
			
			if(window.orientation){
				if(window.orientation == 90 || window.orientation == -90){
					docEl.style.fontSize = 12 * (clientWidth / 640) + 'px';
				}
			}
			
		};
		recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	
	//viewport问题
	/*var devicePixelRatio = document.devicePixelRatio;
	if(devicePixelRatio == 2){
		document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
	}else if(devicePixelRatio == 3){
		document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
	}*/
	
	var wAlert = window.alert;
	window.alert = function(message) {
		try {
			var iframe = document.createElement("IFRAME");
			iframe.style.display = "none";
			iframe.setAttribute("src", 'data:text/plain,');
			document.documentElement.appendChild(iframe);
			var alertFrame = window.frames[0];
			var iwindow = alertFrame.window;
			if (iwindow == undefined) {
				iwindow = alertFrame.contentWindow;
			}
			iwindow.alert(message);
			iframe.parentNode.removeChild(iframe);
		} catch (exc) {
			return wAlert(message);
		}
	}
	var wConfirm = window.confirm;
	window.confirm = function(message) {
		try {
			var iframe = document.createElement("IFRAME");
			iframe.style.display = "none";
			iframe.setAttribute("src", 'data:text/plain,');
			document.documentElement.appendChild(iframe);
			var alertFrame = window.frames[0];
			var iwindow = alertFrame.window;
			if (iwindow == undefined) {
				iwindow = alertFrame.contentWindow;
			}
			var rr = iwindow.confirm(message);
			iframe.parentNode.removeChild(iframe);
			return rr;
		} catch (exc) {
			return wConfirm(message);
		}
	}
	
})(document, window);