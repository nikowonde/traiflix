import { combineReducers } from 'redux';
import moviesTvReducer from './moviesAndTvReducer'

export default combineReducers({
    movTv: moviesTvReducer
});