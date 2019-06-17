/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. 
 * 限制功能的执行。
 * Especially useful for rate limiting execution of handlers on events like resize and scroll.
 * 对于调整大小和滚动等事件的处理程序的速率限制执行特别有用。
 *
 * @param  {Number}    delay
 * A zero-or-greater delay in milliseconds.
 * 一个零或更大的延迟，以毫秒为单位。
 * For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * 对于事件回调，大约100或250（或甚至更高）的值是最有用的。
 * 
 * @param  {Boolean}   [noTrailing]
 * Optional, defaults to false.
 * 可选，默认为false。
 * If noTrailing is true, callback will only execute every `delay` milliseconds while the throttled-function is being called.
 * 如果 noTrailing 为 true ，则回调只会每`delay`毫秒在throttled-function被调用时执行一次。
 * If noTrailing is false or unspecified, callback will be executed one final time after the last throttled-function call. 
 * 如果noTrailing为false或未指定，则在最后一个throttled-function被调用之后，最后再执行一次回调。 
 * 尢尢😶： 下面这句话不是很理解❓
 * (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset)
 * （在没有调用`delay`毫秒的节流函数之后，内部计数器被重置）
 * 
 * @param  {Function}  callback
 * A function to be executed after delay milliseconds.
 * 延迟毫秒后执行的函数。
 * The `this` context and all arguments are passed through, as-is, to `callback` when the throttled-function is executed.
 * 当执行限制函数时，`this`上下文和所有参数按原样传递给`callback`。
 * 
 * @param  {Boolean}   [debounceMode]
 * 尢尢😶： debounce中默认是false
 * If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. 
 * 如果`debounceMode`为真（开始时），则在`delay` ms之后安排`clear`执行。
 * If `debounceMode` is false (at end), schedule `callback` to execute after `delay` ms.
 * 如果`debounceMode`为false（结束时），则在`delay` ms之后安排`callback`执行。
 *
 * @return {Function}  A new, throttled, function.
 */
module.exports = function ( delay, noTrailing, callback, debounceMode ) {

	// After wrapper has stopped being called, this timeout ensures that `callback` is executed at the proper times in `throttle` and `end` debounce modes.
	// 在封装器停止被调用之后，timeoutID 确保在`throttle`和`end`去抖模式下在适当的时间执行`callback`。
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	// 跟踪上次执行`callback`的时间。
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
    // “noTrailing”默认为false。
    // 尢尢😶： noTrailing 是一个可选参数，如果没有传入，则将后面两个参数前移
	if ( typeof noTrailing !== 'boolean' ) {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing functionality and when executed will limit the rate at which `callback` is executed.
	// `wrapper`函数封装了所有节流/去抖动功能，并且在执行时将限制执行`callback`的速率。
	function wrapper () {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		// 执行`callback`并更新`lastExec`时间戳。
		function exec () {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag to allow future `callback` executions.
		// 如果`debounceMode`为true（在开始时），则用于清除标志以允许将来的`callback`执行。
		function clear () {
			timeoutID = undefined;
		}

		if ( debounceMode && !timeoutID ) {
			// Since `wrapper` is being called for the first time and `debounceMode` is true (at begin), execute `callback`.
			// 由于第一次调用`wrapper`并且`debounceMode`为true（在开始时），执行`callback`。
			exec();
		}

		// Clear any existing timeout.
		// 清除已有的定时器。
		if ( timeoutID ) {
			clearTimeout(timeoutID);
		}

        // 尢尢😶
        // Q：为什么要判断 debounceMode？
		// A：如果不判断 debounceMode， 那么当 debounceMode = true 时，会执行两次。
		// Q：那为什么不写成 debounceMode !== true 或者 !debounceMode ?
		// A: 似乎用于区分 throttle 或者 debounce 函数, debounce 只是 throttle 多一个参数
		// 尢尢😶：当下一次执行的时间点和上一次执行的时间点之差 大于 限制时间，即不要节流，则直接执行
		if ( debounceMode === undefined && elapsed > delay ) {
			// In throttle mode, if `delay` time has been exceeded, execute `callback`.
			// 在节流模式下，如果(当前时间距离上一次exce执行时间)超过`delay`时间，执行`callback`。
			exec();
        // 尢尢😶：当 debounceMode 有值 或者 需要节流， 且 noTrailing !== true （当值为undefined或false；它的值默认false？）
		// Q：noTrailing 的意义是什么？
		// A：滚动事件吗？ 最后一次调用是否执行 callback， 保证滚动的位置是最后操作的位置
		} else if ( noTrailing !== true ) {
			// In trailing throttle mode, since `delay` time has not been exceeded, schedule `callback` to execute `delay` ms after most recent execution.
			// 在“需要最后执行一次回调”节流模式下，由于没有超过`delay`时间，所以在最近执行之后安排`callback`执行`delay`ms。
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms.
			// 如果`debounceMode`为真（开始时），请在`delay` ms之后安排`clear`执行。
			//
			// If `debounceMode` is false (at end), schedule `callback` to execute after `delay` ms.
            // 如果`debounceMode`为false（结束时），则在`delay` ms之后安排`callback`执行。
            //
            // 尢尢😶： 就只有三种情况会进入这个代码片段
            // 尢尢😶： throttle 在“需要最后执行一次回调”节流模式下， exec 在 （delay - elapsed）ms后执行
            // 尢尢😶： debounce 在“一开始就执行”防抖模式下， clear 在 delayms后执行
            // 尢尢😶： debounce 在“delay毫秒后执行”防抖模式下， exec 在 delay ms后执行
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}

	}

	// Return the wrapper function.
	// 返回包装函数。
	return wrapper;

};
