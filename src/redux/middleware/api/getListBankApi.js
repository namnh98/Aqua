import { API_URL } from '../../../settings/index';
import axios from 'axios'
export function getListBankApi() {
    return axios.get(`${API_URL}/common/bank`, {
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

