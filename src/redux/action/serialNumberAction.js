export const GET_SERIAL_NUMBER = 'GET_SERIAL_NUMBER'
export const GET_GET_SERIAL_NUMBER_SUCCESS = 'GET_GET_SERIAL_NUMBER_SUCCESS'
export const GET_GET_SERIAL_NUMBER_ERROR = 'GET_GET_SERIAL_NUMBER_ERROR'

export const actGetSerialNumberAction = (data) => {
   return {
      type: GET_SERIAL_NUMBER,
      data: data,
   }
}
