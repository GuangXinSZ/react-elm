import * as user from './action-type'

// 保存用户消息
export const saveUserInfo = (value) => {
  return {
    type: user.SAVE_USERINFO,
    value
  }
}
/**
 * 保存图片
 * @param {*} value 
 */
export const saveAvander = (imgPath) => {
  return {
    type: user.SAVE_AVANDER,
    imgPath
  }
}

// 保存图片地址
export const saveImg = path => {
  return {
    type: user.SAVEIMG,
    path,
  }
}

// 修改用户名
export const resetUserInfo = (datatype, value) => {
  return {
    type: user.RESET_USERINFO,
    datatype,
    value,

  }
}
