import { API_URL } from '../../../settings/index'
import { userProfile } from '../../../settings/index'
import axios from 'axios'
export function changePasswordApi(data) {

   return axios.put(`${API_URL}/user/change-password/${userProfile.user_id}`, data, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer  ${userProfile.access_token}`,
      },
      timeout: 1000 * 6,

   })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
}
