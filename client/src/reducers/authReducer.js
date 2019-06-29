import {LOGOUT_USER, SET_CURRENT_USER,} from '../actions/types';

const  initialState={
    isAuthenticated:false,
    number:null
}

export default function(state=initialState,action){
    switch(action.type){
        case SET_CURRENT_USER:
        return{
            ...state,
            isAuthenticated: true,
            number:action.payload
        }
        case LOGOUT_USER:
        return{
            ...state,
            isAuthenticated: false,
            number:null
        }
        
        default:
        return state;
    }
}