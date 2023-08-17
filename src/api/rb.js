import request from '@/utils/request'


export function deleteRb(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/rb/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}


export function createRb(data) {
  return request({
    url: '/k8s/rb',
    method: 'post',
    data
  })
}

export function getRbDetailOrList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let url = "/k8s/rb"
  let query = []
  if (namespace !== undefined && namespace !== "") {
    query.push("namespace=" + namespace)
  }
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

