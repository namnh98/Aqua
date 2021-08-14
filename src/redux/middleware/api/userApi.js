import axios from 'axios'
import { API_URL } from '../../../settings/index'
import { userProfile } from '../../../settings/index'
export function getUserApi() {
   return axios.get(`${API_URL}/user/${userProfile.user_id}`, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userProfile.access_token}`,
      },
      timeout: 1000 * 6,
   }).then((response) => {
      return response.data
   }).catch((error) => {
      return error.response.data
   })
}

export function updateUserApi(data) {
   // console.log(data, 'apiiiiiiiiii')
   return axios.put(`${API_URL}/user/${userProfile.user_id}`, data, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer  ${userProfile.access_token}`,
      },
   }).then((response) => {
      return response.data
   }).catch((error) => {
      return error.response.data
   })
}
