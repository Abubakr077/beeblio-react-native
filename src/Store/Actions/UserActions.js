import APIModel from "../../Models/APIModal";
import axios from "axios";
import * as actions from "../Actions/type";
import {AsyncStorage} from 'react-native';
const fallBackErrorMessage = 'Something went wrong, please try again later!';

const getStatistics = options => async dispatch => {
    const {onSuccess, onError} = options;
    try {
        const token = await AsyncStorage.getItem('user')
        const {data: res} = await axios.get(`${APIModel.HOST}/user/statistics`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token
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
        const {data} = error.response;
        const message = data.message || error.message || fallBackErrorMessage;

        if (onError) {
            onError(message);
        }
    }
};
const getWordChart = options => async dispatch => {
    const {onSuccess, onError} = options;
    try {
        const token = await AsyncStorage.getItem('user')
        const {data: res} = await axios.get(`${APIModel.HOST}/user/word-chart`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token
            }
        });
        AsyncStorage.setItem('word_chart', JSON.stringify(res)).then(
            ()=>{
                dispatch({
                    type: actions.GET_USER_WORD_GRAPH,
                    payload: res
                });
                if (onSuccess) {
                    onSuccess();
                }
            }
        );
    } catch (error) {
        console.log(error);
        const {data} = error.response;
        const message = data.message || error.message || fallBackErrorMessage;

        if (onError) {
            onError(message);
        }
    }
};
const getUser = options => async dispatch => {
    const {onSuccess, onError} = options;
    try {
        const token = await AsyncStorage.getItem('user')
        const {data: res} = await axios.get(`${APIModel.HOST}/user/me`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token
            }
        });
        AsyncStorage.setItem('user_obj', JSON.stringify(res)).then(x=>{
            dispatch({
                type: actions.GET_USER,
                payload: res
            });
            if (onSuccess) {
                onSuccess();
            }
        });
    } catch (error) {
        console.log(error);
        const {data} = error.response;
        const message = data.message || error.message || fallBackErrorMessage;

        if (onError) {
            onError(message);
        }
    }
};
const getUserPicture = options => async dispatch => {
    const {onSuccess, onError} = options;
    try {
        const token = await AsyncStorage.getItem('user')
        const {data: res} = await axios.get(`${APIModel.HOST}/user/image`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token
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
        const {data} = error.response;
        const message = data.message || error.message || fallBackErrorMessage;

        if (onError) {
            onError(message);
        }
    }
};
const updateUserPicture = options => async dispatch => {
    const {image, onSuccess, onError} = options;
    try {
        const formData = new FormData();

        formData.append("photo", {
            // name: image.fileName,
            type: "image/jpeg",
            uri: Platform.OS === "android" ? image : image.replace("file://", "")
        });
        const token = await AsyncStorage.getItem('user')
        // const {data: res} = await axios.post(`${APIModel.HOST}/user/image`, formData, {
        //     'headers': {
        //         "Content-Type": "multipart/form-data",
        //         'Accept': 'application/json',
        //         'authorization': token,
        //     }
        // });

        // RNFetchBlob.fetch('POST', `${APIModel.HOST}/user/image`, {
        //         'authorization': token,
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     [
        //         { name: 'file', filename: 'user.png', type: 'image/png', data: image },
        //     ]
        // ).then((resp) => {
        //     console.log(resp);
        // }).catch((err) => {
        //     console.log(err);
        // });

        // dispatch({
        //     type: actions.GET_USER_IMAGE,
        //     payload: res.defaultFormat.path
        // });
        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
        const {data} = error.response;
        const message = data.message || error.message || fallBackErrorMessage;

        if (onError) {
            onError(message);
        }
    }
};
const updateProfile = options => async dispatch => {
    const { data, onSuccess, onError } = options;
    try {
        const token = await AsyncStorage.getItem('user')
        const { data: user } = await axios.put(`${APIModel.HOST}/user/profile`, data, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token
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



export {getStatistics, getWordChart, getUser, getUserPicture, updateUserPicture,updateProfile};
