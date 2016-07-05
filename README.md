# datePicker 时间选择器
兼容IE(6/7/8/9/10/11(Edg))、 Chrome、Firefox、Safari、Opera 等浏览器的一个时间选择器插件，简称日历插件。

##使用方法
1.首先引入 datePicker.css 和datePicker.js文件，

2.接着使用一个div元素来作为日历插件的容器。这个容器的大小大约是 width <= 235px and  height <= 35px;如下所示：
<div class="datePicker" id="xx"></div>

3.new DatePicker()构造函数,这里可以省略new 关键字，内部已经处理，但不建议这么做。传入必选参数id,和显示的类型就可以使用了。 如下所示：
var mydat = new DatePicker({id:"myce", type : "Y"});
var mydat2 = DatePicker({id:"myce", type : "Y"});

##parameter 参数

### id 属性
必传项    要使用的日历容器的id属性，如果不传入该参数会报错。

### type 属性
必传项    要使用的日历的显示风格，会影响到后面的获取时间。

该属性包含下列值。
#### "Y-M-D-H"  年月日和时间都显示。
#### "Y-M-D"    年月日显示。
#### "Y-M"      年和月显示。
#### "Y"        只显示年。
#### "M"        只显示月。
#### "D"        只显示天数。
#### "H"        只显示时间。

### showDat 是否显示日历主体， 默认为false，隐藏的。如果设置为true，那么就不会再隐藏了。

### showInput 是否显示输入框，默认为true表示显示这个输入框，如果false，那么久不会再显示了。



##method 方法
####getYear()         获取年。
####setYear(val)      设置年。
####getMonth()        获取月。
####setMonth(val)     设置月。
####getDay()          获取天数。
####setDay(val)       设置天数。
####getWeek()         获取周。
####getHours()        获取小时。
####setHours(val)     设置小时。
####getMinutes()      获取分钟。
####setMinutes(val)   设置分钟。
####getSeconds()      获取秒数。
####setSeconds(val)   设置秒数。



