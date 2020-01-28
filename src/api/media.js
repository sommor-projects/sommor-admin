import { axios } from '@/utils/request'

export function deleteMediaFile (record) {
  return axios.post('/media/delete', {
    id: record.id
  })
}
