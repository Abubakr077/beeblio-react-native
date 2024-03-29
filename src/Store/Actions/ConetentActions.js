import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import { AsyncStorage } from 'react-native';
import {Audio} from "expo-av";

const fallBackErrorMessage = 'Something went wrong, please try again later!';

// use this actions for searches page as well
const getContentSearches = options => async dispatch => {
  const {  onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    let user = await AsyncStorage.getItem('user_obj')
    user = JSON.parse(user)
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
    // let user = await AsyncStorage.getItem('user_obj')
    // user = JSON.parse(user)
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
    let user = await AsyncStorage.getItem('user_obj')
    user = JSON.parse(user)
    const { data: res } = await axios.get(`${APIModel.HOST}/search?entity=interaction&user_id=${user.id}&content_id=${contentId}`, {
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

const getWordInfo = options => async dispatch => {
  const {  data,onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/aggregated-dictionary/lookup?lang=EN&provider=${data.dicName}&scope=ALL&word=${data.word}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    let info;
    if (data.dicName === 'OXFORDDICTIONARIES') {
      info = res.providerDefinition.results;
    } else if (data.dicName === 'TWINWORD') {
      info = res.providerDefinition;
    } else {
      info = res.providerDefinition;
    }
    dispatch({
      type: actions.GET_WORDS_INFO,
      payload: info
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
const getContentAudio = options => async dispatch => {
  const {  sentence,onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/filter/audio?sentence=${sentence}&accent=Joanna_English_US&word=elections`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    const soundObject = new Audio.Sound();

    await soundObject.loadAsync({uri: res});
    // await soundObject.loadAsync({uri: 'https://www.soundjay.com/button/button-1.mp3'});
    await soundObject.playAsync();

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
const getContentAudioAccent = options => async dispatch => {
  const {  data,onSuccess, onError } = options;
  try {
    const token = await AsyncStorage.getItem('user')
    const { data: res } = await axios.get(`${APIModel.HOST}/filter/audio?sentence=${data.sentence}&accent=${data.accent}&word=elections`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization':token
      }
    });
    const soundObject = new Audio.Sound();

    await soundObject.loadAsync({uri: res});
    // await soundObject.loadAsync({uri: 'https://www.soundjay.com/button/button-1.mp3'});
    await soundObject.playAsync();

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
const playAudio = options => async dispatch => {
  const {  url,onSuccess, onError } = options;
  try {
    const soundObject = new Audio.Sound();
    // await soundObject.loadAsync({uri: res});
    await soundObject.loadAsync({uri: url});
    await soundObject.playAsync();

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

export { getContentSearches,doSearch,getDetails,doReact,getSavedContent,getContentAudio,getWordInfo,playAudio,getContentAudioAccent};
