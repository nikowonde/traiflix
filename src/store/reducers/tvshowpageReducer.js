import {FETCH_WAR_TV, FETCH_SCIFAN_TV, FETCH_ANIM_TV} from '../actions/actions';

const initState = {
    war: [],
    scifan: [],
    anim: [],
}

const tvReducer = (state = initState, action) => {
    switch (action.type){
        case FETCH_WAR_TV:
        return {
            ...state,
            war: [action.payload]
        }
        case FETCH_SCIFAN_TV:
        return {
            ...state,
            scifan: [action.payload]
        }
        case FETCH_ANIM_TV:
        return {
            ...state,
            anim: [action.payload]
        }
        default:
        return state;
    }
}

export default tvReducer;