#jQuery formx.1.0
formx是一款html5+jQuery的表单验证插件，相对于jquery validate插件来说，体积小，使用方便；机智滴使用了html5新增的表单属性和自定义属性作为免配置参数。  
使用的时候，需要在两个地方配置参数：
* html表单元素上配置参数
* 调用插件的时候配置参数

# 大家最喜欢看demo
* 如果打开页面是错乱的，那么稍等一会就好了
* [简单的登录验证](http://htmlpreview.github.io/?https://github.com/imsole/formx/blob/master/login_form.html)
* [注册验证](http://htmlpreview.github.io/?https://github.com/imsole/formx/blob/master/register_form.html)

#html elements config options
* required - 是否验证
* pattern - 验证规则，正则表达式，写法：^[\w\-]{3,}$
* data-group - 验证组，双向验证，常用地方：密码验证，data-group的值要一样
* data-url - 远程验证地址，失去焦点后会自动验证

# formx config options
* errClass - string - 验证失败的class
* okClass - string - 验证通过的class
* errElem - string - 验证失败添加错误class的元素，默认父级，如果指定了元素，那么默认查找parents('errElem');
* regexped - fn - 正则验证完成后执行的回调函数，返回参数：当前验证对象
* urled - fn - 远程验证完成后指向的回调函数，返回参数：当前验证对象，服务器返回的结果
* eleClick - fn - 元素点击事件，返回参数：当前元素对象
* docClick - fn - document点击事件，返回参数：当前点击元素对象
* saved - fn - 保存成功之后要的回调函数，返回参数：服务器数据
* mouseover - fn - 在表单上移动的时候执行的函数，返回参数：当前表单所有数据，json格式
* keyup - fn - 键盘抬起后执行
* saveBefore - fn - 在提交之前要处理数据的函数

#form simple use
```javascript
$('#form').formx();
```

#html element demo
```html
<form action="/" method"post" id="myform">
  	<label class="label" for="birthday">出生日期：</label>
  	<div class="ele-bd">
    	<input type="text" name="birthday" id="birthday" placeholder="place write birthday" pattern="^1\d{3}((\-)?\d{1,2)){2}$" required>
    	<div class="status">
      		<span class="error">验证失败</span>
      		<span class="success">验证成功</span>
    	</div>
  	</div>
</form>
```

```javascript
$('#myform').formx({
    errElem : 'ele-bd',
    errClass : 'err',
    okClass : 'success',
    saved : function(res){
      	if( res.code == 1 ){
        	console.log( res );
      	}else{
        	console.log( res.msg );
      	}
    }
  });
```

#建议返回res
```javascript
{
	code : 1,  
	msg : '操作成功',  
	data : {}  
}
```

#遵循协议
额，其实这个协议只是拿来唬人了，当然也是为了装逼，所以说只有装逼的人才会写一大堆IT小白不懂的协议名称【ps：如果懂很多协议也是好事呀，说明你够细心呀，但是在工作中，这些都没什么卵用；俗话说：老板吼一吼，员工抖三抖，在老板看来，听话、出活，才是好员工，没有成果，分分钟滚蛋】。  
我说的很明白了吧，也就是说你可以随便下载，随便使用，随后引起的一切事项均与本作者没关系！
