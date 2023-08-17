import {createRb, getRbDetailOrList, deleteRb} from "@/api/rb"

const state = {
  podName: ""
}

const mutations = {}

const actions = {
  createRb({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createRb(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除
  deleteRb({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteRb(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看列表
  getRbDetailOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getRbDetailOrList(params).then(res => {
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

