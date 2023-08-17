import request from '@/utils/request'

export function matchImage(params) {
  let url = '/harbor/match?keyword=' + params.keyword
  return request({
    url: url,
    method: 'get'
  })
}

export function getProjects(params) {
  let query = []
  let url = '/harbor/projects'
  let currentPage = params.currentPage
  let pageSize = params.pageSize
  let keyword = params.keyword
  if (currentPage !== undefined && currentPage !== "") {
    query.push("currentPage=" + currentPage)
  }
  if (pageSize !== undefined && pageSize !== "") {
    query.push("pageSize=" + pageSize)
  }
  if (keyword !== undefined && keyword !== "") {
    query.push("keyword=" + keyword)
  }
  if (query.length > 0) {
    url = url + "?" + query.join("&")
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function getRepositories(params) {
  let query = []
  let url = '/harbor/projects/' + params.projectName
  let currentPage = params.currentPage
  let pageSize = params.pageSize
  let keyword = params.keyword
  if (currentPage !== undefined && currentPage !== "") {
    query.push("currentPage=" + currentPage)
  }
  if (pageSize !== undefined && pageSize !== "") {
    query.push("pageSize=" + pageSize)
  }
  if (keyword !== undefined && keyword !== "") {
    query.push("keyword=" + keyword)
  }
  if (query.length > 0) {
    url = url + "?" + query.join("&")
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function getArtifacts(params) {
  let query = []
  let repositoryName = params.repositoryName
  let projectName = params.projectName
  let currentPage = params.currentPage
  let url = '/harbor/projects/' + projectName + "/repositories/" + repositoryName
  let pageSize = params.pageSize
  let keyword = params.keyword
  if (currentPage !== undefined && currentPage !== "") {
    query.push("currentPage=" + currentPage)
  }
  if (pageSize !== undefined && pageSize !== "") {
    query.push("pageSize=" + pageSize)
  }
  if (keyword !== undefined && keyword !== "") {
    query.push("keyword=" + keyword)
  }
  if (query.length > 0) {
    url = url + "?" + query.join("&")
  }
  return request({
    url: url,
    method: 'get'
  })
}
