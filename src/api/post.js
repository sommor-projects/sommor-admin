import { axios } from '@/utils/request'

export function getRootTaxonomyTrees () {
  return axios({
    url: '/taxonomy/trees/root',
    method: 'get'
  })
}

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

export function renderTaxonomyForm ({ id, parentId }) {
  return axios({
    url: '/taxonomy/form',
    params: { id, parentId },
    method: 'get'
  })
}

export function saveTaxonomy (params) {
  return axios.post('/taxonomy/save', params)
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
  return axios.post('/taxonomy/' + record.id + '/delete')
}
