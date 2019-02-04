import { FETCH_SIMILAR, FETCH_TRENDING, FETCH_VIDEO, FETCH_TRENDING_TV, FETCH_VIDEO_TV, FETCH_VIDEO_CREDITS, SEARCH_INPUT, FETCH_SEARCH_RESULT, FETCH_PERSON_INFO, FETCH_PERSON_CREDITS, CHANGE_USERNAME, SAVE_CHANGES } from '../actions/actions';

const initState = {
    trending: [],
    videos: [],
    similar: [],
    trendingTv: [],
    videostv: [],
    searchInput: '',
    results: [],
    personInfo: '',
    credits: [],
    creditVid: [],
    username: 'Jack',
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
        case FETCH_VIDEO_CREDITS:
        return {
            ...state,
            creditVid: [action.payload]
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
        case SEARCH_INPUT:
        return {
            ...state,
            searchInput: action.value
        }
        case FETCH_SEARCH_RESULT:
        return {
            ...state,
            results: [action.payload]
        }
        case FETCH_PERSON_INFO: 
        return {
            ...state,
            personInfo: [action.payload]
        }
        case FETCH_PERSON_CREDITS:
        return {
            ...state,
            credits: [action.payload]
        }
        case CHANGE_USERNAME:
        return {
            ...state,
            username: action.value
        }
        default:
        return state;
    }
}


export default moviesTvReducer;