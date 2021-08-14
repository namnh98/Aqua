import I18n from '../../settings/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const actSetLanguageAction = (data) => {
    AsyncStorage.setItem('@appLanguage', data);
    // console.log(data, 'action language')
    I18n.locale = data;
    return {
        type: SET_LANGUAGE,
        data: data,
    };
};
