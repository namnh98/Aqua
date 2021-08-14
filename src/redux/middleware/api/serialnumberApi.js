import axios from 'axios'
import { API_URL } from '../../../settings/index'

export function getSerialNumberApi(data) {
   console.log('data goi api:==============> ', data)
   return axios.get(`${API_URL}/common/serial/${data}`, {
      headers: {
         'Content-Type': 'application/json',
      },
      timeout: 1000 * 5,

   })

      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error
      })
}
