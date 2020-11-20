import axios from 'axios'
import { Notice } from 'view-design'
import router from '@/router'
import config from '../config'
import store from '@/store'

var defaultHttp = axios.create({
  baseURL: config.baseUrl[config.env],
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

defaultHttp.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.getItem('token')
  if (!config.params) config.params = {}
  config.params.token = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
defaultHttp.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code == 401 || response.data.code == 403) {
    console.log('登录过期')
    Notice.error({
      title: '未登录或登陆过期，请重新登录',
      desc: ''
    })
    store.commit('removeToken')
    router.push('/login')

    return Promise.reject(response.data)
  } else if (response.data.code != 0 && (response.data.code + '').length != 9) {
    Notice.error({
      title: response.data.msg || '未知错误',
      desc: ''
    })
    return Promise.reject(response.data)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  if (!error.response) {
    Notice.error({
      title: '服务器错误或未知错误',
      desc: ''
    })
  }
  return Promise.reject(error)
})

export default defaultHttp
