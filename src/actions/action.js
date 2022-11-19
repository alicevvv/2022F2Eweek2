import {
    LOGIN_STATUS,
    SIGNING_FILE
} from '../reducer/actionType'

export const setLoginStatus = (changeStatus) => {
    return{
        type: LOGIN_STATUS,
        payload:{
            login_status:changeStatus
        }
    }
}

export const setSignFile = (sign_file) => {
    return {
        type:SIGNING_FILE,
        payload:{
            file_data:sign_file
        }
    }
}