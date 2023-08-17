import {createRole, getRoleDetailOrList, deleteRole} from "@/api/role"

const state = {
  podName: ""
}

const mutations = {}

const actions = {
  createRole({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createRole(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除
  deleteRole({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteRole(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看列表
  getRoleDetailOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getRoleDetailOrList(params).then(res => {
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

