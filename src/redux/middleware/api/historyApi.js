import { API_URL, userProfile } from '../../../settings/index'
import axios from 'axios'
export function getHistoryApi(data) {
   const urlGetAll = `${API_URL}/sell-out`
   const urlFilter = `${API_URL}/sell-out?end=${data?.dayEnd}&start=${data?.dayStart}&statusId=${data?.statusId}`
   return axios.get(data === undefined ? urlGetAll : urlFilter, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userProfile.access_token}`,
      },
      timeout: 1000 * 6,

   }).then(function (response) {
      return response.data
      // handle response
   }).catch((error) => {
      return error.response.data
   })

}
