import { API_URL } from '../../../settings/index'
import axios from 'axios'
export function loginApi(data) {
   return axios.post(`${API_URL}/user/login`, data, {
      headers: {
         'Content-Type': 'application/json',
      },
      timeout: 1000 * 5,
   })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
}
