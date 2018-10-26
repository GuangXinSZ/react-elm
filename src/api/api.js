import Server from './server'
import {getUrlConcat} from '../utils/commons'
class API extends Server{
  /**
   *  用途：获取验证码
   *  @url http://cangdu.org:8001/v1/captchas
   *  返回status为1表示成功
   *  @method get
   *  @return {promise}
   */
  async getCaptchaCode(params = {}) {
    try{
      let result = await this.axios('post', '/v1/captchas', params, {})
      if (result.status === 1 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取验证码失败',
          response: result,
          data: params,
        }
        throw err
      }
    } catch(err){
      throw err
    }
  }
    /**
   *  用途：账号密码登录
   *  @url http://cangdu.org:8001/v2/login
   *  @method post
   *  @return {promise}
   */
  async accountLogin (params = {}, data) {
    console.log(params, 'pra')
    try {
      let result = await this.axios('post', '/v2/login', params, data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '登录失败',
          response: result,
          data: params,
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

   /**
   * 获取用户消息
   * @param {*} get的拼接参数
   */
  async getUser (params = {}) {
    try {
      let result = await this.axios('get', '/v1/user' + getUrlConcat(params) , params)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '登录失败',
          response: result,
          data: params,
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }

   /**
   *  用途：上传图片
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async uploadImg(params = {}){
    try{
      let result = await this.axios('post', '//elm.cangdu.org/v1/addimg/shop', params); 
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: '上传图片失败',
          response: result,
          data: params,
          url: '//elm.cangdu.org/v1/addimg/shop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }


   /**
   *  用途：上传图片
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async getAddress(params = {}, id){
    try{
      let result = await this.axios('get', '/v1/users/' + id + '/addresses', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取地址失败',
          response: result,
          data: params,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  async searchPois(params = {}, keyword){
    try{
      let result = await this.axios('get', '/v1/pois/?type=nearby&keyword=' + keyword, params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取附件失败',
          response: result,
          data: params,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

}

export default new API()