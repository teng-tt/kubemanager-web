import {getDashboardData} from "@/api/metrics"

const state = {
	podName: ""
}

const mutations = {}

const actions = {
	// 查看列表
	getMetricsDashboard({commit, state}) {
    return new Promise((resolve, reject) => {
      getDashboardData().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
