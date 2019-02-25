//进度条
//在第一个ajax发送出去时,开启进度条
//在全部的ajax回来以后结束结束进度条

$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
})

$(document).ajaxStop(function () {
    //结束进度条
    // 模拟网络延迟,开启定时器
    setTimeout(function () {
        NProgress.done();
    }, 500)

})


// 公用的功能:
// 1. 左侧二级菜单的切换
// 2. 左侧整体菜单的切换
// 3. 公共的退出功能 


//等待dom结构加载完成之后才会执行
$(function () {
    // 1. 左侧二级菜单的切换
    $('.lt_aside .category').click(function () {
        $(this).next().stop().slideToggle();
    });

    // 2. 左侧整体菜单的切换,改变left值
    $('.lt_topbar .icon_menu').click(function () {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })
   
    // 3. 公共的退出功能
    $('.lt_topbar .icon_logout').click(function(){
        //点击退出功能,让模态框显示 
        $('#logoutModal').modal('show');
    })

    //4.点击退出按钮(ajax请求退出)
    $('#logoutBtn').click(function(){
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function( info ){
                console.log(info);    
                if(info.success){
                    location.href = 'login.html';
                }
            }
        })
    })
})