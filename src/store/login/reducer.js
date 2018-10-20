import * as login from './action-type'

let defaultState = {
  username: '00'
}

// 用户消息
export const userInfo = (state = defaultState, action = {}) => {
  switch (action.type) {
    case login.SAVEUSERINFO:
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}