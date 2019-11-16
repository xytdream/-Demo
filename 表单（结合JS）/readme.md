### 表单验证Demo

这是我利用以前写的注册界面Demo结合js写的一个表单验证Demo，下图是我的html结构以及界面

```html
<body>
  <form action="#">
    <h2>注 册</h2>
      <!--用户名输入框及其警告文字-->
    <input type="text" placeholder="用户名" class="userName" required>
      <span class="iconfont" id="userNameWarn" style="display: none;">用户名不能为空</span>
      <!--邮箱输入框及其警告文字-->
    <input type="email" placeholder="邮箱" class="email" required>
      <span class="iconfont" id="emailWarn" style="display: none;"></span>
      <!--两次输入框及其警告文字-->
    <input type="password" placeholder="密码" class="password" required>
    <input type="password" placeholder="确认密码" class="password2" required>
      <span class="iconfont" id="passwordWarn" style="display: none;">两次密码不一致</span>
      <!--注册按钮-->
    <input type="submit" value="注册">
      <!--转去登录界面的超链接-->
    <a href="#">已有账户，去登录</a>
  </form>
</body>
```

![最终效果图]([https://github.com/xytdream/-Demo/blob/master/%E8%A1%A8%E5%8D%95%EF%BC%88%E7%BB%93%E5%90%88JS%EF%BC%89/images/%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C%E5%9B%BE.png](https://github.com/xytdream/-Demo/blob/master/表单（结合JS）/images/最终效果图.png))

样式怎么实现的就暂时不说了。这个readme主要是想记下我是如何使用js实现这个验证的以及我遇到的问题。

##### 用户名验证

用户名验证我做的很简单只要不为空即可。

首先我需要获得用户名输入框的对象，我选择使用了querySelector()方法

> querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
>
> **注意：** querySelector() 方法仅仅返回匹配指定选择器的第一个元素。如果你需要返回所有的元素，请使用 querySelectorAll() 方法替代。

因为我也是第一次接触到这个方法，所以尝试了一下，使用这个方法可以通过css选择器的方式来获取对象，我觉得十分好用。

```javascript
var userName = document.querySelector("form .userName")
```

获取对象后，就可以给这个对象绑定事件了，开始我选择了onblur事件，当输入框失去焦点后开始判断是否符合要求。但是我觉得失去焦点后才开始判断总是少点内味，所以一直想着能够实时判断，通过查询，我又尝试了onchange事件，结果还是不能实现实时。最后有发现了一个H5新增的事件oninput,它能够轻松的实现实时监听。

> onblur 事件会在对象失去焦点时发生。
>
> onblur 经常用于Javascript验证代码，一般用于表单输入框。

> onchange 事件会在域的内容改变时发生。
>
> onchange 事件也可用于单选框与复选框改变后触发的事件。

> oninput 事件在用户输入时触发。
>
> 该事件在 <input> 或 <textarea> 元素的值发生改变时触发。
>



```javascript
//在userName输入框中的值有变化时即触发判断
userName.oninput = function(){
    if( userName.value == ""){
        userNameWarn.className += " warnText iconduicuo";
        userNameWarn.style.display = "";
        userNameWarn.innerHTML = "用户名不能为空"
    }else{
        userNameWarn.className = "iconfont";
        userNameWarn.style.display = "none";
    }
}
```

##### 邮箱验证

邮箱验证其实才是写这次demo的主要目的，为了练习正则表达式的使用。

```javascript
var email = document.querySelector("form .email")
```



```javascript
 /*
        * 监测邮箱格式是否正确
        * 使用正则表达式
        * 
        * 电子邮件：
        *   adc123             .xxx                          @     aaa            .com             .cn
        *   任意字母数字下划线   .任意字母数字下划线(可有可无)   @     任意字母数字    .任意字母(2-5位)  .任意字母(2-5位)（可有可无）
        *   \w{3,}             (\.\w+)*                      @     [A-z0-9]+       (\.[A-z]{2,5}){1,2} 
        */
        var emailWarn = document.getElementById("emailWarn")
        // console.log(emailWarn)
        var emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/
        
        // email.pattern = emailReg;

        //在userName输入框中的值有变化时即触发判断
        email.oninput = function(){
          emailWarn.className += " warnText iconduicuo";
          emailWarn.style.display = "";
          if( email.value == ""){
            emailWarn.innerHTML = "邮件不能为空！"
          }else if(!emailReg.test(email.value)){
            emailWarn.innerHTML = "邮件格式不正确"
          }else{
            emailWarn.className = "iconfont";
            emailWarn.style.display = "none";
          }
        }
```

这里还有一个问题，就是input元素有一个pattern属性

> pattern 属性规定用于验证输入字段的模式。

一开始我在完成正则表达式之后，我想着既然是用来验证输入字段的模式，就顺手将这个属性的值设为了我刚得的正则，后来我在email的值已经通过了正则验证的情况下点击了注册按钮，却出现了错误，提示"请与所请求的格式保持一致"，这个问题我到现在还是有点想不明白。

![格式错误提示]([https://github.com/xytdream/-Demo/blob/master/%E8%A1%A8%E5%8D%95%EF%BC%88%E7%BB%93%E5%90%88JS%EF%BC%89/images/%E6%A0%BC%E5%BC%8F%E9%94%99%E8%AF%AF.png](https://github.com/xytdream/-Demo/blob/master/表单（结合JS）/images/格式错误.png))

##### 两次密码一致验证

这个逻辑我觉得很简单，就不说了。

```javascript
 var password = document.querySelector("form .password")
 var password2 = document.querySelector("form .password2")
```



```javascript
//判断两次密码是否一致
        var passwordWarn = document.getElementById("passwordWarn");

        function passwordSame(){
          if(!(password.value == password2.value)){
            passwordWarn.className += " warnText iconduicuo";
            passwordWarn.style.display = "";
            passwordWarn.innerHTML = "两次密码不一致"
          }else{
            passwordWarn.className = "iconfont";
            passwordWarn.style.display = "none";
          }
        }
        
        password.oninput = passwordSame;
        password2.oninput = passwordSame;
```

##### 最后

除了上面说的，这次Demo我还练习使用了iconfont字体图标来实现警告提示图标，以及通过js修改html元素的class和内联样式来实现警告文字的显示或者隐藏，这里面还存在这一个bug，就是若是连续不符合规则时，那html元素的class会一直添加，即使该class已经存在，虽然这对页面的显示效果没有什么影响。但在性能方面来说却是有影响的。还是要想办法解决这个问题。

对，其实完成之后我还了解到了一个H5新增的表单事件oninvalid以及setCustomValidity属性

> oninvalid      当元素无效时运行的脚本。

通过oninvalid和setCustomValidity，就可以不用自己写提示消息的结构了，通过设置setCustomValidity就可以直接设置你想提示给用户的信息。