/**
 * Created by Escape on 16/7/5.
 */
/**
 * @description 格式化url参数 parseUrlQuery
 * @param {url} http://google.com/?id=5&foo=bar
 * @return {id: 5, foo: 'bar'}
 */
export function parseUrlQuery(url) {
  if (url.indexOf('?') === -1) return {};
  return url.split('?')[1].split('&').reduce((pre, value) => {
    const arr = value.split('=');
    return {
      ...pre,
      [arr[0]]: arr[1]
    };
  }, {});
}
export function getToken(globalState) {
  return globalState.auth.user.sid;
}
export function loggedIn(globalState) {
  return globalState.auth && globalState.auth.user;
}
