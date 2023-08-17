import {getPVCList, createPVC, deletePVC} from "@/api/pvc"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createPCV({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createPVC(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除cm
  deletePVC({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deletePVC(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看Pod详情或列表
  getPVCList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getPVCList(params).then(res => {
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

