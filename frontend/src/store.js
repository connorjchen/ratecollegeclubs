import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { schoolListReducer, schoolDetailsReducer, schoolListAllReducer } from './reducers/schoolReducers';
import { clubListReducer, clubDetailsReducer, clubInvalidListReducer } from './reducers/clubReducers';
import { reviewListReducer, reviewReportedListReducer } from './reducers/reviewReducers';
import { interviewListReducer, interviewReportedListReducer } from './reducers/interviewReducers';

const initialState = {
};
const reducer = combineReducers({
    schoolList: schoolListReducer,
    schoolListAll: schoolListAllReducer,
    schoolDetails: schoolDetailsReducer,
    clubList: clubListReducer,
    clubInvalidList: clubInvalidListReducer,
    clubDetails: clubDetailsReducer,
    reviewList: reviewListReducer,
    reviewReportedList: reviewReportedListReducer,
    interviewList: interviewListReducer,
    interviewReportedList: interviewReportedListReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;