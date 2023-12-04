import { loginApi, logoutApi, getInfoApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        const { data } = res
        if (data) {
          commit('SET_USER', data)
          resolve(data)
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 恢复登录
  getInfo({ commit, state }) {

    // 获取用户信息
    return new Promise((resolve, reject) => {
      getInfoApi().then(res=>{
        if (typeof res === 'string') {
          reject()
        } else {
          commit('SET_USER', res.data)
          resolve()
        }
      }).catch(error=>{
        reject()
      })
    })

  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logoutApi().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

