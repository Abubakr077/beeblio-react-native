import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    user: undefined,
    skiped: 'false',
    content:[],
    rssFeedItems:[],
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
            AsyncStorage.setItem('user', user);
            console.log('set user');
            console.log(user);
            return {
                ...state,
                user,
            };
        }
        case actions.SYNC_WITH_ASYNC_STORAGE: {
            const { user,skiped } = action.payload;
            return {
                ...state,
                user,
                skiped
            };
        }
        case actions.LOGOUT: {
            AsyncStorage.removeItem('user');
            return {
                ...state,
                user: null,
            };
        }
        case actions.GET_CONTENT: {
            return {
                ...state,
                content: [...action.payload],
            };
        }
        case actions.GET_CONTENT_RSS: {
            return {
                ...state,
                rssFeedItems: [...action.payload],
            };
        }
        default: {
            return state;
        }
    }

};

export default AuthReducer;
