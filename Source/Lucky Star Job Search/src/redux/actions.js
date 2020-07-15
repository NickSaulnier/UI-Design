import { INVALID_LOGIN, LOGIN_SUCCESS, LOGIN_NETWORK_ERROR, LOGOUT, RETRIEVE_JOBS, RETRIEVE_SEARCHABLE_LANGUAGES, RETRIEVE_USER_SAVED_JOBS, RETRIEVE_CURRENT_USER, COMPLETE_ONBOARDING } from './actionConstants';
import { login, getAllJobs, getAllSearchableLanguages, getSavedJobsForUser, addSavedJobForUser, deleteSavedJobForUser, userCompletedOnboarding } from '../data/data';
import store from "./store";

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: {
        user
    }
});

export const loginFail = () => ({
    type: INVALID_LOGIN
});

export const loginNetworkError = () => ({
    type: LOGIN_NETWORK_ERROR
});

export const validateUser = (username, password) => {
    let user = login(username, password);
    if (user.id)
        return loginSuccess(user);
    else return loginFail();
}

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const retrieveAllJobs = () => {
    const jobs = getAllJobs();
    return {
        type: RETRIEVE_JOBS,
        payload: {
            jobs: jobs
        }
    }
};

export const retrieveAllSearchableLanguages = () => {
    const searchableLanguages = getAllSearchableLanguages();
    return {
        type: RETRIEVE_SEARCHABLE_LANGUAGES,
        payload: {
            searchableLanguages: searchableLanguages
        }
    }
};

export const retrieveUserSavedJobs = currentUser => {
    const userSavedJobs = getSavedJobsForUser(currentUser.id);
    return {
        type: RETRIEVE_USER_SAVED_JOBS,
        payload: {
            userSavedJobs: userSavedJobs
        }
    }
}

export const retrieveCurrentUser = () => {
    return {
        type: RETRIEVE_CURRENT_USER
    }
}

export const saveJobForUser = (currentUser, jobId) => {
    addSavedJobForUser(currentUser.id, jobId);
    return retrieveUserSavedJobs(currentUser);
}

export const deleteJobForUser = (currentUser, jobId) => {
    deleteSavedJobForUser(currentUser.id, jobId);
    return retrieveUserSavedJobs(currentUser);
}

export const completeOnboarding = () => {
    const userId = store.getState().user.id;
    userCompletedOnboarding(userId);
    return {
        type: COMPLETE_ONBOARDING
    }
}