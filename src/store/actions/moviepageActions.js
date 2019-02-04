import {FETCH_ACTION_M, FETCH_COMEDY_M, FETCH_FAMILY_M, FETCH_VIDEO_MOV} from './actions';
import Axios from 'axios';

const API_KEY = 'b88e9244e3063c88c1580b844b5a5b95';

export const fetchActionM = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&primary_release_year=2018&with_genres=28`)
        .then((res)=> {
            //console.log(res.data.results)
            dispatch({
                type: FETCH_ACTION_M,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchComedyM = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=vote_count.desc&include_adult=true&include_video=true&page=1&primary_release_date.gte=2010&with_genres=35`)
        .then((res)=> {
            //console.log(res.data.results)
            dispatch({
                type: FETCH_COMEDY_M,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchFamilyM = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=vote_count.desc&include_adult=true&include_video=true&page=1&primary_release_date.gte=2018&with_genres=10751`)
        .then((res)=> {
            //console.log(res.data.results)
            dispatch({
                type: FETCH_FAMILY_M,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchMovVideo = (movie) => {
    return dispatch => {
        console.log(movie.id)
        Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) =>{
            //console.log(res.data)
            dispatch({
                type: FETCH_VIDEO_MOV,
                payload: res.data.results.length > 0? res.data.results : []
            })
        })
        .catch((err) => console.log(err))
    }
}


