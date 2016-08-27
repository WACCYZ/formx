;(function($){
	$.fn.getForm = function(type){
		var _this = $(this),
			aTxt = ['input', 'select', 'textarea'],
			_children = _this.find(aTxt.join(',')),
			_res = {},
			str = '';
		function json2str(json){
			var res = ''
			for( str in json ){
				res += '&'+str+'='+json[str];
			}
			return res.substring(1);
		};
		
		_children.each(function(i, ele){
			if( $(ele).attr('name') ){
				_res[ $(ele).attr('name') ] = $(ele).val();
			}
		});
		if( type == 'str' ){
			_res = json2str(_res);
		}
		return _res;
	};
})(jQuery);
/**
 * @name form validate widget
 * @auth sole
 * @time 2015年8月3日
 * @verson 1.0
 * @use $('#form').formx();
*/

;(function($){

	var noop = function(res){ return true; };

	//default options
	var def = {
		errClass : 'err',
		okClass : 'success',
		errElem : '',
		blured : noop, 
		eleClick : noop,
		docClick : noop,
		regexped : noop, 
		move : noop, 
		keyup : noop,
		urled : noop,
		saved : noop,
		debug : false,
		saveBefore : noop
	};
	
	$.fn.formx = function(o){
		var opt = $.fn.extend({}, def, o);

		return this.each(function(){

			var oForm = $(this),
				oRequired = oForm.find('input[required], textarea[required]'),
				oTxt = oForm.find('input, textarea'),
				oBtnSave = oForm.find('input[type="submit"]'),
				reTxt = {};

			//init and get regexps, 防止用户恶意篡改正则
			oTxt.each(function(i, ele){
				var re = $.trim( $(ele).attr('pattern') );
				if ( re ) {
					reTxt[ $(ele).attr('name') ] = re;
					$(ele).removeAttr('pattern');
				}
			});

			function setSaveBtn(){
				var arr = [];
				var iErr = oForm.find('.'+opt.errClass).length;
				data = oForm.getForm();
				oRequired.each(function(i, ele){
					if( $.trim(data[ $(ele).attr('name') ]) ){
						arr.push( $(ele).attr('name') );
					}
				});

				(oRequired.length==arr.length && !iErr) ? oBtnSave.removeAttr('disabled') : oBtnSave.attr('disabled', 'disabled');
			}

			oRequired.live('blur', function(){
				var _this = $(this),
					_parent = _this.parent(),
					_name = _this.attr('name'),
					_re = reTxt[ _name ],
					_val = $.trim( _this.val() );

				//errElem
				_parent = opt.errElem ? _this.parents(opt.errElem) : _parent;

				function v_empty(){
					_parent[ (!_val ? 'add' : 'remove') + 'Class' ](opt.errClass);
					_parent[ (!_val ? 'remove' : 'add') + 'Class' ](opt.okClass);
					return !_val ? false : true;
				}

				function v_pattern(){
					
					var flag = false;
					var reg = new RegExp(_re);
					_parent[ (!reg.test(_val) ? 'add' : 'remove') + 'Class' ](opt.errClass);
					_parent[ (!reg.test(_val) ? 'remove' : 'add') + 'Class' ](opt.okClass);
					if( !reg.test(_val) ){
						flag = false;
					}else{
						flag = true;
						opt.regexped( _this );
					}
					return flag;
					
				}

				if ( v_empty() && v_pattern() ) { setSaveBtn(); }
			}).live('keyup', function(){
				var _this = $(this),
					_datas = _this.data(),
					_name = _this.attr('name'),
					_parent = _this.parent(),
					_re = reTxt[ _name ],
					_group = _this.data('group'),
					_url = _this.data('url'),
					_val = $.trim( _this.val() );

				//errElem
				_parent = opt.errElem ? _this.parents(opt.errElem) : _parent;

				function v_empty(){
					_parent[ (!_val ? 'add' : 'remove') + 'Class' ](opt.errClass);
					_parent[ (!_val ? 'remove' : 'add') + 'Class' ](opt.okClass);
					return !_val ? false : true;
				}

				function v_pattern(){
					
					var flag = false;
					var reg = new RegExp(_re);
					_parent[ (!reg.test(_val) ? 'add' : 'remove') + 'Class' ](opt.errClass);
					_parent[ (!reg.test(_val) ? 'remove' : 'add') + 'Class' ](opt.okClass);
					if( !reg.test(_val) ){
						flag = false;
					}else{
						flag = true;
						opt.regexped( _this );
					}
					return flag;
					
				}

				function v_url(){
					var data = {};
					var flag = false;
					data[_name] = _val;
					$.ajax({
						async: false,
						type: 'post',
						dataType: 'json',
						data: data,
						url:_url,
						success:function(res){
							_parent[ (!res.code ? 'add' : 'remove') + 'Class' ](opt.errClass);
							_parent[ (!reg.code ? 'remove' : 'add') + 'Class' ](opt.okClass);
							if( res.code == 1 ){
								flag = true;
								_parent.removeClass(opt.errClass);
							}else{
								flag = false;
								_parent.addClass(opt.errClass);
							}
							opt.urled(_this, res);
						}
					});

					return flag;
					
				}

				function v_group(){

					var oGroup = oForm.find('input[data-group="'+_group+'"]');
					var arr = [];
					var flag = false;
					oGroup.each(function(i, ele){
						if( !$.trim($(ele).val()) ){ arr.push(i); }
					});

					if( !arr.length ){
						if( oGroup.eq(0).val() !== oGroup.eq(1).val() ){
							flag = false;
							_parent.addClass(opt.errClass);
							_parent.removeClass(opt.okClass);
						}else{
							flag = true;
							_parent.removeClass(opt.errClass);
							_parent.addClass(opt.okClass);
						}
					}

					return flag;

				}

				//is empty
				if ( v_empty() ){
					//pattern
					if ( _re && v_pattern() ) {
						//ajax
						if (_url) {v_url(); }
						//group
						if (_group) {v_group();}
					}
					if ( !_re ) {
						//ajax
						if (_url) {v_url(); }
						//group
						if (_group) {v_group();}
					}
				}

				setSaveBtn();
			});

			oTxt.live('click', function(e){
				var _this = $(this);
				opt.eleClick( _this );
				e.stopPropagation();
			}).live('keyup', function(){
				var _this = $(this);
				opt.keyup( _this );
			}).live('blur', function(){
				var _this = $(this);
				opt.blured( _this );
			});

			$(document).on('click', function(e){
				opt.docClick( $(e.target) );
			});

			oForm.on('mousemove', function(){
				setSaveBtn();

				opt.move( data );
			}).on('submit', function(){
				var url = oForm.attr('action'),
					method = oForm.attr('method'),
					data = oForm.getForm();

				opt.saveBefore && opt.saveBefore(data);

				if (opt.debug) { window.console && console.log(url, method, data) };

				if( !oBtnSave.attr('disabled') ){
					$.ajax({
						async: false,
						type:method,
						dataType: 'json',
						data: data,
						url:url,
						success:function(res){
							opt.saved(res);
						}
					});
				}
				return false;
			});
			
		});

	}
	
})(jQuery);
