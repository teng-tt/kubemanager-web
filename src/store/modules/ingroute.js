import {createIngRoute, getIngRouteItemOrList, deleteIngRoute, getMiddlewareList} from "@/api/ingroute"

const state = {
  podName: ""
}

const mutations = {
  SET_POD_NAME: (state, podName) => {
    state.podName = podName
  }
}

const actions = {
  createIngRoute({commit, state}, params) {
    return new Promise((resolve, reject) =>
      createIngRoute(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除cm
  deleteIngRoute({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteIngRoute(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //查看Pod详情或列表
  getIngRouteItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getIngRouteItemOrList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  getMiddlewareList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getMiddlewareList(params).then(res => {
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

