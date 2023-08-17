import request from '@/utils/request'

export function createJob(data) {
  return request({
    url: '/k8s/job',
    method: 'post',
    data
  })
}

export function getJobItemOrList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let nodeName = params.nodeName
  let url = "/k8s/job/" + namespace
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

export function deleteJob(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/job/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}
