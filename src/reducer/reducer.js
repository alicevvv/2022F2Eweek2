import {
    LOGIN_STATUS,
    SIGNING_FILE,
    SIGN_LIST,
} from './actionType'

const initState = {
    login_status:false,
    file:'',
    sign_lists:[]
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
        case SIGN_LIST:
            return{
                ...state,
                sign_lists:state.sign_lists.concat(action.payload.sign_data)
            }
        default:
            return state
    }
}

export {myReducer};