import { combineReducers } from 'redux';
import moviesTvReducer from './homepageReducer';
import moviesReducer from './moviepageReducer';
import tvReducer from './tvshowpageReducer';

export default combineReducers({
    movTv: moviesTvReducer,
    movies: moviesReducer,
    tv: tvReducer,
});