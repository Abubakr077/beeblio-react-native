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
export { getStatistics,getWordChart};
