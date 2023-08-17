import {createStatefulSet, getStatefulSetItemOrList,deleteStatefulSet} from "@/api/statefulset"

const state = {}

const mutations = {}

const actions = {
  createStatefulSet({commit, state}, data) {
    return new Promise((resolve, reject) =>
      createStatefulSet(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    )
  },
  //查看Pod详情或列表
  getStatefulSetItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getStatefulSetItemOrList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除Pod
  deleteStatefulSet({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteStatefulSet(params).then(res => {
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

