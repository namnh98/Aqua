import axios from 'axios';
import { API_URL } from '../../../settings/index';

export function SignUpApi(data) {
    return axios.post(`${API_URL}/user`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 1000 * 6,

    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data
        })
}

