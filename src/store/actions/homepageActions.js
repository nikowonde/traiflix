import { FETCH_SIMILAR, FETCH_TRENDING, FETCH_VIDEO, FETCH_TRENDING_TV, FETCH_VIDEO_TV, FETCH_VIDEO_CREDITS, FETCH_SEARCH_RESULT, FETCH_PERSON_INFO, FETCH_PERSON_CREDITS} from './actions';
import Axios from 'axios';

const API_KEY = 'b88e9244e3063c88c1580b844b5a5b95';

//

export const fetchSuggested = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/trending/movies/week?api_key=${API_KEY}`)
        .then((res) => {
            //console.log(res.data)
            dispatch({
                type: FETCH_TRENDING,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchVideo = (movie) => {
    return dispatch => {
        //console.log(movie.id)
        Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) =>{
            //console.log(res.data)
            dispatch({
                type: FETCH_VIDEO,
                payload: res.data.results.length > 0? res.data.results : []
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchTvVideo = (tv) => {
    return dispatch => {
        //console.log(tv.id)
        Axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) =>{
            //console.log(res.data)
            dispatch({
                type: FETCH_VIDEO_TV,
                payload: res.data.results.length > 0 ? res.data.results : []
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchVideoCredits = (modal) => {
    return dispatch => {
        console.log(modal.media_type)
        console.log(modal.id)
        Axios.get(`https://api.themoviedb.org/3/${modal.media_type}/${modal.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) =>{
            console.log(res.data)
            dispatch({
                type: FETCH_VIDEO_CREDITS,
                payload: res.data.results.length > 0 ? res.data.results : []
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchSimilar = (movieId) => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`)
        .then((res) => {
            //console.log(res.data)
            dispatch({
                type: FETCH_SIMILAR,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchTrendingTv = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
        .then((res) => {
            //console.log(res.data)
            dispatch({
                type: FETCH_TRENDING_TV,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchSearchResults = (tmpValue) => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${tmpValue}&page=1&include_adult=false`)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: FETCH_SEARCH_RESULT,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchPersonInfo = (personId) => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=en-US`)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: FETCH_PERSON_INFO,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchPersonCredits = (personId) => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}&language=en-US`)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: FETCH_PERSON_CREDITS,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

//https://api.themoviedb.org/3/movie/335983/videos?api_key=b88e9244e3063c88c1580b844b5a5b95&language=en-US