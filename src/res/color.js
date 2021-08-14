import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../res/image/index';
let lightModeColor = {
  backgroundColor: '#ffffff',
  secondaryBackground: '#F4F4F4',
  normal: '#1890FF',
  popupBackground: '#00000036',
  black_tranparent: 'rgba(0,0,0,25)',
  border: '#E8E8E8',
  placeholder: '#8F8F8F',
  labelFocus: '#8C8C8C',
  error: '#F5222D',
  text: '#262626',
  green: '#2EB553',
  selected: '#EDF6FF',
  red: '#FF4D4F',
  white: '#ffffff',
  yellow: '#FFA940',
  lineBorder: '#E8E8E8',
  keyboardAppearance: 'light',
  modal: '#fff',
  iconCancel: '#ffffff',
  // image: image.img_appIconLightMode,
  statusBar: 'dark-content',
  // ic_cross: image.ic_cross,
  backgroundPostIt: '#F5F5F5',
  itemBackgroundPostIt: '#ffffff',
  alert: '#fff',
  ic_datePicker: '#262626',
  borderAlert: 'rgba(0,0,80,0.5)',
  backgroundDatePickerIOS: '#ffffff',
  backgroundDatePickerIOSS: '#fff',
  txtColorDateIOS: '#3E62CC',
  borderColor: '#e8e8e8',
  datePickerColor: '#8c8c8c',
};

let darkModeColor = {
  datePickerColor: '#ffffff',
  backgroundColor: '#17151C',
  secondaryBackground: '#2A2731',
  keyboardAppearance: 'dark',
  normal: '#1890FF',
  popupBackground: '#00000036',
  border: '#595959',
  placeholder: '#8F8F8F',
  labelFocus: '#D9D9D9',
  error: '#F5222D',
  text: '#ffffff',
  green: '#2EB553',
  selected: '#00376F',
  red: '#FF4D4F',
  white: '#ffffff',
  lineBorder: '#FFF',
  yellow: '#FFA940',
  modal: '#17151C',
  iconCancel: '#17151C',
  // image: image.img_appIconDarkMode,
  statusBar: 'light-content',
  // ic_cross: image.ic_crossWhite,
  backgroundPostIt: '#17151C',
  itemBackgroundPostIt: '#2A2731',
  alert: '#2A2731',
  borderAlert: '#000',
  ic_datePicker: '#fff',
  backgroundDatePickerIOS: '#666666',
  backgroundDatePickerIOSS: '#bfbfbf',
  txtColorDateIOS: '#fff',
  borderColor: '#434343',

};

let color = lightModeColor;
let checkAppMode = async () => {
  let value = await AsyncStorage.getItem('appMode');
  // console.log(value, 'mode value')
  if (value === 'dark') {
    color = darkModeColor;
  } else {
    color = lightModeColor;
  }
};

let removeAppMode = async () => {
  let value = await AsyncStorage.removeItem('appMode');
  if (value != null) {
    color = lightModeColor;
  } else {
    color = lightModeColor;
  }
};

checkAppMode();
let onChangeAppMode = async (appType) => {
  const value = await AsyncStorage.getItem('appMode');
  if (value === null) {
    await AsyncStorage.setItem('appMode', 'dark');
    color = darkModeColor;
  } else if (value === 'dark') {
    await AsyncStorage.setItem('appMode', 'light');
    color = lightModeColor;
  } else {
    await AsyncStorage.setItem('appMode', 'dark');
    color = darkModeColor;
  }
  return value;
};

let getAppMode = async () => {
  const value = await AsyncStorage.getItem('appMode');
  return value;
};

export {
  lightModeColor,
  darkModeColor,
  onChangeAppMode,
  getAppMode,
  checkAppMode,
  color,
  removeAppMode,
};

// export default color
