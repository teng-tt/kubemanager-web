import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";

export function createDeployment(data) {
  return request({
    url: '/k8s/deployment',
    method: 'post',
    data
  })
}

export function getDeploymentItemOrList(params) {
  let namespace = params.namespace
  let name = params.name
  let keyword = params.keyword
  let nodeName = params.nodeName
  let url = "/k8s/deployment/" + namespace
  let query = []
  if (nodeName !== undefined && nodeName !== "") {
    query.push("nodeName=" + nodeName)
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

export function deleteDeployment(params) {
  let namespace = params.namespace
  let name = params.name
  let url = "/k8s/deployment/" + namespace + "/" + name
  return request({
    url: url,
    method: "delete",
  })
}
