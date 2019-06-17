// 封装的 console.log 方法，用于更加清晰的显示执行过程
function consoleLog () {
	const colorList = ['red', 'green', 'lightblue', 'pink'];
	var arr = [...arguments];
	var first = arr.shift();
	if (typeof first === 'string') {
		var aFirst = first.split('');
		var count = 0;
		try {
			aFirst.forEach(i => i === '#' ? (count += 1) : new Error('aaaa'));
		} catch (e) {
		}
	}
	var style = count ? ('color: ' + colorList[count - 1]) : '';
	first = (count ? '%c ' : '') + first;
	console.log(first, style, ...arr);
}

// throttle 源码
function throttle ( delay, noTrailing, callback, debounceMode ) {
	consoleLog('# 执行【throttle】函数 ------');
	var timeoutID;
	var lastExec = 0;
	consoleLog('# 定义 timeoutID', timeoutID);
	consoleLog('# 定义 lastExec', lastExec);
    
	if ( typeof noTrailing !== 'boolean' ) {
		consoleLog('# 因为没有设置可选参数 noTrailing, 所以将 cb 和 dm 的参数位置前移');
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}
	consoleLog('# 参数：',JSON.stringify({delay, noTrailing, callback, debounceMode}));

	function wrapper () {
		consoleLog('## 执行【wrapper】函数 ------');

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;
		consoleLog('## 定义 self ', self);
		consoleLog('## 定义 elapsed ', elapsed);
		consoleLog('## 定义 args ', args);

		function exec () {
			consoleLog('### 执行【exec】------');
			lastExec = Number(new Date());
			consoleLog('### 重置上一次的执行时间点 lastExec ', lastExec, '@注意');
			consoleLog('### 准备执行回调函数 ');
			callback.apply(self, args);
		}

		function clear () {
			consoleLog('### 执行【clear】------');
			timeoutID = undefined;
			consoleLog('### 重置 timeoutID ', timeoutID);
		}

		if ( debounceMode && !timeoutID ) {
			consoleLog('## “第一次”立即执行');
			exec();
		}
		if ( timeoutID ) {
			consoleLog('## 清除定时器, 准备执行 clearTimeout(', timeoutID, ')');
			clearTimeout(timeoutID);
			consoleLog('## clearTimeout(timeoutID) ', timeoutID);
		}

		if ( debounceMode === undefined && elapsed > delay ) {
			consoleLog('## 【没有设置debounceMode】，且事件间隔大于限制时间, 准备执行 exec');
			exec();
		} else if ( noTrailing !== true ) {
			consoleLog('## 【noTrailing 的值不为true】, 准备设置定时器');
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
			consoleLog('## 设置 timeoutID', timeoutID, 'cb为', debounceMode ? 'clear' : 'exec', 'delay 为', debounceMode === undefined ? (delay - elapsed) : delay, '@注意');
		}

	}

	consoleLog('# 准备返回 wrapper 函数');
	return wrapper;
};

// debounce 源码
function debounce( delay, atBegin, callback ) {
    consoleLog('# 执行【debounce】函数 ------');
	consoleLog('# 参数：',JSON.stringify({delay, atBegin: callback === undefined ? false : atBegin, callback: callback === undefined ? atBegin : callback}));
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};

// 调试
var throttleDemo1 = throttle(
	3000,
	true,
    (value) => {
        consoleLog('#### 节流内容：', value);
    }
);
setTimeout(() => {throttleDemo1('1')}, 0);
setTimeout(() => {throttleDemo1('2')}, 1000);
setTimeout(() => {throttleDemo1('3')}, 2000);
setTimeout(() => {throttleDemo1('4')}, 3000);
setTimeout(() => {throttleDemo1('5')}, 4000);

