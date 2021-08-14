import AsyncStorage from '@react-native-async-storage/async-storage'
// let API_URL = 'http://192.168.50.102:8080'
// let API_URL = 'http://192.168.50.73:8080'

let API_URL = 'https://cea2sdfkpa.execute-api.ap-southeast-1.amazonaws.com/staging'

const userProfile = {
   tokenFB: '',
   access_token: '',
   user_id: 0,
   user_name: '',
   avatar: '',
   email: '',
   role: 3,
   id_card: 0,
   phone: '',
   is_active: true,
   shop_code: 0,
   shop_name: '',
   shop_address: '',
   bank_name: '',
   account_number: 0,
   user_name_bank: '',
}

const S3Info = {
   bucket: 'aquavn-images',
   region: 'ap-southeast-1',
   accessKey: 'AKIAW4YMCI6JWFABXVWY',
   secretKey: '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',
   ContentType: 'image/jpeg',
   acl: 'public-read',
   successActionStatus: 201,
   folder_upload: 'aqua_sell_out/'
}

const userBankSignUp = {
   bank: '',
   accNum: '',
   accHol: ''
}

const NetworkConnected = { isConnect: null }

export { API_URL, userProfile, NetworkConnected, userBankSignUp, S3Info }

export let setUpApi = async () => {
   // const value = await AsyncStorage.getItem('@dataProfile')
   // const language = await AsyncStorage.getItem('@appLanguage')
   // console.log('AsyncStorage:', JSON.parse(language))
   // return language != null ? JSON.parse(language) : null,


}
