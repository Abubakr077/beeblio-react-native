import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    statics: null,
    chart: null,
    user: null,
    userImage: null,
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
        case actions.GET_USER_WORD_GRAPH: {
            const  chart  = action.payload;
            return {
                ...state,
                chart:chart,
            };
        }
        case actions.GET_USER: {
            const  user  = action.payload;
            return {
                ...state,
                user:user,
            };
        }
        case actions.GET_USER_IMAGE: {
            const  image  = action.payload;
            AsyncStorage.setItem('user_img', JSON.stringify(image));
            return {
                ...state,
                userImage:image,
            };
        }
        default: {
            return state;
        }
    }

};

export default UserReducer;
