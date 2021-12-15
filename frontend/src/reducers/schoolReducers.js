const { SCHOOL_LIST_FAIL, SCHOOL_LIST_REQUEST, SCHOOL_LIST_SUCCESS,
    SCHOOL_LIST_ALL_FAIL, SCHOOL_LIST_ALL_REQUEST, SCHOOL_LIST_ALL_SUCCESS,
    SCHOOL_DETAILS_REQUEST, SCHOOL_DETAILS_FAIL, SCHOOL_DETAILS_SUCCESS,
    SCHOOL_POST_FAIL, SCHOOL_POST_REQUEST, SCHOOL_POST_SUCCESS,
    SCHOOL_VALIDATE_FAIL, SCHOOL_VALIDATE_REQUEST, SCHOOL_VALIDATE_SUCCESS,
    SCHOOL_DELETE_FAIL, SCHOOL_DELETE_REQUEST, SCHOOL_DELETE_SUCCESS } = require("../constants/schoolConstants");

export const schoolListReducer = (state = { loading: true, schools: [] }, action) => {
    switch (action.type) {
        case SCHOOL_LIST_REQUEST:
            return { loading: true };
        case SCHOOL_LIST_SUCCESS:
            return { loading: false, schools: action.payload };
        case SCHOOL_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const schoolListAllReducer = (state = { loadingAllSchools: true, allSchools: [] }, action) => {
    switch (action.type) {
        case SCHOOL_LIST_ALL_REQUEST:
            return { loadingAllSchools: true };
        case SCHOOL_LIST_ALL_SUCCESS:
            return { loadingAllSchools: false, allSchools: action.payload };
        case SCHOOL_LIST_ALL_FAIL:
            return { loadingAllSchools: false, errorAllSchools: action.payload };
        default:
            return state;
    }
}

export const schoolDetailsReducer = (state = { loading: true, school: {} }, action) => {
    switch (action.type) {
        case SCHOOL_DETAILS_REQUEST:
            return { loading: true };
        case SCHOOL_DETAILS_SUCCESS:
            return { loading: false, school: action.payload };
        case SCHOOL_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const schoolPostReducer = (state = {}, action) => {
    switch (action.type) {
        case SCHOOL_POST_REQUEST:
            return { loading: true };
        case SCHOOL_POST_SUCCESS:
            return { loading: false, schoolInfo: action.payload };
        case SCHOOL_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const schoolValidateReducer = (state = {}, action) => {
    switch (action.type) {
        case SCHOOL_VALIDATE_REQUEST:
            return { loading: true };
        case SCHOOL_VALIDATE_SUCCESS:
            return { loading: false, schoolValidation: action.payload };
        case SCHOOL_VALIDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const schoolDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SCHOOL_DELETE_REQUEST:
            return { loading: true };
        case SCHOOL_DELETE_SUCCESS:
            return { loading: false, schoolDeletion: action.payload };
        case SCHOOL_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};