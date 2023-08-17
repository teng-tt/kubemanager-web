import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";

export function createStatefulSet(data) {
  return request({
    url: '/k8s/statefulset',
    method: 'post',
    data
  })
}

export function getStatefulSetItemOrList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let nodeName = params.nodeName
  let url = "/k8s/statefulset/" + namespace
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

export function deleteStatefulSet(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/statefulset/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}
