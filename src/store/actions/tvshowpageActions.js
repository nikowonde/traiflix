import {FETCH_WAR_TV, FETCH_VIDEO_TV, FETCH_SCIFAN_TV, FETCH_ANIM_TV} from './actions';
import Axios from 'axios';

const API_KEY = 'b88e9244e3063c88c1580b844b5a5b95';

export const fetchWarTv = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=18%2C%2010768&include_null_first_air_dates=false`)
        .then((res) => {
            //console.log(res.data)
            dispatch({
                type: FETCH_WAR_TV,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchTvVideo = (tv) => {
    return dispatch => {
        //console.log(tv)
        Axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/videos?api_key=${API_KEY}&language=en-US`)
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

export const fetchSciFanTv = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=10765&include_null_first_air_dates=false`)
        .then((res) => {
            //console.log(res.data)
            dispatch({
                type: FETCH_SCIFAN_TV,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
}

export const fetchAnimTv = () => {
    return dispatch => {
        Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=16&include_null_first_air_dates=false`)
        .then((res) => {
            dispatch({
                type: FETCH_ANIM_TV,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    } 
}