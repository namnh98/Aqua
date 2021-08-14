import { language } from '../../res/language';
import { SET_LANGUAGE } from '../action/changeLangAction';
const initialState = {
    language: language.app
};
const langReducers = (state = initialState, action) => {

    switch (action.type) {
        case SET_LANGUAGE:
            return {
                lang: action.data,
            };
        default:
            return state;
    }
};

export default langReducers;