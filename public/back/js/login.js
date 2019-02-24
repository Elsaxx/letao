$(function(){
    /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  //进行表单的初始化
  $('#form').bootstrapValidator({
       //设置小图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //字段field 要在input中配置name属性
     fields: {
          //用户名
          username: {
             //校验规则
             validators: {
                 //非空
                 notEmpty: {
                     //提示信息
                     message: '用户名不能为空'
                 },
                 stringLength: {
                     min: 2,
                     max: 6,
                     message: '用户名长度为2-6位'
                 },
                 //callback 专门用于配置回调提示信息
                 callback: {
                     message: '用户名不存在'
                 }
             }
          },
          //用户名
          password: {
            //校验规则
            validators: {
                //非空
                notEmpty: {
                    message: '密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '密码长度必须是6-12位' 
                },
                callback: {
                    message: '密码错误'
                }
            }
          }
     }
  });



  /* 
    2. 使用 submit 按钮, 会进行表单提交, 此时表单校验插件会立刻进行校验
       (1) 校验成功, 此时会默认提交, 发生页面跳转,  注册表单校验成功事件, 在事件中阻止默认的跳转提交, 通过ajax提交
       (2) 校验失败, 自动拦截提交

      注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交
  */
  $('#form').on('success.form.bv', function( e ){
     //阻止默认的提交
     e.preventDefault();
     //发送ajax请求
     $.ajax({
         type: 'post',
         url: '/employee/employeeLogin',
         data: $('#form').serialize(),
         dataType: 'json',
         success: function( info ){
               if(info.error === 1000){
                //    alert('用户名不存在');
                $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
               }
               if(info.error === 1001){
                //    alert('密码错误');
                $('#form').data('bootstrapValidator').updateStatus('password', 'INVAlID', 'callback');
               }
               if(info.success){
                   //登录成功,跳转到首页
                   location.href = 'index.html';
               }
         }
     })
    });

 /*
  3.表单重置功能:
  reset 按钮,本身就可以重置内容,所以此时只需要重置状态即可
  resetForm (false); 只重置状态
  resetForm(true); 重置内容和状态
 */
 $('[type="reset"]').click(function(){
     //重置即可
     $('#form').data('bootstrapValidator').resetForm();
 })
})