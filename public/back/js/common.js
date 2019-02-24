//进度条
//在第一个ajax发送出去时,开启进度条
//在全部的ajax回来以后结束结束进度条

$(document).ajaxStart(function(){
    //开启进度条
    NProgress.start();
})

$(document).ajaxStop(function(){
   //结束进度条
  // 模拟网络延迟,开启定时器
   setTimeout( function(){
    NPogress.done();
   }, 500)
 
})
