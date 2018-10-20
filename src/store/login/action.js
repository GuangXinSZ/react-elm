import * as login from './action-type'

// 保存用户消息
export const saveUserInfo = (value) => {
  return {
    type: login.SAVEUSERINFO,
    value
  }
}