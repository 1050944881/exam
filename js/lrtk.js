//设置移动事件函数myEvent
function myEvent(obj, ev, fu){//形参为对象，变量ev 和内置函数
	//三元表达式判断兼容性
	obj.attachEvent ? obj.attachEvent('on' + ev, fu) : obj.addEventListener(ev, fu, false);
}
//预加载函数
window.onload = function(){
	var oBox = document.getElementById('ztbox');//获取最外层盒子
	var oLeft = document.getElementById('left');//获取左边焦点
	var oRight = document.getElementById('right');//获取右边焦点
	var oConter = document.getElementById('conter');//获取内置盒子
	var oUl = oConter.getElementsByTagName('ul')[0];//获取ul中第一个子元素
	var oLi = oConter.getElementsByTagName('li');//获取所有的li元素
	var oScroll = document.getElementById('scroll');//获取滚动条
	var oSpan = oScroll.getElementsByTagName('span')[0];//获取滚动条上的焦点

	var i = 0;//设置变量i
	oUl.style.width = 1250 +'px'; //设置ul中第一个子元素
	//var iWidth = oScroll.offsetWidth/(oUl.offsetWidth / oConter.offsetWidth - 1)
	var iWidth=416;//给定宽度
	oLeft.onmouseover = oRight.onmouseover = function(){//注册左右焦点的点击事件
		this.className = 'hover';//当前元素添加属性
		//点击左侧按钮
		oLeft.onclick = function(){//点击左侧按钮
			var butscroll = oSpan.offsetLeft - iWidth;//设置滚动图片的宽度
			oscroll(butscroll);//滚动调用指定距离的函数
		};
		//点击右侧按钮
		oRight.onclick = function(){//右焦点的点击事件
			var butscroll = oSpan.offsetLeft + iWidth;//设置滚动图片的宽度
			oscroll(butscroll);//滚动调用指定距离的函数
		};
	};
	//点击滚动条
	oScroll.onclick = function(e){
		var oEvent = e || event;// 声明变量默认值
		var butscroll = oEvent.clientX - oBox.offsetLeft - 53 - oSpan.offsetWidth / 2;//滚动条的宽度
		oscroll(butscroll);//滚动调用指定距离的函数
	};
	oSpan.onclick = function(e){//小焦点的点击事件
		var oEvent = e || event;// 声明变量默认值
		oEvent.cancelBubble=true;//冒泡事件的处理
	}
	oLeft.onmouseout = oRight.onmouseout = function(){//注册左右焦点离开事件
		this.className = '';//清除原来点击时的样式
	};
	//拖拽滚动条
	var iX = 0;
	oSpan.onmousedown = function(e){//小焦点的鼠标落下事件
		var oEvent = e || event;//初始化
		iX = oEvent.clientX - oSpan.offsetLeft;//设置小焦点移动过程中的宽度
		document.onmousemove = function(e){//注册鼠标移动事件
			var oEvent = e || event;//初始化并赋值
			var l = oEvent.clientX - iX;//设置实际移动的距离
			td(l);//显示效果
			return false;//阻止冒泡
		};
		document.onmouseup = function(){//鼠标松开事件
			document.onmousemove = null;//清理鼠标移动
			document.onmouseup = null;//清除鼠标松开后的值
		};
		return false;//阻止冒泡
	};
	//滚轮事件
	function fuScroll(e){
		var oEvent = e || event;//初始化设置默认值
		var l = oSpan.offsetLeft;//设置变量接收小焦点的距离左侧的距离
		oEvent.wheelDelta ? (oEvent.wheelDelta > 0 ? l-=iWidth : l+=iWidth) : (oEvent.detail ? l+=iWidth : l-=iWidth);//判断小焦点的位置
		oscroll(l)//显示效果
		if(oEvent.PreventDefault){//判断oEvent事件是否成立
			oEvent.PreventDefault();//如果成立执行先前函数
		}
	}
	myEvent(oConter, 'mousewheel', fuScroll);//鼠标滚轮函数
	myEvent(oConter, 'DOMMouseScroll', fuScroll);//小焦点移动事件
	//滚动事件
	function oscroll(l){//封装移动函数
		if(l < 0){//判断移动位置到顶部
			l = 0;//重新回到原来位置
		}else if(l > oScroll.offsetWidth - oSpan.offsetWidth){//否则应用图片移动出去的宽度减去小焦点的宽度
			l = oScroll.offsetWidth - oSpan.offsetWidth;//重新赋值
		}
		var scrol = l / (oScroll.offsetWidth - oSpan.offsetWidth);//设置移动时的距离
		sMove(oSpan, 'left', Math.ceil(l));//移动到左边距离
		sMove(oUl, 'left', '-'+Math.ceil((oUl.offsetWidth - (oConter.offsetWidth + 15)) * scrol));//计算滚动距离
	}

	function td(l){//设置td事件函数
		if(l < 0){//先判断长度是否小于0
			l = 0;//如果小于0了 需要重新赋值为0
		}else if(l > oScroll.offsetWidth - oSpan.offsetWidth){//如果长度不是0并且符合移动宽度
			l = oScroll.offsetWidth - oSpan.offsetWidth;//重新计算滚动小焦点的距离
		}
		var scrol = l / (oScroll.offsetWidth - oSpan.offsetWidth);//重新计算滚动小焦点的距离
		oSpan.style.left = l+'px';//设置小焦点左距离
		oUl.style.left = '-'+(oUl.offsetWidth - (oConter.offsetWidth + 15)) * scrol +'px';//外盒子的左距离
	}
};
//运动框架
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];//
}
function sMove(obj, attr, iT, onEnd){//
	clearInterval(obj.timer);//
	obj.timer = setInterval(function(){//
		dMove(obj, attr, iT, onEnd);//
	},30);
}
function dMove(obj, attr, iT, onEnd){//
	var iCur = 0;
	//判断移动对象的透明度值
	attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, attr)*100)) : iCur = parseInt(getStyle(obj, attr));//
	var iS = (iT - iCur) / 5;//设置新变量
	iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);//取整
	if(iCur == iT){//如果满足条件的话
		clearInterval(obj.timer);//需要清理原来的定时器
		if(onEnd){//如果存在
			onEnd();//就执行
		}
	}else{//不存在
		if(attr == 'opacity'){//不存在需要重新判断
			obj.style.ficter = 'alpha(opacity:'+(iCur + iS)+')';//新目标的样式设置
			obj.style.opacity = (iCur + iS) / 100;//透明度设置
		}else{
			obj.style[attr] = iCur + iS +'px';//不成立直接使用原来的值
		}
	}
}
