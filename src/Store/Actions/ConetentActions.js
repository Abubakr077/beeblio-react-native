import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const fallBackErrorMessage = 'Something went wrong, please try again later!';
// use this actions for searches page as well
const getContentSearches = options => async dispatch => {
  const {  onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const user = await JSON.parse(AsyncStorage.getItem('user_obj'))
    const { data: res } = await axios.get(`${APIModel.HOST}/search?user_id=${user.id}&entity=interaction&excludeFields=response_body&limit=20&offset=0&termsAggregationField=content_id.keyword&order=desc`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_CONTENT_SEARCHES,
      payload: res.results
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.log(error);
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};
const doSearch = options => async dispatch => {
  const {  query,onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const user = await JSON.parse(AsyncStorage.getItem('user_obj'))
    const { data: res } = await axios.get(`${APIModel.HOST}/search?user_id=${user.id}&entity=interaction&excludeFields=response_body&limit=20&offset=0&termsAggregationField=content_id.keyword&valueInAnyField=${query}&order=desc`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_CONTENT_SEARCHES,
      payload: res.results
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.log(error);
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};
// use this action in search page as well and make seperate component who we can load in both pages
const getDetails = options => async dispatch => {
  const {  contentId,onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const user = await JSON.parse(AsyncStorage.getItem('user_obj'))
    const { data: res } = await axios.get(`${APIModel.HOST}/search?user_id=${user.id}&content_id=${contentId}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_CONTENT_SEARCH_DETAILS,
      payload: res
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.log(error);
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};
const doReact = options => async dispatch => {
  const token = await AsyncStorage.getItem('user')
  const { data, onSuccess, onError } = options;
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/event`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    if (onSuccess) {
      onSuccess(user);
    }
  } catch (error) {
    console.log(error);
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const getSavedContent = options => async dispatch => {
  const {  type,onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/event?asList=false&domain=${type}&page=0`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_SAVED_CONTENT,
      payload: res.content
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.log(error);
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

export { getContentSearches,doSearch,getDetails,doReact,getSavedContent};
