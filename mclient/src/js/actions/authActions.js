import axios from "axios";

export function login(){
    return function(dispatch){ //THUNK
        dispatch(login);
    }
}


export const loginUser = () => {
    return { type:"LOGIN_USER", payload:""}
}


export const isAuthenticated