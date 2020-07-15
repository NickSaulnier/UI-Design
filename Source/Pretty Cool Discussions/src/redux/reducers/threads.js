import { POPULATE_DISCUSSION_THREADS, POPULATE_TAGS_FOR_THREAD } from '../actionConstants';

const INITIAL_STATE = []

export const threadsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULATE_DISCUSSION_THREADS:
            return [...action.payload.discussionThreads]
        case POPULATE_TAGS_FOR_THREAD:
            state.forEach(thread =>{
                if (thread.id === action.payload.docId) {
                    thread.tags = [...action.payload.tags]
                }
            });
            return state;
        default:
            return state;
    }
}