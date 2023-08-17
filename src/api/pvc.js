import request from '@/utils/request'


export function deletePVC(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/pvc/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}


export function createPVC(data) {
  return request({
    url: '/k8s/pvc',
    method: 'post',
    data
  })
}

export function getPVCList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let url = "/k8s/pvc/" + namespace
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

