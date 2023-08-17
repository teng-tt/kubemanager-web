import {createCronJob, getCronJobItemOrList, deleteCronJob} from "@/api/cronjob"

const state = {}

const mutations = {}

const actions = {
  createCronJob({commit, state}, data) {
    return new Promise((resolve, reject) =>
      createCronJob(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    )
  },
  //查看Pod详情或列表
  getCronJobItemOrList({commit, state}, params) {
    return new Promise((resolve, reject) =>
      getCronJobItemOrList(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    )
  },
  //删除Pod
  deleteCronJob({commit, state}, params) {
    return new Promise((resolve, reject) =>
      deleteCronJob(params).then(res => {
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

