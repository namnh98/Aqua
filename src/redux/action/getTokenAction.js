export const GET_TOKEN = 'GET_TOKEN'
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS'
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR'

export const getTokenAction = (data) => {
    return {
        type: GET_TOKEN,
        data: data
    }
}