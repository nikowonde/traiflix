import { FETCH_ACTION_M, FETCH_VIDEO_MOV, FETCH_COMEDY_M, FETCH_FAMILY_M } from '../actions/actions';

const initState = {
    actions: [],
    comedy: [],
    family: [],
    videos: [],
}

const moviesReducer = (state = initState, action) => {
    switch (action.type){
        case FETCH_ACTION_M:
        return {
            ...state,
            actions: [action.payload]
        }
        case FETCH_COMEDY_M:
        return {
            ...state,
            comedy: [action.payload]
        }
        case FETCH_FAMILY_M:
        return {
            ...state,
            family: [action.payload]
        }
        case FETCH_VIDEO_MOV:
        return {
            ...state,
            videos: [action.payload]
        }
        default:
        return state;
    }
}

export default moviesReducer;