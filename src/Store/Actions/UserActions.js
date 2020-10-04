import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const fallBackErrorMessage = 'Something went wrong, please try again later!';

const getStatistics = options => async dispatch => {
  const {  onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/user/statistics`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_USER_STATISTICS,
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
const getWordChart = options => async dispatch => {
  const { onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/user/word-chart`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_USER_WORD_GRAPH,
      payload: res[0]
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
const getUser = options => async dispatch => {
  const { onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/user/me`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_USER,
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
const getUserPicture = options => async dispatch => {
  const { onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/user/image`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_USER_IMAGE,
      payload: res[0]
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
export { getStatistics,getWordChart,getUser,getUserPicture};
