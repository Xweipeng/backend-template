import axios from 'axios'
import {Notice} from 'iview'
import router from '@/router'
import config from '../config'

var defaultHttp = axios.create({
    baseURL: config.baseUrl[config.env],
    timeout: 10000,
    headers: {'Content-Type':'application/json'},
});

defaultHttp.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var token=localStorage.getItem('token')
    if(token){
        config.headers.Authorization=token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
defaultHttp.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code!='00'){
        if(response.data.code==='E10001'){
            Notice.error({
                title: '未登录或登陆过期，请重新登录',
                desc: ''
            });
            localStorage.removeItem('token')
            router.push('/login')
        }else{
            Notice.error({
                title: response.data.msg||'未知错误',
                desc: ''
            });
        }
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    console.log(error)
    if(!error.response){
        Notice.error({
            title: '服务器错误或未知错误',
            desc: ''
        });
    }
    return Promise.reject(error);
});

export default defaultHttp
