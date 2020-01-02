/**
**/
//设置启动动画效果的函数gotoTop
function gotoTop(acceleration,stime) {//有两个形参 acceleration和stime
   acceleration = acceleration || 0.1;//设置acceleration的默认值为0.1
   stime = stime || 10;//形参stime的默认值是10
    // 设置所需变量
   var x1 = 0;//变量1
   var y1 = 0;//变量2
   var x2 = 0;//变量3
   var y2 = 0;//变量4
   var x3 = 0;//变量5
   var y3 = 0;//变量6
   if (document.documentElement) {//DOM对象的HTML元素
       x1 = document.documentElement.scrollLeft || 0;//设置html元素滚动条的left的默认值并给变量1赋值
       y1 = document.documentElement.scrollTop || 0;//设置html元素滚动条的right的默认值并给变量2赋值
   }
   if (document.body) {//DOM对象的body元素
       x2 = document.body.scrollLeft || 0;//设置body元素滚动条的left的默认值并给变量3赋值
       y2 = document.body.scrollTop || 0;//设置body元素滚动条的left的默认值并给变量4赋值
   }
   var x3 = window.scrollX || 0;//把浏览器的坐标直接赋值变量5
   var y3 = window.scrollY || 0;//把浏览器的坐标直接赋值变量6
 
   // 获取浏览器窗口内所有元素的x横坐标最大值
   var x = Math.max(x1, Math.max(x2, x3));
   // 获取浏览器窗口内所有元素的y纵坐标最大值
   var y = Math.max(y1, Math.max(y2, y3));
 
   // 设置移动速度
   var speeding = 1 + acceleration;
   //返回小于或等于一个坐标的最大整数
   window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
 
   // 判断如果横坐标或纵坐标为0的情况
   if(x > 0 || y > 0) {
       // 如果条件成立先获取acceleration和stime的值
       var run = "gotoTop(" + acceleration + ", " + stime + ")";
       window.setTimeout(run, stime);//启用定时器
   }
}