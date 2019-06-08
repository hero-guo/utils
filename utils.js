/**
 * Created by neil on 16/7/8.
 */
// import _ from 'lodash'


/**
 * @description 格式化url参数 parseUrlQuery
 * @param {url} http://google.com/?id=5&foo=bar
 * @return {id: 5, foo: 'bar'}
 */
function parseUrlQuery(url) {
  if (url.indexOf('?') === -1) return {}
  return url.split('?')[1].split('&').reduce((pre, value) => {
    const arr = value.split('=')
    return {
      ...pre,
      [arr[0]]: arr[1]
    }
  }, {})
}
/**
 * @description 转换对象=>url参数 serializeObject
 * @param {obj} {foo: 'bar', id: 5}
 * @param {separator} 连接符 默认{&}
 * @return 'foo=bar&id=5'
 */
function serializeObject(obj, separator = '&') {
  if (typeof obj === 'string') return obj
  return Object.keys(obj).reduce((pre, key) => [
    ...pre,
    `${key}=${obj[key]}`
  ], []).join(separator)
}
 /**
  * @description 数组快速排序
  * @param {arr1} 需要排序数组
  * @return 从小到大排序的数组
  */
 function quicksort(arr) {
  if (arr.length <= 1) return arr
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  const left = [], right = []
  arr.forEach(v => {
    if (v < pivot) {
      left.push(v)
    } else {
      right.push(v)
    }
  })
  return quicksort(left).concat([pivot], quicksort(right))
}
/**
 * @description 数组去重
 * @param {arr}
 * @return 数组
 */
function es6Unique(arr) {
  const items = new Set(arr)
  return Array.from(items)
}

/**
 * @description 数组去重
 * @param {arr}
 * @return 数组
 */
 function unique(arr) {
   const newArr = []
   arr.forEach(v => {
     if (newArr.indexOf(v) == -1) newArr.push(v)
   })
   return newArr
 }
 /**
  * @description 观察者模式事件
  * @param {on, emit, off, once}
  * @return
  */
  const myEvent = ((function() {
    let handlers = {}
    function on(evt, func) {
      handlers[evt] = handlers[evt] || []
      handlers[evt].push(func)
    }
    function once(evt, func) {
      handlers[evt] = []
      handlers[evt].push(func)
    }
    function off(evt, func) {
      const handler = handlers[evt]
      if (handler) {
        for (let i = 0 i < handler.length i++) {
          if (handler[i] === func) {
            handler.splice(i, 1)
            return
          }
        }
      }
    }
    function emit(evt, arg) {
      if (handlers[evt]) {
        for (let i = 0 i < handlers[evt].length i++) {
          handlers[evt][i](arg)
        }
      }
    }
    return {
      on,
      once,
      off,
      emit,
    }
  })())
/**
 * @description this 软绑定
 * @param obj
 * @return
 */
 function softBind(obj) {
   if (!Function.prototype.softBind) {
     Function.prototype.softBind = function (obj) {
       var fn = this
       var curried = [].slice.call(arguments, 1)
       var bound = function() {
         return fn.apply(
           (!this || this === (window || global)) ? obj : this,
           curried.concat.apply(curried, arguments)
         )
       }
       bound.prototype = Object.create(fn.prototype)
       return bound
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
    var arr = Array.from(this), i = 0
    var newarr = arr.slice(0)
    newarr.splice(0, 1)
    while (newarr.includes(arr[i])) {
      newarr.splice(i, 0, arr[i])
      i++
      newarr.splice(i, 1)
    }
    return arr[i]
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
}
const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
function round(f, opts, i = 0) {
  const {factor, decimals} = opts
  const value = f / factor
  const index = unit.findIndex(n => n === (opts.unti || 'GB'))
  if (!~index) {
    throw new Error('unti Error')
  }
  i++
  if (f % factor === f || i === -~index) {
    const dec = 10 ** decimals
    const preValue = Math.floor(f * dec) / dec
    return `${preValue} ${unit[i - 1]}`
  }
  return round(value, opts, i)
}
function byte2any(b, opts) {
  if (!b) return 0
  const option = Object.assign({}, defaults, opts)
  return round(b, option)
}
/**
 * @description Promise polyfill
 */
function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') { //because x could resolved by a Promise Object
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {
    return v
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {
    throw r
  }

  if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onResolved
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onRejected
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'pending') {
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      self.onRejectedCallback.push(function(reason) {
          try {
            var x = onRejected(reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (r) {
            reject(r)
          }
        })
    })
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = function(fn) {
  return this.then(function(v){
    setTimeout(fn)
    return v
  }, function(r){
    setTimeout(fn)
    throw r
  })
}

Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues = new Array(promiseNum)
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}

Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(function(value) {
        return resolve(value)
      }, function(reason) {
        return reject(reason)
      })
    }
  })
}

Promise.resolve = function(value) {
  var promise = new Promise(function(resolve, reject) {
    resolvePromise(promise, value, resolve, reject)
  })
  return promise
}

Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason)
  })
}

/**
 * @description 函数防抖
 * @param
 *  fn,
 *  delay
 * @return
 */
function debounce(fn, delay = 160) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
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
  let timer
  let start = +new Date()
  return function (...args) {
    const cur = +new Date()
    clearTimeout(timer)
    if (cur - start >= delay) {
      fn.apply(this, args)
      start = cur
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}
/**
 * @description 合并两个排序数组
 * @param
 * @return
 */
function mergeSort(a, b) {
  var result = [], il = 0, ir = 0
  var al = a.length, bl = b.length
  
  while (il < al && ir < bl) {
    if (a[il] < b[ir]) {
      result.push(a[il++])
    } else {
      result.push(b[ir++])
    }
  }
  while (a[il]) {
    result.push(a[il++])
  }
  while (b[ir]) {
    result.push(b[ir++])
  }
  return result
}
/**
 * @description 展开数组
 * @param arr
 * @return
 */
function flat(arr) {
  return arr.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flat(cur)) : acc.concat(cur), [])  
}
/**
 * @description 洗牌算法
 * @param arr
 * @return
 */
function shuffle(arr) {
  let len = arr.length
  const result = []
  while(len) {
    const index = Math.floor(Math.random() * len)
    const val = arr.splice(index, 1)[0]
    result.push(val)
    len--
  }
  return result
}
/**
 * @description 随机生成 Emoji
 * @param arr
 * @return
 */
function randomEmoji(num = 1) {
  return Array.from({length: num},(v, i) => String.fromCodePoint(129300 + Math.floor(Math.random() * 20)))
}
/**
 * @description 数字千分位
 * @param string
 * @return
 */
function splitNum(num, opts = {}) {
  let result = ''
  if (typeof num !== 'number') {
    throw new Error('num is not number')
  }
  if (Number.toLocaleString) {
    result = num.toLocaleString(opts)
  }
  if (!result) {
    result = num.toString().replace(/(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return result
}
const utils = {
  randomEmoji,
  shuffle，
  flat,
  parseUrlQuery,
  serializeObject,
  quicksort,
  myEvent,
  softBind,
  byte2any,
  throttle,
  debounce,
  Promise
}
export default utils
