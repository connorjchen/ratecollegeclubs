import Axios from 'axios';
import {
    SCHOOL_LIST_REQUEST, SCHOOL_LIST_SUCCESS, SCHOOL_LIST_FAIL,
    SCHOOL_LIST_ALL_FAIL, SCHOOL_LIST_ALL_REQUEST, SCHOOL_LIST_ALL_SUCCESS,
    SCHOOL_DETAILS_REQUEST, SCHOOL_DETAILS_SUCCESS, SCHOOL_DETAILS_FAIL,
    SCHOOL_POST_FAIL, SCHOOL_POST_REQUEST, SCHOOL_POST_SUCCESS,
    SCHOOL_VALIDATE_FAIL, SCHOOL_VALIDATE_REQUEST, SCHOOL_VALIDATE_SUCCESS,
    SCHOOL_DELETE_FAIL, SCHOOL_DELETE_REQUEST, SCHOOL_DELETE_SUCCESS
} from '../constants/schoolConstants';

export const listSchools = () => async (dispatch) => {
    dispatch({ type: SCHOOL_LIST_REQUEST });
    try {
        const { data } = await Axios.get('https://ratecollegeclubs.herokuapp.com/api/schools');
        dispatch({ type: SCHOOL_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: SCHOOL_LIST_FAIL, payload: error.message })
    }
}

export const listAllSchools = () => async (dispatch) => {
    dispatch({ type: SCHOOL_LIST_ALL_REQUEST });
    try {
        const { data } = await Axios.get('https://ratecollegeclubs.herokuapp.com/api/schools/all');
        dispatch({ type: SCHOOL_LIST_ALL_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: SCHOOL_LIST_ALL_FAIL, payload: error.message })
    }
}

export const detailsSchool = (schoolId) => async (dispatch) => {
    dispatch({ type: SCHOOL_DETAILS_REQUEST, payload: schoolId });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/schools/${schoolId}`);
        dispatch({ type: SCHOOL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: SCHOOL_DETAILS_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.messsage
        });
    }
}

export const post = (schoolName, city, state) => async (dispatch) => {
    dispatch({ type: SCHOOL_POST_REQUEST, payload: { schoolName, city, state } });
    try {
        const { data } = await Axios.post('https://ratecollegeclubs.herokuapp.com/api/schools/post', { schoolName, city, state });
        dispatch({ type: SCHOOL_POST_SUCCESS, payload: data });
        return JSON.stringify(data)
    } catch (error) {
        dispatch({
            type: SCHOOL_POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const validate = (schoolId) => async (dispatch) => {
    dispatch({ type: SCHOOL_VALIDATE_REQUEST, payload: { schoolId } });
    try {
        const { data } = await Axios.patch('https://ratecollegeclubs.herokuapp.com/api/schools/validate', { schoolId });
        dispatch({ type: SCHOOL_VALIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SCHOOL_VALIDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const schoolDelete = (schoolId) => async (dispatch) => {
    dispatch({ type: SCHOOL_DELETE_REQUEST, payload: { schoolId } });
    try {
        const { data } = await Axios.delete(`https://ratecollegeclubs.herokuapp.com/api/schools/delete/8d8019d00e2a49ab9a9a426d1c423f7e/${schoolId}`);
        dispatch({ type: SCHOOL_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SCHOOL_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};