# utils

整理常用工具函数

### URL处理
parseUrlQuery(url)

 * @description 格式化url参数 parseUrlQuery
 * @param {url} http://google.com/?id=5&foo=bar
 * @return {id: 5, foo: 'bar'}
 
serializeObject(obj, separator = '&')

 * @description 转换对象=>url参数 serializeObject
 * @param {obj} {foo: 'bar', id: 5}
 * @param {separator} 连接符 默认{&}
 * @return 'foo=bar&id=5'

### 数组处理

quicksort(arr)

 * @description 数组快速排序
 * @param {arr1} 需要排序数组
 * @return 从小到大排序的数组
 
es6Unique(arr)

 * @description 数组去重
 * @param {arr}
 * @return 数组
