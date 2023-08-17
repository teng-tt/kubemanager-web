import {getScList,createSc,deleteSc} from "@/api/sc"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createSc({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createSc(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除cm
  deleteSc({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteSc(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看Pod详情或列表
  getScList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getScList(params).then(res => {
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

