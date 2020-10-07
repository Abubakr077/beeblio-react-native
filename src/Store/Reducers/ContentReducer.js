import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    searches: undefined,
    searchItem: undefined,
    savedContent: undefined
};

const ContentReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.GET_CONTENT_SEARCHES: {
            // AsyncStorage.setItem('statics', JSON.stringify(statics));
            return {
                ...state,
                searches:[...action.payload],
            };
        }
        case actions.GET_CONTENT_SEARCH_DETAILS: {
            const item = action.payload.results[0]
            // AsyncStorage.setItem('statics', JSON.stringify(statics));
            return {
                ...state,
                searchItem:item,
            };
        }
        case actions.GET_SAVED_CONTENT: {
            // AsyncStorage.setItem('statics', JSON.stringify(statics));
            return {
                ...state,
                savedContent:[...action.payload],
            };
        }
        default: {
            return state;
        }
    }

};

export default ContentReducer;
