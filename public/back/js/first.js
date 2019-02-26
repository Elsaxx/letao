//渲染数据
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        //发送ajax请求
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function( info ){
                //   console.log(info);
                 var htmlStr = template('firstl', info);
                 $('tbody').html(htmlStr);

                //  分页
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    //给页码添加点击事件
                    onPageClicked: function( a, b, c, page){
                       //更新当前页
                       currentPage = page;
                       //重新渲染页面
                       render();
                    }
                })
            }
        })
    }


    //点击添加按钮 显示模态框
    $('#addBtn').click(function(){
    $('#addModal').modal('show');
    });

    //表单验证
    $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置需要校验的字段列表
    fields: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
    });

    //注册表单校验成功事件,在事件中阻止默认的提交 ,通过ajax提交

    $('#form').on('success.form.bv', function(e){
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function( info ){
              console.log( info);
            //添加成功
            // 关闭模态框
             $('#addModal').modal('hide');
            //重新渲染页面 ,重新渲染第一页
            currentPage = 1;
            render();
            //将表单和里面的内容重置
            $('#form').data('bootstrapValidator').resetForm(true);
        }
    })
    })

})