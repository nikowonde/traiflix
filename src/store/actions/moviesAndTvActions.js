import { FETCH_MOVIES, FETCH_TV, FETCH_SIMILAR, FETCH_TRENDING, FETCH_VIDEO, FETCH_TRENDING_TV, FETCH_VIDEO_TV} from './actions';
import Axios from 'axios';

const API_KEY = 'b88e9244e3063c88c1580b844b5a5b95';
const API_URL = 'https://api.themoviedb.org/3/';

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

export const fetchVideo = (movieId) => {
    return dispatch => {
        console.log(movieId)
        Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
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

export const fetchTvVideo = (tvId) => {
    return dispatch => {
        console.log(tvId)
        Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) =>{
            //console.log(res.data)
            dispatch({
                type: FETCH_VIDEO_TV,
                payload: res.data.results.length > 0? res.data.results : []
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchSimilar = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/movie/335983/similar?api_key=${API_KEY}&language=en-US&page=1`)
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
            console.log(res.data)
            dispatch({
                type: FETCH_TRENDING_TV,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

//https://api.themoviedb.org/3/movie/335983/videos?api_key=b88e9244e3063c88c1580b844b5a5b95&language=en-US