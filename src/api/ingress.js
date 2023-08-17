import request from '@/utils/request'


export function deleteIngress(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/ingress/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}


export function createIngress(data) {
  return request({
    url: '/k8s/ingress',
    method: 'post',
    data
  })
}

export function getIngressItemOrList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let url = "/k8s/ingress/" + namespace
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

