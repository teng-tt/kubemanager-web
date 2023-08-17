import {createDaemonSet, getDaemonSetItemOrList,deleteDaemonSet} from "@/api/daemonset"

const state = {}

const mutations = {}

const actions = {
  createDaemonSet({commit, state}, data) {
    return new Promise((resolve, reject) =>
      createDaemonSet(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    )
  },
  //查看Pod详情或列表
  getDaemonSetItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getDaemonSetItemOrList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除Pod
  deleteDaemonSet({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteDaemonSet(params).then(res => {
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

