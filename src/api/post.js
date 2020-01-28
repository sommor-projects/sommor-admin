import { axios } from '@/utils/request'

export function getPostList (params) {
  return axios({
    url: '/post/list',
    params,
    method: 'get'
  })
}

export function renderPostForm ({ id, type }) {
  return axios({
    url: '/post/form',
    params: { id, type },
    method: 'get'
  })
}

export function savePost (params) {
  return axios.post('/post/save', params)
}

export function deletePost (record) {
  return axios.post('/post/' + record.id + '/delete')
}
