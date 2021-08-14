import axios from 'axios'
import { API_URL } from '../../../settings/index'

export function getListModelNameApi() {
    return axios.get(`${API_URL}/common/model`, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 1000 * 6,
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data
        })

}