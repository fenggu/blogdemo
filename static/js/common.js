function GetQueryString(name) { // 获取URL的指定元素方法
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
			// var back = function() {
		 //        var ua = window.navigator.userAgent;
		 //        if (ua.indexOf('Android') > -1) {
		 //          window.shareHelper.back();
		 //        } else if (ua.indexOf('iPhone') > -1) {
		 //          if (ua.match(/OS [8]_\d[_\d]* like Mac OS X/i)) { //判断是否IOS8 使用HASH传参
		 //            window.location.hash = 'ios://GoToback:_';
		 //          } else {
		 //            window.location.href = 'ios://GoToback:_';
		 //          }
		 //        } 
		 //    }

			
			function isIos() {
			  var ua = navigator.userAgent.toLowerCase();  
			  if(/iphone|ipad|ipod/.test(ua)) {
			    console.log("iphone");
			    $("header").css("height","6rem");
			    $("header").css("line-height","7rem");
			    $("header img").css({
			      "top":"2.7rem"
			    }) 
			  }
			}
				// var tochat= function(uid,huodongId,type) {
				// 	var ua = window.navigator.userAgent;
				// 	if (ua.indexOf('Android') > -1) {
				// 		window.shareHelper.gotoChatTalk(uid, huodongId, type)
				// 	} else if (ua.indexOf('iPhone') > -1) {
				// 		console.log("chengg");
				// 		if (ua.match(/OS [8]_\d[_\d]* like Mac OS X/i)) { //判断是否IOS8 使用HASH传参
				// 			window.location.hash = 'ios://gotoPayViewFromH5With:_'+uid+"_"+huodongId+"_"+type
				// 		} else {
				// 			window.location.href = 'ios://gotoPayViewFromH5With:_'+uid+"_"+huodongId+"_"+type
				// 		}
				// 	}
				// }	

// function share(uid,id){
// 	$(document).ready(function(){
// 		link = "http://120.26.92.27:8080/index?uid="+uid+"&pid="+id;//分享链接
// 		str = "测试丨你为何郁郁寡欢";//分享内容
// 		linkPic = "http://cache-img1.51songguo.com/images/wap/qixi/fenxiang.png"//缩略图
// 		title = "测试丨你为何郁郁寡欢"//标题
// 		var ua = window.navigator.userAgent;
// 		if (ua.indexOf('Android') > -1){
// 			window.shareHelper.share(str,linkPic,title,link);
// 		}else if (ua.indexOf('iPhone') > -1){ 
// 				var iosStr = 'ios://shareAction:_'+EncodeUtf8(str)+":_"+EncodeUtf8(linkPic)+":_"+EncodeUtf8(title)+":_"+EncodeUtf8(link);
// 		          window.webkit.messageHandlers.iosReturnFromJS.postMessage(iosStr);
//         }else {
// 			alert('本活动仅支持移动设备参与');
// 		}
// 	});
// // } 
// function EncodeUtf8(s1)
// {
//     // escape函数用于对除英文字母外的字符进行编码。如“Visit W3School!”->"Visit%20W3School%21"
//     var s = escape(s1);
//     var sa = s.split("%");//sa[1]=u6211
//     var retV ="";
//     if(sa[0] != "")
//     {
//         retV = sa[0];
//     }
//     for(var i = 1; i < sa.length; i ++)
//     {
//         if(sa[i].substring(0,1) == "u")
//         {
//             retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
//             if(sa[i].length>=6)
//             {
//                 retV += sa[i].substring(5);
//             }
//         }
//         else retV += "%" + sa[i];
//     }
//     return retV;
// }
// function Str2Hex(s)
// {
//     var c = "";
//     var n;
//     var ss = "0123456789ABCDEF";
//     var digS = "";
//     for(var i = 0; i < s.length; i ++)
//     {
//         c = s.charAt(i);
//         n = ss.indexOf(c);
//         digS += Dec2Dig(eval(n));
        
//     }
//     //return value;
//     return digS;
// }
// function Dec2Dig(n1)
// {
//     var s = "";
//     var n2 = 0;
//     for(var i = 0; i < 4; i++)
//     {
//         n2 = Math.pow(2,3 - i);
//         if(n1 >= n2)
//         {
//             s += '1';
//             n1 = n1 - n2;
//         }
//         else
//         s += '0';
        
//     }
//     return s;
    
// }
// function Dig2Dec(s)
// {
//     var retV = 0;
//     if(s.length == 4)
//     {
//         for(var i = 0; i < 4; i ++)
//         {
//             retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
//         }
//         return retV;
//     }
//     return -1;
// }
// function Hex2Utf8(s)
// {
//     var retS = "";
//     var tempS = "";
//     var ss = "";
//     if(s.length == 16)
//     {
//         tempS = "1110" + s.substring(0, 4);
//         tempS += "10" +  s.substring(4, 10);
//         tempS += "10" + s.substring(10,16); 
//         var sss = "0123456789ABCDEF"; 
//         for(var i = 0; i < 3; i ++) 
//         { 
//             retS += "%"; 
//             ss = tempS.substring(i * 8, (eval(i)+1)*8); 
            
            
            
//             retS += sss.charAt(Dig2Dec(ss.substring(0,4))); 
//             retS += sss.charAt(Dig2Dec(ss.substring(4,8))); 
//         } 
//         return retS; 
//     } 
//     return ""; 
// }

