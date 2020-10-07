import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import ContentReducer from "./ContentReducer";
import DictionaryReducer from "./DictionaryReducer";

const rootReducers = combineReducers({
    AuthReducer,
    UserReducer,
    ContentReducer,
    DictionaryReducer
});
export default rootReducers;
