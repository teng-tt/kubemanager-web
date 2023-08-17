import {createSa, getSaList,deleteSa} from "@/api/sa"

const state = {
  podName: ""
}

const mutations = {
}

const actions = {
  createSa({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createSa(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除
  deleteSa({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteSa(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看列表
  getSaList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getSaList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

