import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const fallBackErrorMessage = 'Something went wrong, please try again later!';

const register = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  console.log(data);
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/auth/register`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    console.log('check here');
    console.log('user',user);



    const message = user.message;
    console.log(message);
    delete user.message;

    dispatch({
      type: actions.LOGIN,
      payload: {
        user,
      },
    });

    if (onSuccess) {
      onSuccess(message);
    }
  } catch (error) {
    console.error(error);
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

 const login = params => {
  return axios.post(APIModel.HOST + "login",params,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    }
  });
};

 const logout = token => {
  return axios.post(APIModel.HOST + "logout",null,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export { register, logout, login };
