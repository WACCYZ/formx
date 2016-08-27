# formx
jQuery表单验证插件

#html elements config options
/**
* html elements config options
* required			是否验证
* pattern			验证规则，正则表达式
* data-group		验证组，双向验证，常用地方：密码验证
* data-url			远程验证地址
* data-callback		远程验证失败返回的错误信息，如果未定义，则取回服务器返回的信息
* data-msg			验证失败后的提示信息
*/

# formx config options
/**
* formx config options
* errClass		string 	为空时候的提示 和 错误提示的 class
* errElem		string 	错误添加的元素，默认父级，如果指定了元素，那么默认查找parents('errElem');
* regexped		fn 		正则验证完成后执行的回调函数，返回参数：当前验证对象
* urled			fn 		远程验证完成后指向的回调函数，返回参数：当前验证对象，服务器返回的结果
* eleClick 		fn 		元素点击事件，返回参数：当前元素对象
* docClick 		fn 		document点击事件，返回参数：当前点击元素对象
* saved			fn 		保存成功之后要的回调函数，返回参数：服务器数据
* mouseover		fn 		在表单上移动的时候执行的函数，返回参数：当前表单所有数据，json格式
* keyup			fn 		键盘抬起后执行
* saveBefore	fn		在提交之前要处理数据的函数
*/
