import { API_URL, userProfile } from '../../../settings/index'
import axios from 'axios'
export function createSO(data) {
   return axios.post(`${API_URL}/sell-out`, data, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userProfile.access_token}`,
      },
      timeout: 1000 * 10,

   })
      .then((response) => {

         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
}

export function updateSO(data) {
   return axios.put(`${API_URL}/sell-out/${data.id}`, data, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userProfile.access_token}`,
      },
      timeout: 1000 * 10,

   })
      .then((response) => {
         console.log(response.data);
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
}


export function DetailSO(data) {
   return axios.get(`${API_URL}/sell-out/${data}`, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userProfile.access_token}`,
      },
   })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         return error.response.data
      })
}
