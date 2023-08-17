import {createDeployment, getDeploymentItemOrList,deleteDeployment} from "@/api/deployment"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createDeployment({commit, state}, data) {
    return new Promise((resolve, reject) =>
      createDeployment(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    )
  },
  //查看Pod详情或列表
  getDeploymentItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getDeploymentItemOrList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除Pod
  deleteDeployment({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteDeployment(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  setPodName({commit, state}, name) {
    commit("SET_POD_NAME", name)
  },
  getPodName({commit, state}) {
    return state.podName
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

