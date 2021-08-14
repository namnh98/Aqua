export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const actLoginAction = (data) => {
    return {
        type: LOGIN,
        data: data
    }
}