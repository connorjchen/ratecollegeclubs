import Axios from 'axios';
import {
    INTERVIEW_LIST_REQUEST, INTERVIEW_LIST_SUCCESS, INTERVIEW_LIST_FAIL,
    INTERVIEW_POST_FAIL, INTERVIEW_POST_REQUEST, INTERVIEW_POST_SUCCESS,
    INTERVIEW_REPORT_FAIL, INTERVIEW_REPORT_REQUEST, INTERVIEW_REPORT_SUCCESS,
    INTERVIEW_VALIDATE_FAIL, INTERVIEW_VALIDATE_REQUEST, INTERVIEW_VALIDATE_SUCCESS,
    INTERVIEW_DELETE_FAIL, INTERVIEW_DELETE_REQUEST, INTERVIEW_DELETE_SUCCESS,
    INTERVIEW_REPORTED_LIST_FAIL, INTERVIEW_REPORTED_LIST_REQUEST, INTERVIEW_REPORTED_LIST_SUCCESS,
} from '../constants/interviewConstants';

export const listInterviews = (clubId) => async (dispatch) => {
    dispatch({ type: INTERVIEW_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/interviews/list/${clubId}`);
        dispatch({ type: INTERVIEW_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: INTERVIEW_LIST_FAIL, payload: error.message })
    }
}

export const listReportedInterviews = () => async (dispatch) => {
    dispatch({ type: INTERVIEW_REPORTED_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`https://ratecollegeclubs.herokuapp.com/api/interviews/reported/list`);
        dispatch({ type: INTERVIEW_REPORTED_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: INTERVIEW_REPORTED_LIST_FAIL, payload: error.message })
    }
}

export const post = (clubId, difficulty, major, roleApplied, interviewComment) => async (dispatch) => {
    dispatch({ type: INTERVIEW_POST_REQUEST, payload: { clubId, difficulty, major, roleApplied, interviewComment } });
    try {
        const { data } = await Axios.post('https://ratecollegeclubs.herokuapp.com/api/interviews/post', {
            clubId, difficulty, major, roleApplied, interviewComment
        });
        dispatch({ type: INTERVIEW_POST_SUCCESS, payload: data });
        return JSON.stringify({ msg: "interviewData" })
    } catch (error) {
        dispatch({
            type: INTERVIEW_POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const report = (interviewId) => async (dispatch) => {
    dispatch({ type: INTERVIEW_REPORT_REQUEST, payload: { interviewId } });
    try {
        const { data } = await Axios.patch(`https://ratecollegeclubs.herokuapp.com/api/interviews/report`, { interviewId });
        dispatch({ type: INTERVIEW_REPORT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: INTERVIEW_REPORT_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const validate = (interviewId) => async (dispatch) => {
    dispatch({ type: INTERVIEW_VALIDATE_REQUEST, payload: { interviewId } });
    try {
        const { data } = await Axios.patch(`https://ratecollegeclubs.herokuapp.com/api/interviews/validate`, { interviewId });
        dispatch({ type: INTERVIEW_VALIDATE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: INTERVIEW_VALIDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const interviewDelete = (interviewId) => async (dispatch) => {
    dispatch({ type: INTERVIEW_DELETE_REQUEST });
    try {
        const { data } = await Axios.delete(`https://ratecollegeclubs.herokuapp.com/api/interviews/delete/${interviewId}`);
        dispatch({ type: INTERVIEW_DELETE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: INTERVIEW_DELETE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}