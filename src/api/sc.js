import request from '@/utils/request'


export function deleteSc(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/sc/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}


export function createSc(data) {
  return request({
    url: '/k8s/sc',
    method: 'post',
    data
  })
}

export function getScList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let url = "/k8s/sc/" + namespace
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

