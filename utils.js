/**
 * Created by Escape on 16/7/8.
 */
import _ from 'lodash';
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
 * @description 数组排序
 * @param {arr1} 需要排序数组
 * @param {arr2} 需要排序数组
 * @param {fn} 排序条件 func
 * @return []
 */
 function arrSort(arr1, ...rest) {
   const [arr, fn] = rest;
   if (_.isFunction(arr)) {
     return arr1.sort(arr);
   }
   return fn ? arr1.sort(fn) : arr1.sort((a, b) => {arr.indexOf(a.id) - arr.indexOf(b.id)});
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
 function unique(arr) {
   const newArr = [];
   arr.forEach(v => {
     if (newArr.indexOf(v) == -1) newArr.push(v]);
   });
   return newArr;
 }
 /**
  * @description 观察者模式事件
  * @param {on, emit, off, once}
  * @return
  */
  const Event = ((function() {
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
  function init() {
    handlers = {};
  }
  return {
    on,
    once,
    off,
    emit,
    init,
  };
})());
// const unique_Es6 = arr => arr.filter((v, i) => arr.indexOf(v) === i);
const utils = {
  parseUrlQuery: parseUrlQuery,
  serializeObject: serializeObject,
  arrSort: arrSort,
  quicksort: quicksort,
  Event: Event
}
export default utils;
