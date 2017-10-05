import initialState from './initialState';

export default function reducer(state=initialState.auth, action){
    
    switch (action.type){
        case "USER_LOG_IN": {
            return {
                ...state,
                isLogged:true
            }
        }
        case "USER_LOG_OUT" : {
            return {
                ...state,
                isLogged:false
            }
        }
        case "USER_" : {

        }
         default : {
            return state;
        }
    }

}