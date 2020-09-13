import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    user: null,
};

const AuthReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.SET_USER: {
            const { user } = action.payload;
            const {user:oldUser} =  state;
            const newUser = {
                ...oldUser,
                ...user
            };
            AsyncStorage.setItem('user', JSON.stringify(newUser));
            return {
                ...state,
                user:newUser,
            };
        }
        case actions.LOGIN: {
            const { user } = action.payload;
            AsyncStorage.setItem('user', JSON.stringify(user));
            return {
                ...state,
                user,
            };
        }
        case actions.LOGOUT: {
            //localStorage.mpsetUser = null;
            return {
                ...state,
                user: null
            };
        }

        default: {
            return state;
        }
    }

};

export default AuthReducer;
