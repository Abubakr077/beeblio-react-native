import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';

const fallBackErrorMessage = 'Something went wrong, please try again later!';

const register = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/auth/register`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const message = user.message;
    delete user.message;

    dispatch({
      type: actions.LOGIN,
      payload: {
        user,
      },
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

const login = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/auth/login`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    AsyncStorage.setItem('user', user);

    dispatch({
      type: actions.LOGIN,
      payload: user
      ,
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

const getContent = options => async dispatch => {
  const { type, onSuccess, onError } = options;
  try {

    const { data: res } = await axios.get(`${APIModel.HOST}/curated-contents?curatedContentType=${type}&page=0&offset=0&limit=20&fields=id,type,url,contentType,contentHash,curatedContentType,mainGenres,subGenres,name,summary,country,sourceLink,contentLink,referenceImageLink,publicationDate,establishmentDate,rssFeeds,isbn,authors,publisher,serialNb,rate,isPremium`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    dispatch({
      type: actions.GET_CONTENT,
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

const getContentRss = options => async dispatch => {
  const { url, onSuccess, onError } = options;
  try {

    const { data: res } = await axios.get(`${APIModel.HOST}/filter/rss-feeds?rssFeedUrl=${url}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    dispatch({
      type: actions.GET_CONTENT_RSS,
      payload: res.rssFeedItems
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
const getFilteredContent = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  const dataObj = JSON.stringify(data);
  let formData = new FormData();

  const blobFilterCriteria = new Blob([dataObj], {
    type: 'application/json'
  });
  formData.append("filterData", blobFilterCriteria);

  // formdata.append("content", data.contentId)
  // formdata.append("contentId", data.contentId)
  // formdata.append("filterLimit", data.filterLimit)
  // formdata.append("sorting", data.sorting)
  // formdata.append("contractionOption", data.contractionOption)
  // formdata.append("url", data.url)
  console.log('formData');
  console.log(formData);
  try {

    const { data: res } = await axios.post(`${APIModel.HOST}/filter`, formData,{
      'headers': {
        'Content-Type': 'multipart/mixed',
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
      }
    });
    console.log('check here');
    console.log('user',res);

    // dispatch({
    //   type: actions.GET_CONTENT_RSS,
    //   payload: res.rssFeedItems
    // });

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
const forgotPassword = options => async () => {
  const {  onSuccess, onError } = options;
  try {

    const { data: response } = await axios.post(`${APIModel.HOST}/auth/forgot-password`, {}, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const syncWithAsyncStorage = options => async dispatch => {
  const { onSuccess, onError } = options;
  try {
    let user = await AsyncStorage.getItem('user');
    let skiped = await AsyncStorage.getItem('skiped');

    // user = JSON.parse(user);
    console.log('user');
    console.log(user);

    dispatch({
      type: actions.SYNC_WITH_ASYNC_STORAGE,
      payload: {
        user, skiped
      },
    });

    if (onSuccess) {
      onSuccess({
        user, skiped
      });
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;
    if (onError) {
      onError(message);
    }
  }
};

const logout = options => async (dispatch) => {
  const { onSuccess, onError, token } = options;
  try {


    const { data: { message } } = await axios.post(`${APIModel.HOST}/user/logout`, {}, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    dispatch({
      type: actions.LOGOUT,
    });

    if (onSuccess) {
      onSuccess(message);
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};
export { register, logout, login, forgotPassword,syncWithAsyncStorage ,getContent,getContentRss,getFilteredContent};
