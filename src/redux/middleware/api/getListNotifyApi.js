import { API_URL } from '../../../settings/index'
import { userProfile } from '../../../settings/index'
import axios from 'axios'
export function getListNotifyApi() {
    return axios.get(`${API_URL}/notification`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userProfile.access_token}`,
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

export function checkNotifyApi(id) {
    return axios.put(`${API_URL}/notification/${id}`, { seen: true }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userProfile.access_token}`,
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