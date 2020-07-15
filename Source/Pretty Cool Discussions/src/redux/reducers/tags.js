import { POPULATE_TAGS } from '../actionConstants';

const INITIAL_STATE = [];

export const tagsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULATE_TAGS:
            return [...action.payload.tags]
        default:
            return state;
    }
}