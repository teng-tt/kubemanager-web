import {createSvc, getSvcItemOrList,deleteSvc} from "@/api/svc"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createSvc({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createSvc(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除cm
  deleteSvc({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteSvc(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看Pod详情或列表
  getSvcItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getSvcItemOrList(params).then(res => {
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

