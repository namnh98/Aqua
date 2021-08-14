import { API_URL } from '../../../settings/index'
import { userProfile } from '../../../settings/index'
import axios from 'axios'
export function getTokenApi(data) {
    return axios.put(`${API_URL}/notification/token`, data, {
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