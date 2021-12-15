const { CLUB_LIST_FAIL, CLUB_LIST_REQUEST, CLUB_LIST_SUCCESS,
    CLUB_INVALID_LIST_FAIL, CLUB_INVALID_LIST_REQUEST, CLUB_INVALID_LIST_SUCCESS,
    CLUB_DETAILS_REQUEST, CLUB_DETAILS_FAIL, CLUB_DETAILS_SUCCESS,
    CLUB_POST_FAIL, CLUB_POST_REQUEST, CLUB_POST_SUCCESS,
    CLUB_VALIDATE_FAIL, CLUB_VALIDATE_REQUEST, CLUB_VALIDATE_SUCCESS,
    CLUB_DELETE_FAIL, CLUB_DELETE_REQUEST, CLUB_DELETE_SUCCESS } = require("../constants/clubConstants");

export const clubListReducer = (state = { loadingClubs: true, clubs: [], clubsMostReviews: [], clubsHighestRating: [] }, action) => {
    switch (action.type) {
        case CLUB_LIST_REQUEST:
            return { loadingClubs: true };
        case CLUB_LIST_SUCCESS:
            let clubs = action.payload
            let clubsMostReviews = action.payload.slice().sort(function (a, b) { return b.numReviews - a.numReviews })
            let clubsHighestRating = action.payload.slice().sort(function (a, b) {
                let ratingB = b.totalRating / b.numReviews;
                if (b.numReviews === 0)
                    ratingB = -1;
                let ratingA = a.totalRating / a.numReviews;
                if (a.numReviews === 0)
                    ratingA = -1;
                return (ratingB) - (ratingA)
            })
            return { loadingClubs: false, clubs: clubs, clubsMostReviews: clubsMostReviews, clubsHighestRating: clubsHighestRating };
        case CLUB_LIST_FAIL:
            return { loadingClubs: false, errorClubs: action.payload };
        default:
            return state;
    }
}

export const clubInvalidListReducer = (state = { loadingInvalidClubs: true, invalidClubs: [] }, action) => {
    switch (action.type) {
        case CLUB_INVALID_LIST_REQUEST:
            return { loadingInvalidClubs: true };
        case CLUB_INVALID_LIST_SUCCESS:
            let invalidClubs = action.payload
            return { loadingInvalidClubs: false, invalidClubs: invalidClubs };
        case CLUB_INVALID_LIST_FAIL:
            return { loadingInvalidClubs: false, errorInvalidClubs: action.payload };
        default:
            return state;
    }
}

export const clubDetailsReducer = (state = { loadingClub: true, club: {} }, action) => {
    switch (action.type) {
        case CLUB_DETAILS_REQUEST:
            return { loadingClub: true };
        case CLUB_DETAILS_SUCCESS:
            return { loadingClub: false, club: action.payload };
        case CLUB_DETAILS_FAIL:
            return { loadingClub: false, errorClub: action.payload };
        default:
            return state;
    }
}

export const clubPostReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_POST_REQUEST:
            return { loading: true };
        case CLUB_POST_SUCCESS:
            return { loading: false, clubInfo: action.payload };
        case CLUB_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const clubValidateReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_VALIDATE_REQUEST:
            return { loading: true };
        case CLUB_VALIDATE_SUCCESS:
            return { loading: false, clubValidation: action.payload };
        case CLUB_VALIDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const clubDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_DELETE_REQUEST:
            return { loading: true };
        case CLUB_DELETE_SUCCESS:
            return { loading: false, clubDeletion: action.payload };
        case CLUB_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
