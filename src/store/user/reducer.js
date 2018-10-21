import * as user from './action-type'

let defaultState = {
  username: '00'
}

// 用户消息
export const userInfo = (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SAVE_USERINFO:
      return {
        ...state,
        ...action.value
      }
    case user.SAVE_AVANDER:
      return {
        ...state,
        ...action.imgPath
      }
    default:
      return state
  }
}