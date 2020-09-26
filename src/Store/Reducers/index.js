import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";

const rootReducers = combineReducers({
    AuthReducer,
    UserReducer
});
export default rootReducers;
