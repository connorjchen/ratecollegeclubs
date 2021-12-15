import Axios from 'axios';
import {
    CLUB_LIST_REQUEST, CLUB_LIST_SUCCESS, CLUB_LIST_FAIL,
    CLUB_INVALID_LIST_FAIL, CLUB_INVALID_LIST_REQUEST, CLUB_INVALID_LIST_SUCCESS,
    CLUB_DETAILS_REQUEST, CLUB_DETAILS_SUCCESS, CLUB_DETAILS_FAIL,
    CLUB_POST_FAIL, CLUB_POST_REQUEST, CLUB_POST_SUCCESS,
    CLUB_VALIDATE_FAIL, CLUB_VALIDATE_REQUEST, CLUB_VALIDATE_SUCCESS,
    CLUB_DELETE_FAIL, CLUB_DELETE_REQUEST, CLUB_DELETE_SUCCESS
} from '../constants/clubConstants';

export const listClubs = (schoolId) => async (dispatch) => {
    dispatch({ type: CLUB_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/clubs/list/${schoolId}`);
        dispatch({ type: CLUB_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CLUB_LIST_FAIL, payload: error.message })
    }
}

export const listInvalidClubs = () => async (dispatch) => {
    dispatch({ type: CLUB_INVALID_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/clubs/invalid/list`);
        dispatch({ type: CLUB_INVALID_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CLUB_INVALID_LIST_FAIL, payload: error.message })
    }
}

export const detailsClub = (clubId) => async (dispatch) => {
    dispatch({ type: CLUB_DETAILS_REQUEST, payload: clubId });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/clubs/${clubId}`);
        dispatch({ type: CLUB_DETAILS_SUCCESS, payload: data });
        return JSON.stringify({ msg: "clubData" })
    }
    catch (error) {
        dispatch({
            type: CLUB_DETAILS_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.messsage
        });
    }
}

export const post = (clubName, schoolId) => async (dispatch) => {
    dispatch({ type: CLUB_POST_REQUEST, payload: { clubName, schoolId } });
    try {
        const { data } = await Axios.post('https://ratecollegeclubs.herokuapp.com/api/clubs/post', { clubName, schoolId });
        dispatch({ type: CLUB_POST_SUCCESS, payload: data });
        return JSON.stringify(data)
    } catch (error) {
        dispatch({
            type: CLUB_POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const validate = (clubId) => async (dispatch) => {
    dispatch({ type: CLUB_VALIDATE_REQUEST, payload: { clubId } });
    try {
        const { data } = await Axios.patch('https://ratecollegeclubs.herokuapp.com/api/clubs/validate', { clubId });
        dispatch({ type: CLUB_VALIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CLUB_VALIDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const clubDelete = (clubId) => async (dispatch) => {
    dispatch({ type: CLUB_DELETE_REQUEST, payload: { clubId } });
    try {
        const { data } = await Axios.delete(`https://ratecollegeclubs.herokuapp.com/api/clubs/delete/0cab189e060d4866aa706394c758b292/${clubId}`);
        dispatch({ type: CLUB_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CLUB_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};