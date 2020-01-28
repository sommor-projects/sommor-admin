import { axios } from '@/utils/request'

export function renderUserForm ({ id }) {
  return axios({
    url: '/user/form',
    params: { id },
    method: 'get'
  })
}

export function saveUserForm (params) {
  return axios.post('/taxonomy/save', params)
}
