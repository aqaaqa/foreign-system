import { saveObjArr, getObjArr } from '@/utils/role'
import { letterArr } from '@/utils/auth'

const state = {
  pageId: getObjArr('page'),
  menu: getObjArr('menu'),
  letter: [1,2,3]
}

const mutations = {
  SET_PAGEID: (state, pageId) => {
    state.pageId = pageId
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_LETTER: (state, letter) => {
    state.letter = letter
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
  },
  setLetter({commit}) {
    commit('SET_LETTER',letterArr())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}