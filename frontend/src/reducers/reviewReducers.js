const { REVIEW_LIST_FAIL, REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS,
    REVIEW_POST_FAIL, REVIEW_POST_REQUEST, REVIEW_POST_SUCCESS,
    REVIEW_REPORT_FAIL, REVIEW_REPORT_REQUEST, REVIEW_REPORT_SUCCESS,
    REVIEW_VALIDATE_FAIL, REVIEW_VALIDATE_REQUEST, REVIEW_VALIDATE_SUCCESS,
    REVIEW_DELETE_FAIL, REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS,
    REVIEW_REPORTED_LIST_FAIL, REVIEW_REPORTED_LIST_REQUEST, REVIEW_REPORTED_LIST_SUCCESS,
} = require("../constants/reviewConstants");

export const reviewListReducer = (state = { loadingReviews: true, reviews: [] }, action) => {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return { loadingReviews: true };
        case REVIEW_LIST_SUCCESS:
            return { loadingReviews: false, reviews: action.payload };
        case REVIEW_LIST_FAIL:
            return { loadingReviews: false, errorReviews: action.payload };
        default:
            return state;
    }
}

export const reviewReportedListReducer = (state = { loadingReportedReviews: true, reportedReviews: [] }, action) => {
    switch (action.type) {
        case REVIEW_REPORTED_LIST_REQUEST:
            return { loadingReportedReviews: true };
        case REVIEW_REPORTED_LIST_SUCCESS:
            return { loadingReportedReviews: false, reportedReviews: action.payload };
        case REVIEW_REPORTED_LIST_FAIL:
            return { loadingReportedReviews: false, errorReportedReviews: action.payload };
        default:
            return state;
    }
}

export const reviewPostReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_POST_REQUEST:
            return { loading: true };
        case REVIEW_POST_SUCCESS:
            return { loading: false, reviewInfo: action.payload };
        case REVIEW_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewReportReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_REPORT_REQUEST:
            return { loading: true };
        case REVIEW_REPORT_SUCCESS:
            return { loading: false, reviewReport: action.payload };
        case REVIEW_REPORT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewValidateReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_VALIDATE_REQUEST:
            return { loading: true };
        case REVIEW_VALIDATE_SUCCESS:
            return { loading: false, reviewValidation: action.payload };
        case REVIEW_VALIDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_DELETE_REQUEST:
            return { loading: true };
        case REVIEW_DELETE_SUCCESS:
            return { loading: false, reviewDeletion: action.payload };
        case REVIEW_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
