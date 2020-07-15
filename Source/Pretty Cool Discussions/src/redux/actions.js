import { LOGIN_SUCCESS, LOGOUT, INVALID_LOGIN, LOGIN_NETWORK_ERROR, POPULATE_TAGS, POPULATE_DISCUSSION_THREADS, POPULATE_TAGS_FOR_THREAD } from './actionConstants';
import firebase from '../data/fbConfig';

const database = firebase.firestore();

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

export const logout = () => ({
    type: LOGOUT
});

export const validateUser = (username, password) => {
    return dispatch => {
        database.collection("users").where("username", "==", username).where("password", "==", password)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size === 1) {
                    const doc = querySnapshot.docs[0];
                    const user = {
                        id: doc.id
                    }
                    dispatch(loginSuccess(user));
                } else {
                    dispatch(loginFail());
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const populateTags = tags => ({
    type: POPULATE_TAGS,
    payload: {
        tags
    }
});

export const getTags = () => {
    return dispatch => {
        database.collection("tags")
            .get()
            .then(querySnapshot => {
                const tags = querySnapshot.docs[0].data().tags;
                dispatch(populateTags(tags));               
            })
            .catch(error => {
                console.log(error);
            })
    }
}


export const populateDiscussionThreads = discussionThreads => ({
    type: POPULATE_DISCUSSION_THREADS,
    payload: {
        discussionThreads
    }
});

export const getDiscussionThreads = () => {
    return dispatch => {
        database.collection("discussionThreads")
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    let discussionThreads = [];
                    querySnapshot.forEach(doc => {
                        discussionThreads.push({
                            id: doc.id,
                            message: doc.data().message,
                            timeStamp: doc.data().timeStamp.toDate(),
                            title: doc.data().title,
                        })
                    })
                    dispatch(populateDiscussionThreads(discussionThreads))
                } else {
                    console.log("No discussion threads available");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const populateTagsForThread = (docId, tags) => ({
    type: POPULATE_TAGS_FOR_THREAD,
    payload: {
        docId,
        tags
    }
});

export const getTagsForThread = docId => {
    return dispatch => {
        database.collection("discussionThreads")
            .doc(docId)
            .collection("posts")
            .get()
            .then(querySnapshot => {
                const tags = querySnapshot.docs[0].data().tags;
                dispatch(populateTagsForThread(docId, tags));
            })
            .catch(error => {
                console.log(error);
            })
    }
}