export const GET_SHOP_NAME = 'GET_SHOP_NAME'
export const GET_SHOP_NAME_SUCCESS = 'GET_SHOP_NAME_SUCCESS'
export const GET_SHOP_NAME_ERROR = 'GET_SHOP_NAME_ERROR'

export const actGetShopNameAction = (data) => {
   return {
      type: GET_SHOP_NAME,
      data: data,
   }
}
