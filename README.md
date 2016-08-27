# formx
jQuery表单验证插件

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
    errEle : 'ele-bd',
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
