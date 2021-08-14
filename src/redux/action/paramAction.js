export const SET_DATA = 'SET_DATA'
export const SET_URL = 'SET_URL'
export const CLEAR_STATE = 'CLEAR_STATE'
export const UPDATE_IMAGE = 'UPDATE_IMAGE'

export const actParamAction = (data) => {
    return {
        type: SET_DATA,
        data: data
    }
}
export const actParamUrlAction = ({ category, url }) => {
    return {
        type: SET_URL,
        data: { category, url }
    }
}

export const actParamClearAction = () => {
    return {
        type: CLEAR_STATE
    }
}
export const actUpdateImage = (data) => {
    return {
        type: UPDATE_IMAGE,
        data: data
    }
}