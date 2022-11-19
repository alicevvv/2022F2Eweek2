import {
    LOGIN_STATUS,
    SIGNING_FILE
} from './actionType'

const initState = {
    login_status:false,
    file:''
}

const myReducer= (state = initState, action)=>{
    switch(action.type){
        case LOGIN_STATUS:
            return{
                ...state,
                login_status: action.payload.login_status
            }
        case SIGNING_FILE:
            return{
                ...state,
                file: action.payload.file_data
            }
        default:
            return state
    }
}

export {myReducer};