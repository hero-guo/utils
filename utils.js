/**
 * Created by neil on 16/7/8.
 */
// import _ from 'lodash';


/**
 * @description 格式化url参数 parseUrlQuery
 * @param {url} http://google.com/?id=5&foo=bar
 * @return {id: 5, foo: 'bar'}
 */
function parseUrlQuery(url) {
  if (url.indexOf('?') === -1) return {};
  return url.split('?')[1].split('&').reduce((pre, value) => {
    const arr = value.split('=');
    return {
      ...pre,
      [arr[0]]: arr[1]
    };
  }, {});
}
/**
 * @description 转换对象=>url参数 serializeObject
 * @param {obj} {foo: 'bar', id: 5}
 * @param {separator} 连接符 默认{&}
 * @return 'foo=bar&id=5'
 */
function serializeObject(obj, separator = '&') {
  if (typeof obj === 'string') return obj;
  return Object.keys(obj).reduce((pre, key) => [
    ...pre,
    `${key}=${obj[key]}`
  ], []).join(separator);
}
 /**
  * @description 数组快速排序
  * @param {arr1} 需要排序数组
  * @return 从小到大排序的数组
  */
 function quicksort(arr) {
  if (arr.length <= 1) return arr;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [], right = [];
  arr.forEach(v => {
    if (v < pivot) {
      left.push(v);
    } else {
      right.push(v);
    }
  });
  return quicksort(left).concat([pivot], quicksort(right));
}
/**
 * @description 数组去重
 * @param {arr}
 * @return 数组
 */
function es6Unique(arr) {
  const items = new Set(arr);
  return Array.from(items);
}

/**
 * @description 数组去重
 * @param {arr}
 * @return 数组
 */
 function unique(arr) {
   const newArr = [];
   arr.forEach(v => {
     if (newArr.indexOf(v) == -1) newArr.push(v);
   });
   return newArr;
 }
 /**
  * @description 观察者模式事件
  * @param {on, emit, off, once}
  * @return
  */
  const myEvent = ((function() {
    let handlers = {};
    function on(evt, func) {
      handlers[evt] = handlers[evt] || [];
      handlers[evt].push(func);
    }
    function once(evt, func) {
      handlers[evt] = [];
      handlers[evt].push(func);
    }
    function off(evt, func) {
      const handler = handlers[evt];
      if (handler) {
        for (let i = 0; i < handler.length; i++) {
          if (handler[i] === func) {
            handler.splice(i, 1);
            return;
          }
        }
      }
    }
    function emit(evt, arg) {
      if (handlers[evt]) {
        for (let i = 0; i < handlers[evt].length; i++) {
          handlers[evt][i](arg);
        }
      }
    }
    return {
      on,
      once,
      off,
      emit,
    };
  })());
/**
 * @description this 软绑定
 * @param obj
 * @return
 */
 function softBind(obj) {
   if (!Function.prototype.softBind) {
     Function.prototype.softBind = function (obj) {
       var fn = this;
       var curried = [].slice.call(arguments, 1);
       var bound = function() {
         return fn.apply(
           (!this || this === (window || global)) ? obj : this,
           curried.concat.apply(curried, arguments)
         );
       };
       bound.prototype = Object.create(fn.prototype);
       return bound;
     }
   }
 }
/**
 * @description 找出字符串中第一个不重复项
 * @param
 * @return
 */
if (!String.prototype.findFirst) {
  String.prototype.findFirst = function () {
    var arr = Array.from(this), i = 0;
    var newarr = arr.slice(0);
    newarr.splice(0, 1);
    while (newarr.includes(arr[i])) {
      newarr.splice(i, 0, arr[i]);
      i++;
      newarr.splice(i, 1);
    }
    return arr[i];
  }
}
/**
 * @description 将字节数转换成对应单位
 * @param
 *  b = 字节数
 *  opts{
 *   decimals: 2, // 保留小数位数
 *   factor: 1024, // 转换基数
 *   unti: 'GB' // 最大单位
 *  }
 * @return
 */
const defaults = {
  decimals: 2,
  factor: 1024,
  unti: 'GB'
};
const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
function round(f, opts, i = 0) {
  const {factor, decimals} = opts;
  const value = f / factor;
  const index = unit.findIndex(n => n === (opts.unti || 'GB'));
  if (!~index) {
    throw new Error('unti Error');
  }
  i++;
  if (f % factor === f || i === -~index) {
    const dec = 10 ** decimals;
    const preValue = Math.floor(f * dec) / dec;
    return `${preValue} ${unit[i - 1]}`;
  }
  return round(value, opts, i);
}
function byte2any(b, opts) {
  if (!b) return 0;
  const option = Object.assign({}, defaults, opts);
  return round(b, option);
}

/**
 * @description 函数防抖
 * @param
 *  fn,
 *  delay
 * @return
 */
function debounce(fn, delay = 160) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
/**
 * @description 函数节流
 * @param
 *  fn,
 *  delay
 * @return
 */
function throttle(fn, delay = 160) {
  let timer;
  let start = +new Date();
  return function (...args) {
    const cur = +new Date();
    clearTimeout(timer);
    if (cur - start >= delay) {
      fn.apply(this, args);
      start = cur;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  }
}
const utils = {
  parseUrlQuery,
  serializeObject,
  quicksort,
  myEvent,
  softBind,
  byte2any,
  throttle,
  debounce
}
export default utils;
