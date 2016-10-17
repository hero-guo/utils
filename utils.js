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
function es6Unique(arr) {
  const items = new Set(arr);
  //return [...items]; return [...new Set(arr)];
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
/**
 * @description 图表数据排序
 * @param data   arr
 * @param rowOrCol bool true: 根据首行排序； false: 根据首列排序
 * @return []
 */
function dataSort(data, rowOrCol) {
  //当前仅对数据首行/列是数字时进行排序, 否则返回原数组
  const xData = data[0].slice(1);
  const yData = data.map(v => v[0]).slice(1);
  const xAxisData = rowOrCol ? xData : yData;
  const isNumeber = xAxisData.every((v) => !isNaN(v));
  if (isNumeber) {
    //序列数据取行时排序
    const d = data.map(v => v.slice(1));
    const xD = d.map(v => {
      const newArr = []; //转换成对象
      v.forEach((k, i) => {
        newArr.push({[d[0][i]]: k});
      });
      return newArr;
    })
    .map(v => v.sort((a, b) => Object.keys(a) - Object.keys(b))) //根据第一行排序
    .map((v, i) => {
      //转回数组,并填充数据第一例
      const arr = [data.map(k => k[0])[i]];
      v.forEach((k) => {
        arr.push(k[Object.keys(k)]);
      });
      return arr;
    });
    return rowOrCol ? xD : [ // true: 根据数据第一行排序; false: 根据数据第一列排序
      data[0],
      ...data.slice(1).sort((a, b) => Number(a[0]) - Number(b[0]))
    ];
  }
  return data;
}
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
const utils = {
  parseUrlQuery: parseUrlQuery,
  serializeObject: serializeObject,
  arrSort: arrSort,
  quicksort: quicksort,
  Event: Event,
  dataSort: dataSort,
  softBind: softBind
}
export default utils;
