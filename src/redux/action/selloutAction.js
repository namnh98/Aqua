export const CREATE_SELL_OUT = 'CREATE_SELL_OUT'
export const CREATE_SELL_OUT_SUCCEES = 'CREATE_SELL_OUT_SUCCEES'
export const CREATE_SELL_OUT_ERROR = 'CREATE_SELL_OUT_ERROR'

export const SELL_OUT_DETAIL = 'SELL_OUT_DETAIL'
export const SELL_OUT_DETAIL_SUCCEES = 'SELL_OUT_DETAIL_SUCCEES'
export const SELL_OUT_DETAIL_ERROR = 'SELL_OUT_DETAIL_ERROR'


export const SELL_OUT_UPDATE = 'SELL_OUT_UPDATE'
export const SELL_OUT_UPDATE_SUCCEES = 'SELL_OUT_UPDATE_SUCCEES'
export const SELL_OUT_UPDATE_ERROR = 'SELL_OUT_UPDATE_ERROR'

export const actCreateSOAction = (data) => {
   return {
      type: CREATE_SELL_OUT,
      data: data,
   }
}
export const actGetDetailSOAction = (data) => {
   return {
      type: SELL_OUT_DETAIL,
      data: data,
   }
}
export const actUpdateSOAction = (data) => {
   return {
      type: SELL_OUT_UPDATE,
      data: data
   }
}