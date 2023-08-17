import {getPVList,createPV,deletePV} from "@/api/pv"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createPV({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createPV(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除cm
  deletePV({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deletePV(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看Pod详情或列表
  getPVList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getPVList(params).then(res => {
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

