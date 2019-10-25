/**
 * @author wuaixiaoyao
 * @date 2019/10/24
 * @Description:
*/
import axios from 'axios'
import cookies from 'js-cookie'
import { Modal ,Toast} from 'antd-mobile';
import '../styles/antd.modal.css'

axios.defaults.timeout = 10000;//10秒超时

const CancelToken = axios.CancelToken
// 维护一个数组，用来保存所有请求的cancelToken
let cancelTokens = []

// 取消所有请求，同时清空cancelTokens
function cancelAllQuestAndIntCancelTokens() {
  cancelTokens.forEach(c => c())
  cancelTokens = []
}


// token异常重新登陆处理
function tokenErrorToLogin(code) {
  cancelAllQuestAndIntCancelTokens()
  const tipsMap = {
    '-997': '您的账号在异地登录，若非本人操作请重新登录并修改密码！',
    '-998': '您的token已过期，请重新登录！',
    '-999': 'token有误，请重新登录！'
  }
  //token异常提示
  Toast.info(tipsMap[code])

}
function judgeIsFileType(response) {//判断contentType是否为文件类型
  const contentType = response.headers['content-type'] ? response.headers['content-type'] : ''
  if(contentType && (contentType.indexOf('application/octet-stream') !== -1 || contentType.indexOf('application/vnd.ms-excel') !== -1
            || contentType.indexOf('application/x-download') !== -1 || contentType.indexOf('application/msexcel') !== -1)) {
    return true
  }
  return false
}

// 请求拦截
axios.interceptors.request.use(requestConfig => {
  const token = cookies.get('jwt');
  if (token) {
    requestConfig.headers['token'] = token
  }
  requestConfig.headers['terminalId'] = window.navigator.userAgent;
  requestConfig.cancelToken = new CancelToken((c) => {
    // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
    // 将请求的取消请求的函数push进cancelTokens统一维护
    cancelTokens.push(c)
  })
  return requestConfig
}, error => {

})

// 响应拦截
axios.interceptors.response.use(response => {
  if (response && judgeIsFileType(response)) {
    return Promise.resolve(response)
  }
  if (response && response.data && response.data.code) {
    let { code, msg } = response.data
    code = Number(code)
    let message = msg;
    switch (code) {
    case 0: return Promise.resolve(response.data.data) // 请求成功
    case -1: break;
    case -5:
      message = '服务器错误';
      break; // 服务器错误
    case -30002:
      cancelAllQuestAndIntCancelTokens();
      Modal.alert('账号被冻结',
        //4000 529 299
        '您的账号被冻结，您可联系客服进行咨询了解 ，客服电话 13510989559',
        [{text: '我知道了', onPress: () => {
          let userAgent = navigator.userAgent;
          if (userAgent.indexOf('Firefox') !== -1 || userAgent.indexOf('Chrome') !==-1) {
            window.history.back();
            window.close();
          }else if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
            window.history.back();
            window.close();
          }else {
            window.opener = null;
            window.close();
          }

        }}]);
      return Promise.reject(response.data)
    case -997:
    case -998:
    case -999:
      tokenErrorToLogin(code)
      return Promise.reject(response.data)
    default: break
    }
    Toast.info(message);
    return Promise.reject(response.data)
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  if (error && error.response) {
    const { status } = error.response
    let description = '请检查您的的网络'
    switch (status) {
    case 404: description = '未找到资源'; break
    case 405: description = '请求方法不支持'; break
    case 403: description = '禁止访问'; break
    case 401: description = '未授权'; break
    case 400: description = '请求参数错误'; break
    case 500: description = '服务器错误'; break
    case 502: description = '网关错误 502，请联系开发人员'; break
    default: break
    }
    Toast.info(description);
  }
  return Promise.reject(error)
})

export const request = ({ method, url, headers, data }) => {
  const config = {
    headers,
    method,
    url
  }
  switch (method) {
  case 'GET': config.params = data; break
  case 'POST': config.data = data; break
  case 'PUT': config.data = data; break
  case 'PATCH': config.data = data; break
  case 'DELETE': config.data = data; break
  default: break
  }
  return axios(config).catch(error => {
    throw error
  })
}



