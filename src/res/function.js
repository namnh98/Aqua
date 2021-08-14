const isValidEmailAddress = (text) => {
   return !!text.match(/.+@.+/)
}
const validateInput = (checkingText) => {
   /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */

   return !!checkingText.match(/^\d{10,11}$/)
}
const valiDateidCard = (text) => {
   return !!text.match(/^\d{9,12}$/)
}
const valiDateBankNum = (text) => {
   return !!text.match(/^\d{8,16}$/)
}
export const convertDate = (input, type) => {
   let date = new Date(input)
   let day = date.getUTCDate()
   if (day < '10') {
      day = '0' + day
   }
   let month = date.getUTCMonth() + 1
   if (month < '10') {
      month = '0' + month
   }
   let year = date.getUTCFullYear()
   let hour = date.getUTCHours()
   if (hour < 10) {
      hour = '0' + hour
   }
   let min = date.getUTCMinutes()
   if (min < 10) {
      min = '0' + min
   }
   let sec = date.getUTCSeconds()
   if (sec < 10) {
      sec = '0' + sec
   }
   switch (type) {
      case 'yyyymmdd hhmmss':
         return `${year}-${month}-${day} ${hour}:${min}:${sec}`
         break
      case 'ddmmyyyy':
         return `${day}-${month}-${year}`
         break
      case 'yyyymmdd':
         return `${year}-${month}-${day}`
         break
      case 'hhmmss':
         return `${hour}:${min}:${sec}`
         break

      default:
         return `${day}-${month}-${year} ${hour}:${min}`
         break
   }
}
const currencyFormat = (num) => {
   if (num === 0) {
      return 0;
   } else {
      return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
   }
};
export { isValidEmailAddress, validateInput, valiDateidCard, valiDateBankNum, currencyFormat }
