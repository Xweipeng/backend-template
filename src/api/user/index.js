import http from '../http'

/**
 * @description 登录接口
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
export function login(userName,password){
	return http.post('/backend/login',{
		userName,
		password
	})
}
