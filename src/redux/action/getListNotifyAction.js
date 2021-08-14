export const GET_LIST_NOTIFY = 'GET_LIST_NOTIFY'
export const GET_LIST_NOTIFY_SUCCESS = 'GET_LIST_NOTIFY_SUCCESS'
export const GET_LIST_NOTIFY_ERROR = 'GET_LIST_NOTIFY_ERROR'

export const CHECK_NOTIFY = 'CHECK_NOTIFY'
export const CHECK_NOTIFY_SUCCESS = 'CHECK_NOTIFY_SUCCESS'
export const CHECK_NOTIFY_ERROR = 'CHECK_NOTIFY_ERROR'

export const getListNotifyAction = () => {
    return {
        type: GET_LIST_NOTIFY,
    }
}

export const checkNotifyAction = (data) => {
    return {
        type: CHECK_NOTIFY,
        data: data
    }
}