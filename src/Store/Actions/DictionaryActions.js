import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const fallBackErrorMessage = 'Something went wrong, please try again later!';
const getDictionaries = options => async dispatch => {
  const {  onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/dictionaries`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    dispatch({
      type: actions.GET_DICTIONARIES,
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

const setDictionary = options => async dispatch => {
  const token = await AsyncStorage.getItem('user')
  const { data, onSuccess, onError } = options;
  try {
    const { data: user } = await axios.post(`${APIModel.HOST}/user/dictionary/${data.dictionaryId}`, data, {
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

export { getDictionaries,setDictionary};
