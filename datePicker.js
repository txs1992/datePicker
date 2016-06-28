/*****************************************************
 * 添加类名，防重复插入。该方法接受一个元素对象，并为其添加一个类名
 * @param {Object} ele
 * @param {Object} className
 */
function addClass(ele, className){
	if(ele.className.indexOf(className) == -1){
		ele.className += " " + className;
	}
}

/*****************************************************
 * 移除类名，该方法接受一个原生对象，然后删除一个指定的类名。
 * @param {Object} ele
 * @param {Object} className
 */
function removeClass(ele, className){
	if(ele.className.indexOf(className) > -1){
		var clases = ele.className.split(" ");
		for(var i = 0, len = clases.length; i < len; i++){
			if(clases[i] === className){
				clases.shift(i);
			}
		}
		className = clases.join(" ");
	}
	ele.className = className;
}

/*****************************************************
 * @函数柯里化 为函数预先绑定参数。
 * @param {Object} fn
 * @param {Object} context
 */
function Currie(fn, context){
	var args = Array.prototype.slice.call(arguments, 2);
	
	return function(){
		var inArgs = Array.prototype.concat(arguments);
		var currArgs = args.concat(inArgs);
		return fn.apply(context, currArgs);
	}
}

/*****************************************************
 * @函数绑定，返回一个绑定作用域的函数。
 * @param {Object} fn
 * @param {Object} context
 */
function bind(fn, context){
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		return fn.apply(context, args);
	}
}


/*****************************************************
 * @函数节流的方法 
 * 该函数接受三个参数，处理的函数，延时多久调用，执行环境对象，
 * 调用该函数之后，该函数会检测之前是否有相同的处理未执行，
 * 有就清除队列中的上一个函数，并将新处理延时推入队列。
 * 禁止一个函数在一段时间内重复触发。
 * @param {Object} fn	处理函数
 * @param {Object} ms	延时调用
 * @param {Object} context	执行环境对象
 */
function throttle(fn, ms, context){
	clearTimeout(fn.id);
	fn.id = setTimeout(function(){
		fn.call(context);
	},ms);
}

/*****************************************************
 * @数组分块处理。
 * 该函数接受一个数组，要个处理数组元素的函数，一个毫秒数
 * 和一个执行环境(可选)，如果没有执行环境可以不传
 * 该方法将一个完整的数组处理切割一个个队列执行
 */
function chunk(arr, process, ms, context){
	
	//*注意：由于严格模式禁用了arguments.callee，所以这使用命名函数表达式来执行。
	setTimeout(function fn(){
		var item = arr.shift();
		process.call(context, item);
		
		if(arr.length > 0){
			setTimeout(fn, ms);
		}
	}, ms);
	
}

/*****************************************************
 * @跨浏览器兼容的添加事件处理程序。
 * @param {Object} ele		元素
 * @param {Object} type		事件类型
 * @param {Object} handler	处理函数
 */
function addEventHandler(ele, type, handler){
	//是否支持DOM2级的事件处理程序
	if(ele.addEventListener){
		ele.addEventListener(type, handler, false);
	}else if(ele.attachEvent){
		//IE8及以下的事件处理程序
		ele.attachEvent("on" + type, handler);
	}else{
		ele["on" + type] = handler;
	}
}

/*****************************************************
 * @跨浏览器兼容的移除事件处理程序
 * @param {Object} ele		元素
 * @param {Object} type		事件类型
 * @param {Object} handler	处理程序
 */
function removeEventHandler(ele, type, handler){
	//是否支持DOM2级的事件处理程序
	if(ele.removeEventListener){
		ele.removeEventListener(type, handler);
	}else if(ele.detachEvent){
		//IE8及以下的事件处理程序
		ele.detachEvent("on" + type, handler);
	}else{
		ele["on" + type] = null;
	}
}

/*****************************************************
 * @跨浏览器兼容获取事件对象
 * @param {Object} event	事件对象
 */
function getEvent(event){
	return event ? event : window.event;
}

/*****************************************************
 * @跨浏览器兼容获取事件目标 
 * @param {Object} event	事件对象
 */
function getTarget(event){
	var e = getEvent(event);
	return e.target  || e.srcElement;
}

/*****************************************************
 * @跨浏览器兼容取消默认行为		
 * @param {Object} event	事件对象
 */
function preventDefault(event){
	var e = getEvent(event);
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}

/*****************************************************
 * @跨浏览器兼容阻止事件冒泡
 * @param {Object} event	 事件对象
 */
function stopPropagation(event){
	var e = getEvent(event);
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}




//隐藏时间显示按钮
function hideDate(id){
	document.getElementById(id).getElementsByClassName('date-date')[0].style.display = "none";
}

//显示时间显示按钮
function showDate(id){
	document.getElementById(id).getElementsByClassName('date-date')[0].style.display = "block";
}

//隐藏天数主体
function hideDay(id){
	document.getElementById(id).getElementsByClassName('content-day')[0].style.display = "none";
}

//显示天数主体
function showDay(id){
	document.getElementById(id).getElementsByClassName('content-day')[0].style.display = "block";
}

//隐藏月模块
function hideMonth(id){
	document.getElementById(id).getElementsByClassName('content-month')[0].style.display = "none";
}

//显示月模块
function showMonth(id){
	document.getElementById(id).getElementsByClassName('content-month')[0].style.display = "block";
}

//隐藏年模块
function hideYear(id){
	document.getElementById(id).getElementsByClassName('content-year')[0].style.display = "none";
}

//显示年模块
function showYear(id){
	document.getElementById(id).getElementsByClassName('content-year')[0].style.display = "block";
}

/************************************************************************************************
 * @构造函数时间选择器的基类
 * @param {Object} param
 */
function DatePicker(param){
	
	var myDate = {
		year : 0,
		month : 0,
		day : 0,
		week : 0,
		hours : 0,
		minutes : 0,
		seconds : 0
	};
	
	
	
	
	
	//如果不是以new 构造函数的形式使用，就默认使用构造函数的方式调用。
	if(!this instanceof DatePicker){
		return new DatePicker(param);
	}
	
	if(typeof param === "object"){
		
		//定义用于存放时间选择器容器的元素。
		var myDateEle,
		//用于创建相关DOM元素的变量.
			dateSubEle;
		
		
		//如果没有传入id就抛出错误。
		if(typeof param.id == "undefined"){
			throw new Error("ID 不能为空!");
		}
		
		/******************************************************
		 * 这里开始是创建相关的DOM元素。
		 */
		
		myDateEle = document.getElementById(param.id);
		
		//创建相关的DOM元素。
		dateSubEle = '<input type="text" class="datePicker-input"/>' +
						'<div class="datePicker-icon">day</div>'+
						'<div class="datePicker-showdate">'+
						'<ul class="date-title">'+
						'<li class="year-prev btn"><a href="javascript:void(0);">◄</a></li>'+
						'<li	class="year-li text"><input type="text" name="" id="" value="2016年" /></li>'+
						'<li class="year-next btn"><a href="javascript:void(0);">►</a></li>'+
						'<li class="month-prev btn"><a href="javascript:void(0);">◄</a></li>'+
						'<li	class="month-li text"><input type="text" name="" id="" value="6月" /></li>'+
						'<li class="month-next btn"><a href="javascript:void(0);">►</a></li>'+
						'</ul>'+
						'<ul class="date-title2"></ul>'+
						'<div class="data-content">'+
						'<div class="content-day">'+
						'<ul class="week-title">'+
						'<li>日</li>'+
						'<li>一</li>'+
						'<li>二</li>'+
						'<li>三</li>'+
						'<li>四</li>'+
						'<li>五</li>'+
						'<li>六</li>'+
						'</ul>'+
						'<ul class="day-content">';
						
			for(var i = 0; i < 42; i++){
				dateSubEle += '<li><a href="javascript:void(0);">1</a></li>';
			}
			
			dateSubEle += "</ul></div>"+
							'<div class="content-month">'+
							'<div id="close-month"><a href="javascript:void(0);">×</a></div>'+
							'<ul>'+
							'<li><a href="javascript:void(0);">一月</a></li>'+
							'<li><a href="javascript:void(0);">二月</a></li>'+
							'<li><a href="javascript:void(0);">三月</a></li>'+
							'<li><a href="javascript:void(0);">四月</a></li>'+
							'<li><a href="javascript:void(0);">五月</a></li>'+
							'<li><a href="javascript:void(0);">六月</a></li>'+
							'<li><a href="javascript:void(0);">七月</a></li>'+
							'<li><a href="javascript:void(0);">八月</a></li>'+
							'<li><a href="javascript:void(0);">九月</a></li>'+
							'<li><a href="javascript:void(0);">十月</a></li>'+
							'<li><a href="javascript:void(0);">十一月</a></li>'+
							'<li><a href="javascript:void(0);">十二月</a></li>'+
							'</ul>'+
							'</div>'+
							'<div class="content-year">'+
							'<div id="close-year"><a href="javascript:void(0);">×</a></div>'+
							'<ul>';
			
			for(var i = 0; i < 42; i++){
				dateSubEle += '<li><a href="javascript:void(0);">2000年</a></li>';
			}
			
			dateSubEle += '</ul>'+
							'</div>'+
							'</div>'+
							'<div class="date-bottom">'+
							'<ul class="date-date">'+
							'<li class="key">时间</li>'+
							'<li class="value"><a href="javascript:void(0);">12:00:00</a></li>'+
							'</ul>'+
							'<ul class="date-btns">'+
							'<li><a href="javascript:void(0);">清空</a></li>'+
							'<li><a href="javascript:void(0);">今天</a></li>'+
							'<li><a href="javascript:void(0);">确定</a></li>'+
							'</ul>'+
							'</div>'+
							'</div>'+
							'</div>';
							
				
			myDateEle.innerHTML = dateSubEle;
			
			
		/******************************************************
		 * DOM元素创建完毕。
		 */
		
		
		//类型的处理
		if(typeof param.type != "undefined"){
			
			switch(param.type){
				case "Y-M-D-H" :
					hideYear(param.id);
					hideMonth(param.id);
					showDate(param.id);
					showDay(param.id);
					break;
				case "Y-M-D" :
					hideYear(param.id);
					hideMonth(param.id);
					hideDay(param.id);
					showDate(param.id);
					break;
				case "Y-M" :
					hideYear(param.id);
					showMonth(param.id);
					hideDay(param.id);
					hideDate(param.id);
					break;
				case "Y" :
					showYear(param.id);
					hideMonth(param.id);
					hideDay(param.id);
					hideDate(param.id);
					break;
			}
		}
		
	}else{
		throw new Error("参数类型不对!");
	}
	
}



