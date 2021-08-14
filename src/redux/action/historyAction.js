export const GET_HISTORY = 'GET_HISTORY'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_ERROR = 'GET_HISTORY_ERROR'


export const FILTER_HISTORY = 'FILTER_HISTORY'


export const getHistoryAction = (data) => {
   return {
      type: GET_HISTORY,
      data: data
   }
}
