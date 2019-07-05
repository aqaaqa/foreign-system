import { login, logout, roleList, activate } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { saveObjArr, getObjArr, filterAsyncRouter, getState, removeObjArr } from '@/utils/role'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getObjArr('name'),
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  role: getObjArr()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.userId)
        commit('SET_NAME', data.username)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' )
        setToken(data.id)
        saveObjArr('name', data.username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user role
  getRole({ commit, state}) {
    return new Promise((resolve, reject) => {
      roleList().then(response => {
        const { data } = response
        const { items } = data
        let getRouter = filterAsyncRouter(getState(items)) //过滤路由
        getRouter.push({ 
          path: '*', 
          redirect: '/404', 
          hidden: true
        })
        commit('SET_ROLE', getRouter)
        saveObjArr('router', getRouter) //存储路由到localStorage
        resolve(getRouter)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user role
  getNewRole({ commit, codes},params) {
    return new Promise((resolve, reject) => {
      activate({id:params.id,code: params.code}).then(response => {
        if(response.code == 20000) {
          const { data } = response
          const { items } = data
          let getRouter = filterAsyncRouter(getState(items)) //过滤路由
          commit('SET_ROLE', getRouter)
          saveObjArr('router', getRouter) //存储路由到localStorage
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeObjArr('router')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
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

