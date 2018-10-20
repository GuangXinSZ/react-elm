// 全局配置

let baseUrl = ''
let routerMode = 'hash'
let imgUrl
if (process.env.NODE_ENV === 'development'){
  imgUrl = '/img/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '//elm.cangdu.org'
  imgUrl = '//elm.cangdu.org/img/'
}

export default {
  baseUrl,
  routerMode,
  imgUrl
}

