import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    statics: undefined,
};

const UserReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.GET_USER_STATISTICS: {
            const  statics  = action.payload;
            AsyncStorage.setItem('statics', JSON.stringify(statics));
            return {
                ...state,
                statics:statics,
            };
        }
        default: {
            return state;
        }
    }

};

export default UserReducer;
