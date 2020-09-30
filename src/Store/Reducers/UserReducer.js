import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    statics: undefined,
    chart: undefined,
    user: undefined,
};

const UserReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.GET_USER_STATISTICS: {
            const  statics  = action.payload;
            // AsyncStorage.setItem('statics', JSON.stringify(statics));
            return {
                ...state,
                statics:statics,
            };
        }
        case actions.GET_USER_WORD_GRAPH: {
            const  chart  = action.payload;
            // AsyncStorage.setItem('word_chart', JSON.stringify(chart));
            return {
                ...state,
                chart:chart,
            };
        }
        case actions.GET_USER: {
            const  user  = action.payload;
            AsyncStorage.setItem('user_obj', JSON.stringify(user));
            return {
                ...state,
                user:user,
            };
        }
        default: {
            return state;
        }
    }

};

export default UserReducer;
