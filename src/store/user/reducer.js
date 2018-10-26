import * as user from './action-type'

let defaultState = {
  imgpath: '//elm.cangdu.org/img/1669599be6119829.jpg', //图片地址
  addressList: [],   // 地址列表
  addressName: '',  // 选中的地址
  temMessage: '', //临时姓名
  hasAddressList: [], // 已有的地址
  operate: '',
  temAddress: {
    message: ''
  },  //临时数据
}

// 用户消息
export const userInfo = (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SAVE_USERINFO:
      return {
        ...state,
        ...action.value
      }
    case user.RESET_USERINFO:
      return {...state, ...{[action.datatype]: action.value}};
    default:
      return state
  }
}