import request from '@/utils/request'


export function deleteSa(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/sa/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}


export function createSa(data) {
  return request({
    url: '/k8s/sa',
    method: 'post',
    data
  })
}

export function getSaList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let url = "/k8s/sa/" + namespace
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

