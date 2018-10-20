/**
 * 存储localStoage
 * @param {*} name 
 * @param {*} content 
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 * @param {*} name 
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 * @param {*} name 
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

// 用于get方法后面参数的拼接，传入data是对象
export const getUrlConcat = function (data) {
  let dataStr = ''; //数据拼接字符串
  let url = ''
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&')); // 去除掉最后一个"&"字符
    url = url + '?'+ dataStr;
  }
  return url
}