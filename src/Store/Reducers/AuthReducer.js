import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const initSate = {
    user: undefined,
    filterContentId: undefined,
    filteredItem: undefined,
    skiped: 'false',
    content:[],
    rssFeedItems:[],
    filterItems:[],
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
            return {
                state: {...initSate},
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
        case actions.GET_CONTENT_FILTER_ITEM: {
            return {
                ...state,
                filteredItem: action.payload,
            };
        }
        case actions.GET_CONTENT_FILTER: {
            Object.entries(action.payload.filterResult).filter(e => {
                initSate.filterItems.push({
                    key:e[0],
                    value:e[1]
                })
            });
            return {
                ...state,
                filterItems: [...initSate.filterItems],
                filterContentId: action.payload.contentId
            };
        }
        default: {
            return state;
        }
    }

};

export default AuthReducer;
