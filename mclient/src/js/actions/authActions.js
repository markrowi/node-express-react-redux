import axios from "axios";

export function login(){
    return function(dispatch){
        dispatch({type:"LOGIN"});
        
    }
}