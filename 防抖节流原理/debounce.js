/* eslint-disable no-undefined */

var throttle = require('./throttle');

/**
 * Debounce execution of a function. 
 * 去抖函数的执行。
 * Debouncing, unlike throttling, guarantees that a function is only executed a single time, either at the very beginning of a series of calls, or at the very end.
 * 与限制不同，去抖可以保证函数只在一系列调用的最开始时执行，或者在最后执行。
 *
 * @param  {Number}   delay
 * A zero-or-greater delay in milliseconds.
 * 以毫秒为单位的零或更大延迟。
 * For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * 对于事件回调，大约100或250（或甚至更高）的值是最有用的。
 * 
 * @param  {Boolean}  [atBegin]
 * Optional, defaults to false. 
 * 可选，默认为false。
 * If atBegin is false or unspecified, callback will only be executed `delay` milliseconds after the last debounced-function call. 
 * 如果atBegin为false或未指定，则回调将仅在最后一次去抖函数调用后的 `delay`毫秒执行。
 * If atBegin is true, callback will be executed only at the first debounced-function call. 
 * 如果atBegin为true，则仅在第一次去抖动函数调用时执行回调。
 * (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 *（在没有调用`delay`毫秒的节流函数之后，内部计数器被重置）。
 * 
 * @param  {Function} callback
 * A function to be executed after delay milliseconds. 
 * 延迟毫秒后执行的函数。
 * The `this` context and all arguments are passed through, as-is, to `callback` when the debounced-function is executed.
 * 当执行去抖动函数时，`this`上下文和所有参数按原样传递给`callback`。
 *
 * @return {Function} A new, debounced function.
 */
module.exports = function ( delay, atBegin, callback ) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};
