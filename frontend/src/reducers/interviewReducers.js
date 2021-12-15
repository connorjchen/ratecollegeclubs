const { INTERVIEW_LIST_FAIL, INTERVIEW_LIST_REQUEST, INTERVIEW_LIST_SUCCESS,
    INTERVIEW_POST_FAIL, INTERVIEW_POST_REQUEST, INTERVIEW_POST_SUCCESS,
    INTERVIEW_REPORT_FAIL, INTERVIEW_REPORT_REQUEST, INTERVIEW_REPORT_SUCCESS,
    INTERVIEW_VALIDATE_FAIL, INTERVIEW_VALIDATE_REQUEST, INTERVIEW_VALIDATE_SUCCESS,
    INTERVIEW_DELETE_FAIL, INTERVIEW_DELETE_REQUEST, INTERVIEW_DELETE_SUCCESS,
    INTERVIEW_REPORTED_LIST_FAIL, INTERVIEW_REPORTED_LIST_REQUEST, INTERVIEW_REPORTED_LIST_SUCCESS,
} = require("../constants/interviewConstants");

export const interviewListReducer = (state = { loadingInterviews: true, interviews: [] }, action) => {
    switch (action.type) {
        case INTERVIEW_LIST_REQUEST:
            return { loadingInterviews: true };
        case INTERVIEW_LIST_SUCCESS:
            return { loadingInterviews: false, interviews: action.payload };
        case INTERVIEW_LIST_FAIL:
            return { loadingInterviews: false, errorInterviews: action.payload };
        default:
            return state;
    }
}

export const interviewReportedListReducer = (state = { loadingReportedInterviews: true, reportedInterviews: [] }, action) => {
    switch (action.type) {
        case INTERVIEW_REPORTED_LIST_REQUEST:
            return { loadingReportedInterviews: true };
        case INTERVIEW_REPORTED_LIST_SUCCESS:
            return { loadingReportedInterviews: false, reportedInterviews: action.payload };
        case INTERVIEW_REPORTED_LIST_FAIL:
            return { loadingReportedInterviews: false, errorReportedInterviews: action.payload };
        default:
            return state;
    }
}

export const interviewPostReducer = (state = {}, action) => {
    switch (action.type) {
        case INTERVIEW_POST_REQUEST:
            return { loading: true };
        case INTERVIEW_POST_SUCCESS:
            return { loading: false, interviewInfo: action.payload };
        case INTERVIEW_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const interviewReportReducer = (state = {}, action) => {
    switch (action.type) {
        case INTERVIEW_REPORT_REQUEST:
            return { loading: true };
        case INTERVIEW_REPORT_SUCCESS:
            return { loading: false, interviewReport: action.payload };
        case INTERVIEW_REPORT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const interviewValidateReducer = (state = {}, action) => {
    switch (action.type) {
        case INTERVIEW_VALIDATE_REQUEST:
            return { loading: true };
        case INTERVIEW_VALIDATE_SUCCESS:
            return { loading: false, interviewValidation: action.payload };
        case INTERVIEW_VALIDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const interviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case INTERVIEW_DELETE_REQUEST:
            return { loading: true };
        case INTERVIEW_DELETE_SUCCESS:
            return { loading: false, interviewDeletion: action.payload };
        case INTERVIEW_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
