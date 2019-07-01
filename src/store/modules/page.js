import { saveObjArr, getObjArr } from '@/utils/role'

const state = {
  pageId: getObjArr('page'),
  menu: getObjArr('menu')
}

const mutations = {
  SET_PAGEID: (state, pageId) => {
    state.pageId = pageId
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  setId({commit}, id) {
    commit('SET_PAGEID', id)
    saveObjArr('pageId', id)
  },
  changeMenu({commit}, data) {
    commit('SET_MENU', data)
    saveObjArr('menu', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}