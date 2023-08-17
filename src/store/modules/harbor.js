import {getProjects, getRepositories, getArtifacts,matchImage} from '@/api/harbor'

const state = {}

const mutations = {}

const actions = {
  //匹配镜像
  matchImage({commit, state},params) {
    return new Promise((resolve, reject) => {
      matchImage(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getProjects({commit, state},params) {
    return new Promise((resolve, reject) => {
      getProjects(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRepositories({commit, state}, params) {
    return new Promise((resolve, reject) => {
      getRepositories(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getArtifacts({commit, state}, params) {
    return new Promise((resolve, reject) => {
      getArtifacts(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

