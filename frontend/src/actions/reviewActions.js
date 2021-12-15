import Axios from 'axios';
import {
    REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS, REVIEW_LIST_FAIL,
    REVIEW_POST_FAIL, REVIEW_POST_REQUEST, REVIEW_POST_SUCCESS,
    REVIEW_REPORT_FAIL, REVIEW_REPORT_REQUEST, REVIEW_REPORT_SUCCESS,
    REVIEW_VALIDATE_FAIL, REVIEW_VALIDATE_REQUEST, REVIEW_VALIDATE_SUCCESS,
    REVIEW_DELETE_FAIL, REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS,
    REVIEW_REPORTED_LIST_FAIL, REVIEW_REPORTED_LIST_REQUEST, REVIEW_REPORTED_LIST_SUCCESS,
} from '../constants/reviewConstants';

export const listReviews = (clubId) => async (dispatch) => {
    dispatch({ type: REVIEW_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/reviews/list/${clubId}`);
        dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: REVIEW_LIST_FAIL, payload: error.message })
    }
}

export const listReportedReviews = () => async (dispatch) => {
    dispatch({ type: REVIEW_REPORTED_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/reviews/reported/list`);
        dispatch({ type: REVIEW_REPORTED_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: REVIEW_REPORTED_LIST_FAIL, payload: error.message })
    }
}

export const post = (clubId, rating, timeCommitment, recommend, classField, major, position, comment) => async (dispatch) => {
    dispatch({ type: REVIEW_POST_REQUEST, payload: { clubId, rating, timeCommitment, recommend, classField, major, position, comment } });
    try {
        const { data } = await Axios.post('https://ratecollegeclubs.herokuapp.com/api/reviews/post', {
            clubId, rating, timeCommitment, recommend, classField, major, position, comment
        });
        dispatch({ type: REVIEW_POST_SUCCESS, payload: data });
        return JSON.stringify({ msg: "reviewData" })
    } catch (error) {
        dispatch({
            type: REVIEW_POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const report = (reviewId) => async (dispatch) => {
    dispatch({ type: REVIEW_REPORT_REQUEST, payload: { reviewId } });
    try {
        const { data } = await Axios.patch(`https://ratecollegeclubs.herokuapp.com/api/reviews/report`, { reviewId });
        dispatch({ type: REVIEW_REPORT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: REVIEW_REPORT_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const validate = (reviewId) => async (dispatch) => {
    dispatch({ type: REVIEW_VALIDATE_REQUEST, payload: { reviewId } });
    try {
        const { data } = await Axios.patch(`https://ratecollegeclubs.herokuapp.com/api/reviews/validate`, { reviewId });
        dispatch({ type: REVIEW_VALIDATE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: REVIEW_VALIDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const reviewDelete = (reviewId) => async (dispatch) => {
    dispatch({ type: REVIEW_DELETE_REQUEST });
    try {
        const { data } = await Axios.delete(`https://ratecollegeclubs.herokuapp.com/api/reviews/delete/${reviewId}`);
        dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: REVIEW_DELETE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
