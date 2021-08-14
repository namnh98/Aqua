export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const actSignUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data
    }
}