import {
    LOGIN_STATUS
} from './actionType'

const initState = {
    login_status:false
}

const myReducer= (state = initState, action)=>{
    switch(action.type){
        case LOGIN_STATUS:{
            const status = state
            return{
                login_status: status
            }
        }
        default:
            return state
    }
}

export {myReducer};