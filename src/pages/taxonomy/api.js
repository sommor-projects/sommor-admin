import { axios } from '@/utils/request'

export function getTaxonomyTrees (params) {
  return axios({
    url: '/taxonomy/trees',
    params,
    method: 'get'
  })
}

export function getTaxonomyList (params) {
  return axios({
    url: '/taxonomy/list',
    params,
    method: 'get'
  })
}

export function forwardTaxonomy (record) {
  return axios.post('/taxonomy/update-priority', {
    id: record.id,
    direction: 'forward'
  })
}

export function backwardTaxonomy (record) {
  return axios.post('/taxonomy/update-priority', {
    id: record.id,
    direction: 'backward'
  })
}

export function deleteTaxonomy (record) {
  return axios.post('/taxonomy/delete', {
    id: record.id
  })
}
