import {
    LOGIN_STATUS
} from '../reducer/actionType'

export const setLoginStatus = (changeStatus) => {
    return{
        type: LOGIN_STATUS,
        payload:{
            login_status:changeStatus
        }
    }
}