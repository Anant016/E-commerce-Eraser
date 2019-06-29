import { SET_CURRENT_USER,LOGOUT_USER,GET_ERROR} from './types';
import axios from 'axios'

const jwt=require('jsonwebtoken');
const key=require('../config/key');

export const setCurrentUser=(decoded)=>{
    return{
        type:SET_CURRENT_USER,
        payload:decoded
    }
}

export const loginUser=(number,history)=>dispatch=>{
   console.log('action called.')
    dispatch({
        type:SET_CURRENT_USER,
        payload:number
    })
    
    //generate token
    const payload={number:number}
    jwt.sign(payload,key.secret,{expiresIn:108000},(err,token)=>{
        if(err){
            console.log(err)
        }
        else{
        //set jwt token
        localStorage.setItem('jwtToken','JWT '+token);

        //set token to Auth header
            //Apply to every request
            axios.defaults.headers.common['Authorization']=token;
        //Decode token to get userData
        //const decoded=jwt_decode(token);
        }
    })

    history.push('/cart')
    
   
}

export const logOut=(history)=>dispatch=>{
    dispatch({
        type:LOGOUT_USER
    })
    //remove jwt token
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    history.push('/login');
    
}

export const addError=(error)=>dispatch=>{
    dispatch({
        type:GET_ERROR,
        payload:error
    })
    
}