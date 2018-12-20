import { FETCH_MOVIES, FETCH_TV, FETCH_SIMILAR, FETCH_TRENDING, FETCH_VIDEO, FETCH_TRENDING_TV, FETCH_VIDEO_TV } from '../actions/actions';

const initState = {
    trending: [],
    videos: [],
    similar: [],
    trendingTv: [],
    videostv: []
}

const moviesTvReducer = (state = initState, action) => {
    switch (action.type){
        case FETCH_TRENDING:
        return {
            ...state,
            trending: [action.payload]
        }
        case FETCH_VIDEO:
        return {
            ...state,
            videos: [action.payload]
        }
        case FETCH_SIMILAR:
        return {
            ...state,
            similar: [action.payload]
        }
        case FETCH_TRENDING_TV:
        return {
            ...state,
            trendingTv: [action.payload]
        }
        case FETCH_VIDEO_TV:
        return {
            ...state,
            videostv: [action.payload]
        }
        default:
        return state;
    }
}


export default moviesTvReducer;