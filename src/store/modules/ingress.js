import {createIngress, getIngressItemOrList,deleteIngress} from "@/api/ingress"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createIngress({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createIngress(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除cm
  deleteIngress({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteIngress(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看Pod详情或列表
  getIngressItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getIngressItemOrList(params).then(res => {
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

