import request from '@/utils/request'

export function createCronJob(data) {
  return request({
    url: '/k8s/cronjob',
    method: 'post',
    data
  })
}

export function getCronJobItemOrList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let url = "/k8s/cronjob/" + namespace
  let query = []
  if (name !== undefined && name !== "") {
    query.push("name=" + name)
  }
  if (keyword !== undefined && keyword !== "") {
    query.push("keyword=" + keyword)
  }
  if (query.length > 0) {
    url = url + "?" + query.join("&")
  }
  return request({
    url: url,
    method: "get",
  })
}

export function deleteCronJob(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/cronjob/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}
