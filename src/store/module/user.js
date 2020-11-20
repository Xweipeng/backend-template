import { setToken, getToken } from '@/libs/util'
import { login } from '../../api/user'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: [],
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      	state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      	state.userId = id
    },
    setUserName (state, name) {
      	state.userName = name
    },
    setAccess (state, access) {
      	state.access = access
    },
    setToken (state, token) {
      	state.token = token
      	setToken(token)
    },
    removeToken (state) {
      state.token = ''
      setToken('')
  	},
    setHasGetInfo (state, status) {
      	state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login(userName, password).then(res => {
          var data = res.data.data
          commit('setToken', data.token)
          commit('setAvator', data.avator)
          commit('setUserName', data.name)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          commit('setHasGetInfo', true)
          resolve(data)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    }
  }
}
