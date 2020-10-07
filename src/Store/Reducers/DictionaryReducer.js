import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    dictionaries: undefined,
};

const DictionaryReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.GET_DICTIONARIES: {
            // AsyncStorage.setItem('statics', JSON.stringify(statics));
            return {
                ...state,
                dictionaries:[...action.payload],
            };
        }
        default: {
            return state;
        }
    }

};

export default DictionaryReducer;
