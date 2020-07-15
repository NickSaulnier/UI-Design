import { createStore } from 'redux';
import { LOGIN_SUCCESS, INVALID_LOGIN, LOGIN_NETWORK_ERROR, LOGOUT, RETRIEVE_JOBS, RETRIEVE_SEARCHABLE_LANGUAGES, RETRIEVE_USER_SAVED_JOBS, RETRIEVE_CURRENT_USER, COMPLETE_ONBOARDING } from './actionConstants';
import { INITIAL_STATE, LOGIN_STATE } from './storeConstants';

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState: LOGIN_STATE.LOGGED_IN,
                user: action.payload.user
            }
        case INVALID_LOGIN:
            return {...state, loginState: LOGIN_STATE.INVALID_LOGIN}   
        case LOGIN_NETWORK_ERROR:
            return {...state, loginState: LOGIN_STATE.NETWORK_ERROR}  
        case LOGOUT:
            return {
                ...state,
                loginState: LOGIN_STATE.LOGGED_OUT
            }
        case RETRIEVE_JOBS:
            return {
                ...state,
                masterJobsList: action.payload.jobs
            }
        case RETRIEVE_SEARCHABLE_LANGUAGES:
            return {
                ...state,
                searchableLanguages: action.payload.searchableLanguages
            }
        case RETRIEVE_USER_SAVED_JOBS:
            return {
                ...state,
                userSavedJobs: action.payload.userSavedJobs
            }
        case RETRIEVE_CURRENT_USER:
            return {
                ...state,
                user: state.user
            }
        case COMPLETE_ONBOARDING:
            return {
                ...state,
                user: {
                    ...state.user,
                    onboardingComplete: true
                }
            }
        default:
            return state;
    }
}

export default createStore(rootReducer);