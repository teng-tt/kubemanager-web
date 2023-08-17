import {createJob, getJobItemOrList,deleteJob} from "@/api/job"

const state = {}

const mutations = {}

const actions = {
  createJob({commit, state}, data) {
    return new Promise((resolve, reject) =>
      createJob(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    )
  },
  //查看Pod详情或列表
  getJobItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getJobItemOrList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除Pod
  deleteJob({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteJob(params).then(res => {
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

