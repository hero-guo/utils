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
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [], right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quicksort(left).concat([pivot], quicksort(right));
}
/**
 * @description 数组去重
 * @param {arr}
 * @return 数组
 */
 function unique(arr) {
   var newArr = [];
   for (var i = 0; i < arr.length; i++) {
     if (newArr.indexOf(arr[i]) == -1) newArr.push(arr[i]);
   }
   return newArr;
 }
const utils = {
  parseUrlQuery: parseUrlQuery,
  serializeObject: serializeObject,
  arrSort: arrSort,
  quicksort: quicksort
}
export default utils;
