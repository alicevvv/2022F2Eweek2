import {
    LOGIN_STATUS
} from './actionType'

const initState = {
    login_status:false
}

const myReducer= (state = initState, action)=>{
    switch(action.type){
        case LOGIN_STATUS:
            return{
                ...state,
                login_status: action.payload.login_status
            }
        default:
            return state
    }
}

export {myReducer};