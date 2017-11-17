/*****************************************************
 * 添加类名，防重复插入。该方法接受一个元素对象，并为其添加一个类名
 * @param {Object} ele
 * @param {Object} className
 */
function addClass(ele, className){
	var classes = ele.className.split(" ");
	var flag = true;
	for(var i = 0, len = classes.length; i < len; i++){
		if(classes[i] === className){
			flag = false;
			break;
		}
	}
	if(flag){
		ele.className += " " + className;
	}
	
}

/*****************************************************
 * 移除类名，该方法接受一个原生对象，然后删除一个指定的类名。
 * @param {Object} ele
 * @param {Object} className
 */
function removeClass(ele, name){
	
	if(ele.className.indexOf(name) > -1){
		ele.className = ele.className.replace(name, "");
	}
	
}

/*****************************************************
 * 跨浏览器兼容的获取计算后的样式的属性
 * @param {Object} ele		元素
 * @param {Object} after	伪元素
 */
function getComputedStyleAttrValue(ele,attr, after){
	if(document.defaultView.getComputedStyle){
		return document.defaultView.getComputedStyle(ele, after)[attr];
	}else if(window.getComputedStyle){
		return window.getComputedStyle(ele, after)[attr];
	}else if(ele.currentStyle){
		return ele.currentStyle[attr];
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


/***************************************************
 * @兼容IE的显示模块操作，使用了惰性载入的方法减少了判断的次数
 * @param {Object} id			当前元素的id
 * @param {Object} className	操作的元素的类名
 * @param {Object} tag			操作元素的标签名。
 */
function showModule(id, className, tag){
	if(typeof document.querySelector){
		showModule = function(id, className, tag){
			document.querySelector("#" + id + ' .' + className).style.display = "block";
		}
	}else if(typeof document.getElementsByClassName){
		showModule = function(id, className, tag){
			document.getElementById(id).getElementsByClassName(className)[0].style.display = "block";
		}
	}else{
		
		showModule = function(id, className, tag){
			var el = document.getElementById(id),
				i =	0,
				els = el.getElementsByTagName(tag);
				len = els.length;
				
			for(i; i < len; i++){
				if(els.className == className){
					els[i].style.display = "block";
					els = null;
					break;
				}
			}
		}
		
	}
	
	showModule(id, className, tag);
}

//隐藏模块
function hideModule(id, className, tag){
	
	if(typeof document.querySelector){
		hideModule = function(id, className, tag){
			document.querySelector("#" + id + ' .' + className).style.display = "none";
		}
	}else if(typeof document.getElementsByClassName){
		hideModule = function(id, className, tag){
			document.getElementById(id).getElementsByClassName(className)[0].style.display = "none";
		}
	}else{
		
		hideModule = function(id, className, tag){
			var el = document.getElementById(id),
				i =	0,
				els = el.getElementsByTagName(tag);
				len = els.length;
				
			for(i; i < len; i++){
				if(els.className == className){
					els[i].style.display = "none";
					els = null;
					break;
				}
			}
		}
		
	}
	
	hideModule(id, className, tag);
}

/***************************************************
 * @兼容IE的获取class元素的方法
 * @param {Object} id			当前元素的id
 * @param {Object} className	操作的元素的类名
 * @param {Object} tag			操作元素的标签名。
 */
function getClassName(id, className, tag){
	if(typeof document.querySelector){
		getClassName = function(id, className, tag){
			return document.querySelector("#" + id + ' .' + className);
		}
	}else if(typeof document.getElementsByClassName){
		getClassName = function(id, className, tag){
			return document.getElementById(id).getElementsByClassName(className)[0];
		}
	}else{
		
		getClassName = function(id, className, tag){
			var el = document.getElementById(id),
				i =	0,
				els = el.getElementsByTagName(tag);
				len = els.length;
				
			for(i; i < len; i++){
				if(els.className == className){
					return els[i];
				}
			}
		}
		
	}
	
	return getClassName(id, className, tag);
}


/***************************************************
 * @兼容IE的获取class元素的方法
 * @param {Object} id			当前元素的id
 * @param {Object} className	操作的元素的类名
 * @param {Object} tag			操作元素的标签名。
 */
function getClassNameAll(id, className, tag){
	if(typeof document.querySelectorAll){
		getClassNameAll = function(id, className, tag){
			return document.querySelectorAll("#" + id + ' .' + className);
		}
	}else if(typeof document.getElementsByClassName){
		getClassNameAll = function(id, className, tag){
			return document.getElementById(id).getElementsByClassName(className);
		}
	}else{
		
		getClassNameAll = function(id, className, tag){
			var el = document.getElementById(id),
				i =	0,
				els = el.getElementsByTagName(tag);
				len = els.length,
				currels = [];
				
			for(i; i < len; i++){
				if(els.className == className){
					currels.push(els[i]);
				}
			}
			
			return currels;
		}
		
	}
	
	return getClassNameAll(id, className, tag);
}

/*************************************************
 * @点击显示去区块的处理，
 * 判断点击状态与目标显示隐藏相关区块。
 * @param {Object} id
 * @param {Object} className
 * @param {Object} tag
 */
function hasShowMoudule(el, id, className, tag, param){
	
	switch(className){
		
		case "content-year":
			
			if(param.type == "D"){
				hideModule(id, 'content-month', 'div');
			}else if(param.type == "M"){
				hideModule(id, 'content-date', 'div');
			}else if(param.type == "Y-M"){
				hideModule(id, 'content-month', 'div');
				hideModule(id, 'content-date', 'div');
			}else{
				hideModule(id, 'content-month', 'div');
				hideModule(id, 'content-date', 'div');
			}
			
			
			if(param.type !== "Y" && param.type !== "Y-M"){
				if(getComputedStyleAttrValue(el, "display") == "none"){
					showModule(id, 'content-year', 'div');
				}else{
					hideModule(id, 'content-year', 'div');
				}
			}
			
			if(param.type === "Y-M"){
				if(getComputedStyleAttrValue(el, "display") == "none"){
					showModule(id, 'content-year', 'div');
				}
			}
			
			break;
			
		case "content-month":
			if(param.type == "D"){
				hideModule(id, 'content-year', 'div');
			}else if(param.type == "Y"){
				hideModule(id, 'content-date', 'div');
			}else if(param.type == "Y-M"){
				hideModule(id, 'content-year', 'div');
				hideModule(id, 'content-date', 'div');
				showModule(id, 'content-month', 'div');
			}else{
				hideModule(id, 'content-year', 'div');
				hideModule(id, 'content-date', 'div');
			}
			
			if(param.type !== "M" && param.type !== "Y-M"){
				if(getComputedStyleAttrValue(el, "display") == "none"){
					showModule(id, 'content-month', 'div');
				}else{
					hideModule(id, 'content-month', 'div');
				}
			}
			
			break;
			
		case "content-date":
		
			if(param.type == "M"){
				hideModule(id, 'content-year', 'div');
			}else if(param.type == "Y"){
				hideModule(id, 'content-month', 'div');
			}else{
				hideModule(id, 'content-year', 'div');
				hideModule(id, 'content-month', 'div');
			}
			
			if(param.type !== "D"){
				if(getComputedStyleAttrValue(el, "display") == "none"){
					showModule(id, 'content-date', 'div');
				}else{
					hideModule(id, 'content-date', 'div');
				}
			}
			
			
			break;
	}
	
}


/************************************************************************
 * 初始化标记处理
 * @param {Object} els
 * @param {Object} className
 * @param {Object} currDate
 */
function initTag(els, className, currDate){
	//定义一个变量用来接收某人选中项的元素
	var temp;
	
	for(var i = 0, len = els.length; i < len; i++){
		if(els[i].nodeType == 1 && els[i].className.indexOf(className) > -1){
			temp = els[i];
			break;
		}
	}
	
	//判断该元素是否存在，如果有，那么表示应该是点击所造成的，这里会移除该状态。
	if(!temp){
		//removeClass(temp, className);
		
		//再次遍历，按当前时间的年与某人数组进行比较，获取值一样的元素。
		for(var i = 0, len = els.length; i < len; i++){
			if(els[i].nodeType == 1 && parseInt(els[i].firstChild.nodeValue) == currDate){
				temp = els[i];
				break;
			}
		}
		
		//将该元素置为默认选中的状态。
		addClass(temp, className);
	}
	
	return i;
	
}



/***************************************************
 * @点击左右按钮的时候，切换被选中的按钮的标记。
 * @param {Object} els
 * @param {Object} className
 * @param {Object} value
 */
function changeTag(els, className, value){
	
	for(var i = 0, len = els.length; i < len; i++){
		if(els[i].nodeType == 1 && els[i].className.indexOf("on") > -1){
			removeClass(els[i], "on");
			break;
		}
	}
	
	for(var i = 0, len = els.length; i < len; i++){
		if(els[i].nodeType == 1 && parseInt(els[i].firstChild.nodeValue) == value){
			addClass(els[i], "on");
			break;
		}
	}
	
}

/***************************************************
 * @点击左右按钮的时候，切换天数被选中的按钮的标记。
 * @param {Object} els
 * @param {Object} className
 * @param {Object} value
 */
function changeDayTag(day_as, value){
	var currTarget = null;
	for(var i = 0, len = day_as.length; i < len; i++){
		if(day_as[i].className.indexOf("on") > -1){
			removeClass(day_as[i], "on");
			break;
		}
	}
	
	for(var i = 0, len = day_as.length; i < len; i++){
		if(day_as[i].firstChild.nodeValue == value){
			currTarget = day_as[i];
			break;
		}
	}
	
	if(currTarget == null){
		currTarget = day_as[day_as.length -1];
	}
	
	addClass(currTarget, "on");
}


/**********************************************88
 * @返回当前的标记所在的位置。
 * @param {Object} els
 * @param {Object} className
 */
function getTagIndex(els, className){
	for(var i = 0, len = els.length; i < len; i++){
		if(els[i].nodeType == 1 && els[i].className.indexOf("on") > -1){
			return i;
		}
	}
}


/******************************************************888
 * @根据传入的年数和月数，判断该月有多少天，当前是第几天
 * @param {Object} year
 * @param {Object} month
 */
function getDateType(year, month){
	var type = {},
		run = false;
		
	if(year % 400 == 0 || year % 4 == 0 && year % 100 != 0){
		run = true;
	}
	
	type.week = new Date(year, (month -1), 1).getDay();
	type.prevDay = getDayCount(run, month - 1);
	type.currDay = getDayCount(run, month);
	type.nextDay = getDayCount(run, month + 1);
	
	return type;
}


/************************************************************
 * 配合getDateType的处理函数，根据是否闰年和月数，返回当月的天数
 * @param {Object} run
 * @param {Object} month
 */
function getDayCount(run, month){
	var day;
	
	//对于12月份的，下一个月的处理，由于1月始终是31天，所以这里处理很简单。
	if(month > 12){
		month = 1;
	}
	if(month < 1){
		month = 12;
	}
	
	switch(month){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			day = 31;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			day = 30;
			break;
		case 2 :
			if(run){
				day = 29;
			}else{
				day = 28;
			}
	}
	
	return day;
}

//处理天数的按钮组。
function changeDayBtns(myDate, param){
	
	var dayType = getDateType(myDate.year, myDate.month);
				
	//获取天数的元素的数组。
	var days = getClassName(param.id, 'content-day', 'div').getElementsByTagName('a');
			
	var index = 0,
		num = dayType.prevDay - dayType.week;		
	//第一步处理上个月的残留的天数。
	if(dayType.week < 7 && dayType.week > 0){
		
		while(index < dayType.week){
			
			days[index].className = "not";
			days[index].firstChild.nodeValue = ++num;
			index++;
		}
	}
	
	//第二步，处理当前月的天数
	var currSum = dayType.currDay + dayType.week,
		num = 0;
	
	while(index < currSum){
		
		if((num + dayType.week) % 7 == 0 || (num + dayType.week - 6) % 7 == 0){
			days[index].className = "week day-mybtns";
			days[index].firstChild.nodeValue = ++num;
		}else{
			days[index].className = "day-mybtns";
			days[index].firstChild.nodeValue = ++num;
		}
	
		index++;
	}
	
	//第三步伐,处理下个月的天数
	num = 0;
	while(index < 42){
			
		days[index].className = "not";
		days[index].firstChild.nodeValue = ++num;
		index++;
	}
}

/****************************************
 * 小时、分钟、秒钟的显示处理方法
 * @param {Object} hours
 * @param {Object} minutes
 * @param {Object} seconds
 */
function solveTime(hours, minutes, seconds){
	if(hours < 10){
		hours = '0' + hours;
	}
	
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	
	return {
		hours : hours,
		minutes : minutes,
		seconds : seconds
	}
}

/**************
 * 内部时间对象的处理方法。
 * @param {Object} myDate
 * @param {Object} currDate
 */
function solveDate(myDate, currDate, type){
	
	switch(type){
		case "Y-M-D-H" :
			myDate.year = currDate.getFullYear();
			myDate.month = currDate.getMonth() + 1;
			myDate.day = currDate.getDate();
			myDate.week = currDate.getDay();
			myDate.hours = currDate.getHours();
			myDate.minutes = currDate.getMinutes();
			myDate.seconds = currDate.getSeconds();
			myDate.currDate = currDate;
			break;
		
		case "Y-M-D" :
			myDate.year = currDate.getFullYear();
			myDate.month = currDate.getMonth() + 1;
			myDate.day = currDate.getDate();
			myDate.week = currDate.getDay();
			myDate.hours = undefined;
			myDate.minutes = undefined;
			myDate.seconds = undefined;
			myDate.currDate = currDate;
			break;
			
		case "Y-M" :
			myDate.year = currDate.getFullYear();
			myDate.month = currDate.getMonth() + 1;
			myDate.day = undefined;
			myDate.week = undefined;
			myDate.hours = undefined;
			myDate.minutes = undefined;
			myDate.seconds = undefined;
			myDate.currDate = currDate;
			break;
			
		case "Y" :
			myDate.month = undefined;
			myDate.day = undefined;
			myDate.week = undefined;
			myDate.hours = undefined;
			myDate.minutes = undefined;
			myDate.seconds = undefined;
			myDate.currDate = currDate;
			break;
			
		case "M" :
			myDate.year = undefined;
			myDate.day = undefined;
			myDate.week = undefined;
			myDate.hours = undefined;
			myDate.minutes = undefined;
			myDate.seconds = undefined;
			myDate.currDate = currDate;
			break;
			
		case "D" :
			myDate.year = undefined;
			myDate.month = undefined;
			myDate.hours = undefined;
			myDate.minutes = undefined;
			myDate.seconds = undefined;
			myDate.currDate = currDate;
			break;
			
		case "H" :
			myDate.year = undefined;
			myDate.month = undefined;
			myDate.day = undefined;
			myDate.week = undefined;
			myDate.hours = currDate.getHours();
			myDate.minutes = currDate.getMinutes();
			myDate.seconds = currDate.getSeconds();
			myDate.currDate = currDate;
			break;
	}
	
}

/******************************************************
 * 传入两个对象，然后复制该对象的时间。
 * @param {Object} newDate
 * @param {Object} oldDate
 */
function copyDate(newDate, oldDate){
	newDate.year = oldDate.year;
	newDate.month = oldDate.month;
	newDate.day = oldDate.day;
	newDate.week = oldDate.week;
	newDate.hours = oldDate.hours;
	newDate.minutes = oldDate.minutes;
	newDate.seconds = oldDate.seconds;
}
/***************************************************
 * @根据初始化传入的显示方式处理显示的值。
 * @param {Object} myDate
 * @param {Object} timer
 * @param {Object} type
 */
function setInputTimeValue(onday,myDate, timer, param, curr, scrollVals){
	//对内置自定义日期对象的处理。
	if(onday === "today"){
		solveDate(myDate, curr, param.type);
	}
	
	switch(param.type){
		case "Y-M-D-H" :
			getClassName(param.id, "datePicker-input", 'input').value =
				myDate.year + "年" +
				myDate.month + "月" +
				myDate.day + "日  " + 
				timer.hours + ":" +
				timer.minutes + ":" +
				timer.seconds;
			break;
		
		case "Y-M-D" :
			getClassName(param.id, "datePicker-input", 'input').value =
				myDate.year + "年" +
				myDate.month + "月" +
				myDate.day + "日  "; 
			break;
			
		case "Y-M" :
			getClassName(param.id, "datePicker-input", 'input').value =
				myDate.year + "年" +
				myDate.month + "月";
				
				var content_year = getClassName(param.id, 'content-year', 'div');
				var year_as = getClassName(param.id, 'content-year', 'div').getElementsByTagName('a');
				getClassName(param.id, "year-input", 'input').value = myDate.year + "年";
				changeTag(year_as, "on", myDate.year);
				content_year.scrollTop = parseInt((getTagIndex(year_as, "on") - 1) / 2)  * 38 ;
				
				var month_as = getClassName(param.id, 'content-month', 'div').getElementsByTagName('a');
				getClassName(param.id, "month-input", 'input').value = myDate.month + "月";
				
				changeTag(month_as, "on", myDate.month);
				
			break;
			
		case "Y" :
			getClassName(param.id, "datePicker-input", 'input').value =
				myDate.year + "年";
				var content_year = getClassName(param.id, 'content-year', 'div');
				var year_as = getClassName(param.id, 'content-year', 'div').getElementsByTagName('a');
				getClassName(param.id, "year-input", 'input').value = myDate.year + "年";
				changeTag(year_as, "on", myDate.year);
				content_year.scrollTop = parseInt((getTagIndex(year_as, "on") - 1) / 2)  * 38 ;
			break;
			
		case "M" :
			getClassName(param.id, "datePicker-input", 'input').value =
				myDate.month + "月";
				
				var month_as = getClassName(param.id, 'content-month', 'div').getElementsByTagName('a');
				getClassName(param.id, "month-input", 'input').value = myDate.month + "月";
				
				changeTag(month_as, "on", myDate.month);
				
				
			break;
			
		case "D" :
			getClassName(param.id, "datePicker-input", 'input').value = myDate.day + "日  "; 
			
				var day_as = getClassName(param.id, 'content-day', 'div').getElementsByTagName('a');
				
				//这里是点击按钮之后将标记切换到新的按钮上。暂时不处理，后期根据要求修改。
				
				for(var i = 0, len = day_as.length; i < len; i++){
					if(day_as[i].nodeType == 1 && day_as[i].className.indexOf("on") > -1){
						removeClass(day_as[i], "on");
						break;
					}
				}
				
				for(var i = 0, len = day_as.length; i < len; i++){
					if(day_as[i].nodeType == 1 && day_as[i].firstChild.nodeValue == myDate.day){
						addClass(day_as[i], "on");
						break;
					}
				}
				
			break;
			
		case "H" :
			if(typeof scrollVals == "object"){
				var timer = solveTime(-scrollVals.scrollHours, -scrollVals.scrollMinutes, -scrollVals.scrollSeconds);
			}
			
			getClassName(param.id, "datePicker-input", 'input').value = timer.hours + ":" +
																			timer.minutes + ":" +
																			timer.seconds;
			break;
			
	}
	
	
}

//事件委托，事件处理
function eventHandler(param, myDate, pickerDate, scrollVals, e){
	//获取兼容的事件对象
	e = getEvent(e);
	//获取兼容的目标对象
	var target = getTarget(e);
	
	//将所有的事件目标的class属性，以空格切割组成数组。
	var classNames = target.className.split(" ");
	
	//遍历class属性的数组。
	for(var i = 0; i < classNames.length; i++){
		
		switch(classNames[i]){
			//如果是点击了年的选择框的值。
			case "year-input":
				//兼容浏览器的根据类名获取属性，只获取第一个元素。
				var content_year = getClassName(param.id, 'content-year', 'div'),
					year_as = content_year.getElementsByTagName('a'),
					day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
					num = 0;
				
				
				//判断当前的年的显示框是否是隐藏，如果是隐藏就显示，如果是显示就隐藏
				hasShowMoudule(content_year, param.id, 'content-year', 'div', param);
				
				//如果对象的year属性是数字，并且大于0，那么就将按钮组中值等于year属性的按钮标记为显示。
				if(typeof myDate.year == "number" && myDate.year > 0){
					num = initTag(year_as, "on", myDate.year);
				}else{
					num = initTag(year_as, "on", myDate.currDate.getFullYear());
				}
				
				//判断num变量是否被初始化了，是表示有值，将滚动条移动到该位置上。
				if(typeof num == "undefined"){
					content_year.scrollTop = 12  * 38 ;
				}else{
					content_year.scrollTop = parseInt((num - 1) / 2)  * 38 ;
				}
				
				changeDayTag(day_as, myDate.day);
				break;
			
			//如果是点击了年的按钮组中的时候会触发这个事件，改变选中项的状态，将显示区的值改变。
			case "year_mybtns":
				var year_as = target.parentNode.parentNode.getElementsByTagName('a'),
					day_as = null;
				
				for(var i = 0, len = year_as.length; i < len; i++){
					if(year_as[i].nodeType == 1 && year_as[i].className.indexOf("on") > -1){
						removeClass(year_as[i], "on");
						break;
					}
				}
				
				addClass(target, "on");
				var year = target.firstChild.nodeValue;
				myDate.year = parseInt(year);
				getClassName(param.id, "year-input", 'input').value = year;
				
				if(param.type == "Y-M"){
					showModule(param.id, 'content-year', 'div');
				}else if(param.type !== "Y" ){
					hideModule(param.id, 'content-year', 'div');
				}else{
					getClassName(param.id, "datePicker-input", 'input').value = year;
				}
				
				//处理日期按钮组。
				changeDayBtns(myDate, param);
				day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				changeDayTag(day_as, myDate.day);
				break;
			
			//年的左侧点击按钮，年数递减。
			case "year-prev":
				var content_year = getClassName(param.id, 'content-year', 'div'),
					year_as = getClassName(param.id, 'content-year', 'div').getElementsByTagName('a'),
					year = parseInt(getClassName(param.id, "year-input", 'input').value) - 1,
					day_as = null;
				
				
				if(year <= myDate.currDate.getFullYear() - 25){
					year = myDate.currDate.getFullYear() - 25;
				}
				
				if(param.type === "Y"){
					getClassName(param.id, "datePicker-input", 'input').value = year + "年";
				}
				
				myDate.year = year;
				getClassName(param.id, "year-input", 'input').value = year + "年";
				
				changeTag(year_as, "on", year);
				
				content_year.scrollTop = parseInt((getTagIndex(year_as, "on") - 1) / 2)  * 38 ;
				
				//处理日期按钮组。
				changeDayBtns(myDate, param);
				day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				changeDayTag(day_as, myDate.day);
				break;
				
			//年的右侧侧点击按钮，年数递增。
			case "year-next":
				var content_year = getClassName(param.id, 'content-year', 'div'),
					year_as = getClassName(param.id, 'content-year', 'div').getElementsByTagName('a'),
					year = parseInt(getClassName(param.id, "year-input", 'input').value) + 1,
					day_as = null;
				
				
				if(year >= myDate.currDate.getFullYear() + 24){
					year = myDate.currDate.getFullYear() + 24;
				}
				
				if(param.type === "Y"){
					getClassName(param.id, "datePicker-input", 'input').value = year + "年";
				}
				
				myDate.year = year;
				getClassName(param.id, "year-input", 'input').value = year + "年";
				
				changeTag(year_as, "on", year);
				content_year.scrollTop = parseInt((getTagIndex(year_as, "on") - 1) / 2)  * 38 ;
				
				//处理日期按钮组。
				changeDayBtns(myDate, param);
				day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				changeDayTag(day_as, myDate.day);
				break;
				
			//如果是点击了年的按钮组中的时候会触发这个事件，改变选中项的状态，将显示区的值改变。
			case "month-input":
				
				//兼容浏览器的根据类名获取属性，只获取第一个元素。
				var content_month = getClassName(param.id, 'content-month', 'div'),
					day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				
				//判断当前的年的显示框是否是隐藏，如果是隐藏就显示，如果是显示就隐藏
				hasShowMoudule(content_month, param.id, 'content-month', 'div', param);
				
				//获取所有的年的按钮的a元素的集合。
				var month_as = content_month.getElementsByTagName('a');
				
				initTag(month_as, "on", myDate.currDate.getMonth() + 1);
				
				break;
				
			//如果是点击了年的按钮组中的时候会触发这个事件，改变选中项的状态，将显示区的值改变。
			case "mth_mybtns":
				var month_as = target.parentNode.parentNode.getElementsByTagName('a'),
					day_as = null;
				
				//这里是点击按钮之后将标记切换到新的按钮上。暂时不处理，后期根据要求修改。
				
				for(var i = 0, len = month_as.length; i < len; i++){
					if(month_as[i].nodeType == 1 && month_as[i].className.indexOf("on") > -1){
						removeClass(month_as[i], "on");
						break;
					}
				}
				
				addClass(target, "on");
				
				
				//获取当前的点击的按钮的值。
				var month = target.firstChild.nodeValue;
				//将值赋给每个组件都独立拥有的时间对象。
				myDate.month = parseInt(month);
				//修改输入框的值。
				getClassName(param.id, "month-input", 'input').value = month;
				//隐藏当前区块。
				if(param.type == "Y-M"){
					showModule(param.id, 'content-year', 'div');
					hideModule(param.id, 'content-month', 'div');
				}else if(param.type !== "M"){
					hideModule(param.id, 'content-month', 'div');
				}else{
					getClassName(param.id, "datePicker-input", 'input').value = month;
				}
				
				
				//处理日期按钮组。
				changeDayBtns(myDate, param);
				day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				changeDayTag(day_as, myDate.day);
				break;	
			
			//月的左侧点击按钮，月数递减。
			case "month-prev":
			
				var month_as = getClassName(param.id, 'content-month', 'div').getElementsByTagName('a'),
					month = parseInt(getClassName(param.id, "month-input", 'input').value) - 1,
					day_as = null;
				
				
				if(param.type === "M"){
					getClassName(param.id, "datePicker-input", 'input').value = month + "月";
					if(month < 1){
						month = 12;
					}
					
				}else{
				
					if(month < 1){
					
						if(parseInt(getClassName(param.id, "year-input", 'input').value) >
								myDate.currDate.getFullYear() - 25){
							month = 12;
							getClassName(param.id, "year-input", 'input').value = (--myDate.year) + "年";
						}else{
							month = 1;
						}
						
					}
				
				}
				
				myDate.month = month;
				getClassName(param.id, "month-input", 'input').value = month + "月";
				
				changeTag(month_as, "on", month);
				
				//处理日期按钮组。
				changeDayBtns(myDate, param);
				day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				changeDayTag(day_as, myDate.day);
				break;
				
			//月的右侧点击按钮，月数递增。
			case "month-next":
			
				var month_as = getClassName(param.id, 'content-month', 'div').getElementsByTagName('a'),
					month = parseInt(getClassName(param.id, "month-input", 'input').value) + 1,
					day_as = null;
				
				//获取点击之前的年与月.
				
				if(param.type === "M"){
					getClassName(param.id, "datePicker-input", 'input').value = month + "月";
					if(month > 12){
						month = 1;
					}
					
				}else{
					
					if(month > 12){
					
						if(parseInt(getClassName(param.id, "year-input", 'input').value) <
								myDate.currDate.getFullYear() + 24){
							month = 1;
							getClassName(param.id, "year-input", 'input').value = (++myDate.year) + "年";
						}else{
							month = 12;
						}
					}
					
				}
				
				myDate.month = month;
				getClassName(param.id, "month-input", 'input').value = month + "月";
				changeTag(month_as, "on", month);
				
				//这边是对天数的处理
				var dayType = getDateType(myDate.year, myDate.month);
				
				//获取天数的元素的数组。
				var days = getClassName(param.id, 'content-day', 'div').getElementsByTagName('a');
				
				//处理日期按钮组。
				changeDayBtns(myDate, param);
				day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				changeDayTag(day_as, myDate.day);
				break;
			
			//点击日期按钮组，处理事件程序。
			case "day-mybtns":
				
				var day_as = target.parentNode.parentNode.getElementsByTagName('a');
				
				//这里是点击按钮之后将标记切换到新的按钮上。暂时不处理，后期根据要求修改。
				
				for(var i = 0, len = day_as.length; i < len; i++){
					if(day_as[i].nodeType == 1 && day_as[i].className.indexOf("on") > -1){
						removeClass(day_as[i], "on");
						break;
					}
				}
				
				addClass(target, "on");
				
				
				//获取当前的点击的按钮的值。
				var day = target.firstChild.nodeValue;
				//将值赋给每个组件都独立拥有的时间对象。
				myDate.day = parseInt(day);
				
				if(param.type === "D"){
					getClassName(param.id, "datePicker-input", 'input').value = day + "日";
				}
				break;
			
			//处理点击清空按钮
			case "date-mybtns-close":
				getClassName(param.id, "datePicker-input", 'input').value = "";
				solveDate(myDate, myDate.currDate, param.type);
				break;
				
			//处理点击今天按钮
			case "date-mybtns-today":
				var curr = new Date(),
					timer = solveTime(curr.getHours(), curr.getMinutes(), curr.getSeconds()),
					year_as = getClassName(param.id, 'content-year', 'div').getElementsByTagName('a'),
					month_as = getClassName(param.id, 'content-month', 'div').getElementsByTagName('a'),
					day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
					
				
				if(param.type === "Y"){
					myDate.year = curr.getFullYear();
				}
				
				if(param.type === "Y-M"){
					myDate.year = curr.getFullYear();
					myDate.month = curr.getMonth() + 1;
				}
				
				if(param.type === "D"){
					myDate.day = curr.getDate();
				}
				
				if(param.type === "M"){
					myDate.month = myDate.currDate.getMonth() + 1;
					getClassName(param.id, "month-input", 'input').value = myDate.month + "月";
				}
				
				
				//对自定义日期对象的处理;
				setInputTimeValue("today", myDate, timer, param, curr);
				
				if(!param.showDate){
					hideModule(param.id, 'datePicker-showdate', 'div');
				}
				
				copyDate(pickerDate, myDate);
				changeTag(year_as, "on", myDate.year);
				changeTag(month_as, "on", myDate.month);
				getClassName(param.id, "year-input", 'input').value = myDate.year + "年";
				getClassName(param.id, "month-input", 'input').value = myDate.month + "月";
				changeDayTag(day_as, myDate.day);
				break;
				
			//处理点击确定按钮
			case "date-mybtns-confirm":
				var curr = new Date(),
					timer = solveTime(myDate.hours, myDate.minutes, myDate.seconds),
					year_as = getClassName(param.id, 'content-year', 'div').getElementsByTagName('a'),
					month_as = getClassName(param.id, 'content-month', 'div').getElementsByTagName('a'),
					day_as = getClassNameAll(param.id, 'day-mybtns', 'a');
				//对自定义日期对象的处理
				setInputTimeValue("onday", myDate, timer, param, curr, scrollVals);
				
				if(!param.showDate){
					hideModule(param.id, 'datePicker-showdate', 'div');
				}
				
				copyDate(pickerDate, myDate);
				changeTag(year_as, "on", pickerDate.year);
				changeTag(month_as, "on", pickerDate.month);
				getClassName(param.id, "year-input", 'input').value = pickerDate.year + "年";
				getClassName(param.id, "month-input", 'input').value = pickerDate.month + "月";
				changeDayTag(day_as, pickerDate.day);
				break;
				
			//点击时间模块显示时间选择器。
			case "showTime" :
				hideModule(param.id, 'content-year', 'div');
				hideModule(param.id, 'content-month', 'div');
				showModule(param.id, 'content-date', 'div');
				
				
			    getClassName(param.id, "date-hours", 'ul').style.top = scrollVals.scrollHours * 30 + 'px';
			    getClassName(param.id, "date-minutes", 'ul').style.top = scrollVals.scrollMinutes * 30 + 'px';
			    getClassName(param.id, "date-seconds", 'ul').style.top = scrollVals.scrollSeconds * 30 + 'px';
				break;
			
			//处理小时分钟选择器模块按钮事件
			case "confirm":
				
				var timer = solveTime(-scrollVals.scrollHours, -scrollVals.scrollMinutes, -scrollVals.scrollSeconds);
				
				getClassName(param.id, "showTime", 'input').firstChild.nodeValue =	timer.hours + ":" +
																			timer.minutes + ":" +
																			timer.seconds;
				myDate.hours = parseInt(timer.hours);
				myDate.minutes = parseInt(timer.minutes);
				myDate.seconds = parseInt(timer.seconds);
				
				if(param.type !== "H"){
					hideModule(param.id, 'content-date', 'div');
				}else{
					getClassName(param.id, "datePicker-input", 'input').value = timer.hours + ":" +
																			timer.minutes + ":" +
																			timer.seconds;
				}
				
				break;
				
			//处理小时分钟选择器模块按钮事件
			case "cancel":
				if(param.type !== "H"){
					hideModule(param.id, 'content-date', 'div');
				}
				
				break;
			
			case "datePicker-box":
			case "datePicker-input":
			case "datePicker-icon":
				if(getComputedStyleAttrValue(getClassName(param.id, 'datePicker-showdate', 'div'), "display") == "none"){
					showModule(param.id, 'datePicker-showdate', 'div');
				}else{
					hideModule(param.id, 'datePicker-showdate', 'div');
				}
				
				break;
				
		}
		
	}
	stopPropagation(e);
}

//跨浏览器鼠标滚轮事件处理。
function scrollFunc(e, scrollVals, property) {
	
	if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
        	scrollVals[property]++;
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
        	scrollVals[property]--;
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) { //当滑轮向上滚动时
        	scrollVals[property]--;
        }
        if (e.detail< 0) { //当滑轮向下滚动时
        	scrollVals[property]++;
        }
    }
    
    if(scrollVals.scrollHours >= 0){
    	scrollVals.scrollHours = 0;
    }
    if(scrollVals.scrollHours <= -23){
    	scrollVals.scrollHours = -23;
    }
    
    if(scrollVals.scrollMinutes >= 0){
    	scrollVals.scrollMinutes = 0;
    }
    if(scrollVals.scrollMinutes <= -59){
    	scrollVals.scrollMinutes = -59;
    }
    
    if(scrollVals.scrollSeconds >= 0){
    	scrollVals.scrollSeconds = 0;
    }
    if(scrollVals.scrollSeconds <= -59){
    	scrollVals.scrollSeconds = -59;
    }
	
}

//事件处理程序，鼠标滚动事件。
function scrollHandler(scrollVals, e){
	var num = 0;
	e = getEvent(e);
	var target = getTarget(e);
	preventDefault(e);
	//将所有的事件目标的class属性，以空格切割组成数组。
	var classNames = target.className.split(" ");
	
	if(target.tagName.toLocaleLowerCase() == "a"){
		classNames = target.parentNode.parentNode.className.split(" ");
	}
	
	//遍历class属性的数组。
	for(var i = 0; i < classNames.length; i++){
		
		switch(classNames[i]){
			case "date-hours":
				scrollFunc(e, scrollVals, "scrollHours");
			    target.parentNode.parentNode.style.top = scrollVals.scrollHours * 30 + 'px';
				break;
				
			case "date-minutes":
				scrollFunc(e, scrollVals, "scrollMinutes");
			    target.parentNode.parentNode.style.top = scrollVals.scrollMinutes * 30 + 'px';
				break;
				
			case "date-seconds":
				scrollFunc(e, scrollVals, "scrollSeconds");
			    target.parentNode.parentNode.style.top = scrollVals.scrollSeconds * 30 + 'px';
				break;
		}
	}
	
}

/************************************************************************************************
 * @构造函数时间选择器的基类
 * @param {Object} param
 */
function DatePicker(param){
	
	this.myDate = {
		year : 0,
		month : 0,
		day : 0,
		week : 0,
		hours : 0,
		minutes : 0,
		seconds : 0,
		currDate : new Date()
	};
	
	this.pickerDate = {
		year : 0,
		month : 0,
		day : 0,
		week : 0,
		hours : 0,
		minutes : 0,
		seconds : 0,
		currDate : new Date()
	}
	
	this.param = param;
	
	var myDate = this.myDate,
		pickerDate = this.pickerDate;
	
	//如果不是以new 构造函数的形式使用，就默认使用构造函数的方式调用。
	if(this instanceof DatePicker == false){
		return new DatePicker(param);
	}
	
	
	//对传入的参数的处理
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
		dateSubEle = 	'<div class="datePicker-box">'+
						'<input type="text" class="datePicker-input"/>' +
						'<div class="datePicker-icon">day</div>'+
						'</div>'+
						'<div class="datePicker-showdate">'+
						'<ul class="date-title">'+
						'<li class="mybtn y-l-mybtn"><a class="year-prev" href="javascript:void(0);">◄</a></li>'+
						'<li class="text y-text"><input type="text" name="" class="year-input" value="2016年" /></li>'+
						'<li class="mybtn y-r-mybtn"><a class="year-next" href="javascript:void(0);">►</a></li>'+
						'<li class="mybtn m-l-mybtn"><a class="month-prev" href="javascript:void(0);">◄</a></li>'+
						'<li class="text m-text"><input class="month-input" type="text" name="" id="" value="6月" /></li>'+
						'<li class="mybtn m-r-mybtn"><a class="month-next" href="javascript:void(0);">►</a></li>'+
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
						
			//对于天数的处理
			var dayType = getDateType(myDate.currDate.getFullYear(), myDate.currDate.getMonth() + 1);
			
			//判断，根据返回的日期类型的周判断，如果是7就表示这个月前面没有上个月的天数，如果小于7则返回值是多少就表示有多天。
			
			
			//这里处理的是上个月剩余的天数。
			if(dayType.week < 7){
				for(var i = dayType.prevDay - dayType.week, len = dayType.prevDay; i < len; i++){
					dateSubEle += '<li><a class="not" href="javascript:void(0);"> ' + (i + 1) + ' </a></li>';
				}
			}
			
			//这里处理的是当前月的天数，并且判断如果是当前天数就做一个标记，或者是双休日就做一个标记。		
			for(var i = 0, len = dayType.currDay; i < len; i++){
				
				if(i + 1 != myDate.currDate.getDate()){
					if((i + dayType.week) % 7 == 0 || (i + dayType.week - 6) % 7 == 0){
						dateSubEle += '<li><a class="day-mybtns week" href="javascript:void(0);"> ' + (i+1) + ' </a></li>';
					}else{
						dateSubEle += '<li><a class="day-mybtns" href="javascript:void(0);"> ' + (i+1) + ' </a></li>';
					}
				}else{
					dateSubEle += '<li><a class="day-mybtns on" href="javascript:void(0);"> ' + (i+1) + ' </a></li>';
				}
			}
			
			//这里处理的是下个月的显示天数，	
			
			for(var i = 0, len = 42 - dayType.currDay - dayType.week; i < len; i++){
				dateSubEle += '<li><a class="not" href="javascript:void(0);"> ' + (i + 1) + ' </a></li>';
			}
			
			
			dateSubEle += "</ul></div>"+
							'<div class="content-month">'+
							'<div id="close-month"><a href="javascript:void(0);">×</a></div>'+
							'<ul>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">1月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">2月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">3月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">4月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">5月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">6月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">7月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">8月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">9月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">10月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">11月</a></li>'+
							'<li><a class="mth_mybtns" href="javascript:void(0);">12月</a></li>'+
							'</ul>'+
							'</div>'+
							'<div class="content-year">'+
							'<div id="close-year"><a href="javascript:void(0);">×</a></div>'+
							'<ul>';
			
			var curr = myDate.currDate.getFullYear() - 25;
			
			for(var i = 0; i < 50; i++){
				dateSubEle += '<li><a class="year_mybtns" href="javascript:void(0);">' + (curr++) + '年</a></li>';
			}
			
			dateSubEle += 	'</ul>'+
							'</div>'+
							'<div class="content-date">' +
							'<div class="date-check">' +
							'<span class="cancel">取消</span>' +
							'<span class="confirm">确定</span>' +
							'</div>' +
							'<div class="date-line"></div>' +
							'<ul class="date-hours">';
			
			for(var i = 0; i < 24; i++){
				if(i < 10){
					dateSubEle += '<li><a href="javascript:void(0);">0' + i + '</a></li>';
				}else{
					dateSubEle += '<li><a href="javascript:void(0);">' + i + '</a></li>';
				}
			}
			
			dateSubEle += '</ul><ul class="date-minutes">';
			
			for(var i = 0; i < 60; i++){
				if(i < 10){
					dateSubEle += '<li><a href="javascript:void(0);">0' + i + '</a></li>';
				}else{
					dateSubEle += '<li><a href="javascript:void(0);">' + i + '</a></li>';
				}
			}
			
			dateSubEle += '</ul><ul class="date-seconds">';
			
			for(var i = 0; i < 60; i++){
				if(i < 10){
					dateSubEle += '<li><a href="javascript:void(0);">0' + i + '</a></li>';
				}else{
					dateSubEle += '<li><a href="javascript:void(0);">' + i + '</a></li>';
				}
			}
			
			dateSubEle += 
							'</div>'+
							'<div class="date-bottom">'+
							'<ul class="date-date">'+
							'<li class="key">时间</li>'+
							'<li class="value"><a class="showTime" href="javascript:void(0);">12:00:00</a></li>'+
							'</ul>'+
							'<ul class="date-mybtns">'+
							'<li><a class="date-mybtns-close" href="javascript:void(0);">清空</a></li>'+
							'<li><a class="date-mybtns-today" href="javascript:void(0);">今天</a></li>'+
							'<li><a class="date-mybtns-confirm" href="javascript:void(0);">确定</a></li>'+
							'</ul>'+
							'</div>'+
							'</div>'+
							'</div>';
							
				
			myDateEle.innerHTML = dateSubEle;
			
			
		/******************************************************
		 * DOM元素创建完毕。
		 */
		
		
		//类型的处理，显示与隐藏相关的DOM节点。
		if(typeof param.type != "undefined"){
			
			switch(param.type){
				
				case "Y-M-D-H" :
					//隐藏年模块
					hideModule(param.id, 'content-year', 'div');
					//隐藏月模块
					hideModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					hideModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					showModule(param.id, 'date-date', 'ul');
					//显示天数模块
					showModule(param.id, 'content-day', 'div');
					break;
					
				case "Y-M-D" :
					//隐藏年模块
					hideModule(param.id, 'content-year', 'div');
					//隐藏月模块
					hideModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					hideModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					hideModule(param.id, 'date-date', 'ul');
					//显示天数模块
					showModule(param.id, 'content-day', 'div');
					break;
					
				case "Y-M" :
				
					//隐藏年模块
					hideModule(param.id, 'content-year', 'div');
					//隐藏月模块
					showModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					hideModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					hideModule(param.id, 'date-date', 'ul');
					//显示天数模块
					hideModule(param.id, 'content-day', 'div');
					
					break;
					
				case "Y" :
					//隐藏年模块
					showModule(param.id, 'content-year', 'div');
					//隐藏月模块
					hideModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					hideModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					hideModule(param.id, 'date-date', 'ul');
					//显示天数模块
					hideModule(param.id, 'content-day', 'div');
					
					//隐藏按钮组
					hideModule(param.id, 'm-l-mybtn', 'li');
					hideModule(param.id, 'm-text', 'li');
					hideModule(param.id, 'm-r-mybtn', 'li');
					break;
					
				case "M" :
					//隐藏年模块
					hideModule(param.id, 'content-year', 'div');
					//显示月模块
					showModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					hideModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					hideModule(param.id, 'date-date', 'ul');
					//显示天数模块
					hideModule(param.id, 'content-day', 'div');
					
					//隐藏按钮组
					hideModule(param.id, 'y-l-mybtn', 'li');
					hideModule(param.id, 'y-text', 'li');
					hideModule(param.id, 'y-r-mybtn', 'li');
					break;
					break;
					
				case "D" :
					//隐藏年模块
					hideModule(param.id, 'content-year', 'div');
					//隐藏月模块
					hideModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					hideModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					hideModule(param.id, 'date-date', 'ul');
					//显示天数模块
					showModule(param.id, 'content-day', 'div');
					
					hideModule(param.id, 'date-title', 'ul');
					showModule(param.id, 'date-title2', 'ul');
					
					break;
					
				case "H" :
					//隐藏年模块
					hideModule(param.id, 'content-year', 'div');
					//隐藏月模块
					hideModule(param.id, 'content-month', 'div');
					//隐藏时间选择模块
					showModule(param.id, 'content-date', 'div');
					//显示时间按钮组
					hideModule(param.id, 'date-date', 'ul');
					//显示天数模块
					showModule(param.id, 'content-day', 'div');
					
					hideModule(param.id, 'date-title', 'ul');
					showModule(param.id, 'date-title2', 'ul');
					
					break;
			}
		}
		
		//初始化输入框
		
		//初始化日期数据
		if(param.type === "D"){
			myDate.day = myDate.currDate.getDate();
			myDate.week = myDate.currDate.getDay();
		}
		//初始化日期数据
		if(param.type === "M"){
			myDate.month = myDate.currDate.getMonth() + 1;
		}
		
		solveDate(myDate, myDate.currDate, param.type);
		solveDate(pickerDate, pickerDate.currDate, param.type);
		//初始化隐藏日期模块
		hideModule(param.id, 'datePicker-showdate', 'div');
		
		if(param.showDate){
			showModule(param.id, 'datePicker-showdate', 'div');
		}
		
		if(typeof param.showInput != "undefined" && param.showInput == false){
			hideModule(param.id, 'datePicker-box', 'div');
		}
		
		//初始化数据
		getClassName(param.id, "year-input", 'input').value = myDate.currDate.getFullYear() + "年";
		getClassName(param.id, "month-input", 'input').value = (myDate.currDate.getMonth() + 1) + "月";
		
		var timer = solveTime(myDate.hours, myDate.minutes, myDate.seconds);
		
		getClassName(param.id, "showTime", 'input').firstChild.nodeValue =	timer.hours + ":" +
																			timer.minutes + ":" +
																			timer.seconds;
		
		var el = document.getElementById(param.id);
		//滚动事件处理程序
		var scrollVals = {
			scrollHours : -myDate.hours,
			scrollMinutes : -myDate.minutes,
			scrollSeconds: -myDate.seconds
		}
		
		if(param.type === "H"){
			getClassName(param.id, "date-hours", 'ul').style.top = scrollVals.scrollHours * 30 + 'px';
		    getClassName(param.id, "date-minutes", 'ul').style.top = scrollVals.scrollMinutes * 30 + 'px';
		    getClassName(param.id, "date-seconds", 'ul').style.top = scrollVals.scrollSeconds * 30 + 'px';
		}
		
		
		//点击事件处理程序的包装程序，为其初始化参数。
		function currieClickEventHandler(e){
			eventHandler(param, myDate, pickerDate, scrollVals, e);
		}
		
		//注册点击事件处理程序，使用事件委托机制。
		addEventHandler(el, 'mousedown', currieClickEventHandler);
		
		//天机滚动事件处理
		var scrollEl =  getClassName(param.id, "content-date", 'div');
		
		scrollEl.isSupportMouseWheel = "onmousewheel" in document ? true : false;
		
		
		var currieScrollHandler = function(e){
			scrollHandler(scrollVals, e);
		}
		
		if(scrollEl.isSupportMouseWheel){
			addEventHandler(scrollEl, "mousewheel", currieScrollHandler);
		}else{
			addEventHandler(scrollEl, "DOMMouseScroll", currieScrollHandler);
		}
			
		addEventHandler(document, 'mousedown', function(){
			//隐藏模块
			if(!param.showDate){
				hideModule(param.id, 'datePicker-showdate', 'div');
				copyDate(myDate, pickerDate);
				getClassName(param.id, "year-input", 'input').value = pickerDate.year + "年";
				getClassName(param.id, "month-input", 'input').value = pickerDate.month + "月";
				
				if(getClassName(param.id, "datePicker-input", 'input').value.length > 1){
					setInputTimeValue("onday", pickerDate, timer, param, curr, scrollVals);
				}
			}
		});
		
	}else{
		throw new Error("参数类型不对!");
	}
	
}

//这里是定义一些公共的方法，用于处理或，获取当前时间。

//获取当前的年数。
DatePicker.prototype.getYear = function(){
	if(typeof this.pickerDate.year == "undefined"){
		throw new EvalError("DatePicker years cannot be obtained, see when you use DatePicker constructor," + 
		" set the type property contains the 'Y'!");
	}else{
		return this.pickerDate.year;
	}
}

//设置当前的年数
DatePicker.prototype.setYear = function(val){
	if(typeof this.pickerDate.year == "undefined" || typeof val != "number"){
		throw new EvalError("DatePicker cannot set the year view when you use DatePicker constructor, " + 
			"type property contains 'Y'! Or see if you set up the number of years is correct!");
	}else{
		this.pickerDate.year = val;
	}
}

//获取当前的月数。
DatePicker.prototype.getMonth = function(){
	if(typeof this.pickerDate.month == "undefined"){
		throw new EvalError("DatePicker month cannot be obtained, see when you use DatePicker constructor, " + 
			"set the type property contains'M'!" );
	}else{
		return this.pickerDate.month;
	}
}

//设置当前的月数
DatePicker.prototype.setMonth = function(val){
	if(typeof this.pickerDate.month == "undefined" || typeof val != "number"){
		throw new EvalError("DatePicker month cannot be set, see when you use DatePicker constructor, " + 
			"type property contains'M'! Or see if you set the number of months is right!");
	}else{
		this.pickerDate.month = val;
	}
}

//获取当前的天数。
DatePicker.prototype.getDay = function(){
	if(typeof this.pickerDate.day == "undefined"){
		throw new EvalError("DatePicker days cannot be obtained, see when you use DatePicker constructor," + 
			" set the type property contains'D'!");
	}else{
		return this.pickerDate.day;
	}
}

//设置当前的天数
DatePicker.prototype.setDay = function(val){
	
	if(typeof this.pickerDate.day == "undefined" || typeof val != "number"){
		throw new EvalError("DatePicker cannot set the number of days, see when you use DatePicker constructor, " + 
			"type property contains'D'! Or see if you set the number of days is correct!");
	}else{
		switch(this.param.type){
			case "Y-M-D-H":
			case "Y-M-D":
				var curr = new Date(this.pickerDate.year, this.pickerDate.month - 1, val);
				this.pickerDate.day = val;
				this.pickerDate.week = curr.getDay();
				break;
			case "D":
				this.pickerDate.day = val;
				break;
		}
	}
	
}

//获取当前的周数
DatePicker.prototype.getWeek = function(){
	if(typeof this.pickerDate.week == "undefined"){
		throw new EvalError("DatePicker days cannot be obtained, see when you use DatePicker constructor," + 
			" set the type property contains'D'!");
	}else{
		return this.pickerDate.week;
	}
}

//获取当前的小时
DatePicker.prototype.getHours = function(){
	if(typeof this.pickerDate.hours == "undefined"){
		throw new EvalError("DatePicker cannot get the hours, see when you use DatePicker constructor, " + 
			"set the type property contains 'H'!");
	}else{
		return this.pickerDate.hours;
	}
}

//设置当前的小时
DatePicker.prototype.setHours = function(val){
	if(typeof this.pickerDate.hours == "undefined" || typeof val != "number" || val < 0 || val > 23){
		throw new EvalError("DatePicker cannot set hour, please check when you use DatePicker constructor, " + 
			"type property contains 'H'! Or view, you modify the correct hour");
	}else{
		this.pickerDate.hours = val;
	}
}

//获取当前的分钟
DatePicker.prototype.getMinutes = function(){
	if(typeof this.pickerDate.minutes == "undefined"){
		throw new EvalError("DatePicker cannot get the minutes, please check when you use DatePicker constructor," + 
			" set the type property contains 'H'!" );
	}else{
		return this.pickerDate.minutes;
	}
}

//设置当前的分钟
DatePicker.prototype.setMinutes = function(val){
	if(typeof this.pickerDate.minutes == "undefined" || typeof val != "number" || val < 0 || val > 59){
		throw new EvalError("DatePicker cannot set the minutes, please check when you use DatePicker constructor, " + 
			"type property contains 'H'! Or view, you modify the correct minutes");
	}else{
		this.pickerDate.minutes = val;
	}
}

//获取当前的秒数
DatePicker.prototype.getSeconds = function(){
	if(typeof this.pickerDate.seconds == "undefined"){
		throw new EvalError("DatePicker cannot get the number of seconds, please check when you use DatePicker constructor," + 
			" set the type property contains 'H'!" );
	}else{
		return this.pickerDate.seconds;
	}
}

//设置当前的秒数
DatePicker.prototype.setSeconds = function(val){
	if(typeof this.pickerDate.seconds == "undefined" || typeof val != "number" || val < 0 || val > 59){
		throw new EvalError("DatePicker cannot set the number of seconds, please check when you use DatePicker constructor, " + 
			"type property contains 'H'! Or see if you modify the number of seconds is the correct");
	}else{
		this.pickerDate.seconds = val;
	}
}
