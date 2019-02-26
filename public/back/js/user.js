$(function(){
    //1.一旦进入页面就应该发送ajax请求,获取数据,动态渲染模板
    //template(模板id, 数据对象) 返回一个htmlStr
    
    var currentPage = 1; //当前页
    var pageSize = 5; //每条页数

    var currentId; //标记当前被修改的用户id
    var isDelete; //标记修改用户成什么状态
     render();
    function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page:  currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function( info ){
                //   console.log(info);
                  var htmlStr = template('tpl', info);
                  $('tbody').html(htmlStr);
    
                  //根据请求回来的数据进行分页
                  $('#paginator').bootstrapPaginator({
                      //版本号
                      bootstrapMajorVersion: 3,
                      //当前页
                      currentPage: info.page,
                      //总页数
                      totalPages: Math.ceil(info.total / info.size),
                      //给页码注册点击事件
                      onPagesClicked: function(a, b, c, page){
                         //更新currentPage,并且重新渲染即可
                         render();
                      }
                  })
                  
            }
        });
    }


    //点击表格中的按钮,模态框显示
    //使用事件委托的方式

    $('tbody').on('click', '.btn', function(){
        // console.log(this);
        
        $('#userModal').modal('show');
      
        //获取id 
        currentId = $(this).parent().data('id');
        console.log(currentId);
        
        //获取启用禁用状态
        isDelete =$(this).hasClass('btn-danger') ? 0 : 1;
        console.log(isDelete);

  
    });

     //点击确认按钮 发送ajax请求 修改状态
     $('#confirmBtn').click(function(){
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id:  currentId,
                    isDelete: isDelete,
                },
                dataType: 'json',
                success: function( info ){
                  console.log(info);
                  if(info.success){
                    //关闭模态框
                    $('#userModal').modal('hide');
    
                    //重新渲染页面
                    render();
                  }
                }
            })
     });
})