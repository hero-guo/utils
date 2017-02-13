'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  return url.split('?')[1].split('&').reduce(function (pre, value) {
    var arr = value.split('=');
    return _extends({}, pre, _defineProperty({}, arr[0], arr[1]));
  }, {});
}
/**
 * @description 转换对象=>url参数 serializeObject
 * @param {obj} {foo: 'bar', id: 5}
 * @param {separator} 连接符 默认{&}
 * @return 'foo=bar&id=5'
 */
function serializeObject(obj) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';

  if (typeof obj === 'string') return obj;
  return Object.keys(obj).reduce(function (pre, key) {
    return [].concat(_toConsumableArray(pre), [key + '=' + obj[key]]);
  }, []).join(separator);
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
  var left = [],
      right = [];
  arr.forEach(function (v) {
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
  var items = new Set(arr);
  return Array.from(items);
}
/**
 * @description 数组去重
 * @param {arr}
 * @return 数组
 */
function unique(arr) {
  var newArr = [];
  arr.forEach(function (v) {
    if (newArr.indexOf(v) == -1) newArr.push(v);
  });
  return newArr;
}
/**
 * @description 观察者模式事件
 * @param {on, emit, off, once}
 * @return
 */
var myEvent = function () {
  var handlers = {};
  function on(evt, func) {
    handlers[evt] = handlers[evt] || [];
    handlers[evt].push(func);
  }
  function once(evt, func) {
    handlers[evt] = [];
    handlers[evt].push(func);
  }
  function off(evt, func) {
    var handler = handlers[evt];
    if (handler) {
      for (var i = 0; i < handler.length; i++) {
        if (handler[i] === func) {
          handler.splice(i, 1);
          return;
        }
      }
    }
  }
  function emit(evt, arg) {
    if (handlers[evt]) {
      for (var i = 0; i < handlers[evt].length; i++) {
        handlers[evt][i](arg);
      }
    }
  }
  return {
    on: on,
    once: once,
    off: off,
    emit: emit
  };
}();
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
      var bound = function bound() {
        return fn.apply(!this || this === (window || global) ? obj : this, curried.concat.apply(curried, arguments));
      };
      bound.prototype = Object.create(fn.prototype);
      return bound;
    };
  }
}
var utils = {
  parseUrlQuery: parseUrlQuery,
  serializeObject: serializeObject,
  quicksort: quicksort,
  myEvent: myEvent,
  softBind: softBind
};
exports.default = utils;