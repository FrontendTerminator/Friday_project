import {Dispatch} from "redux"
import {passwordRecoveryApi} from "../../api/auth-api";

const initialState: PasswordRecoveryReducerStateType = {
    serverResponseStatus: false,
    error: "",
    serverRequestStatus: 'undefined'
}

export const passwordRecoveryReducer = (state: PasswordRecoveryReducerStateType = initialState, action: PasswordRecoveryReducerActionType): PasswordRecoveryReducerStateType => {
    switch (action.type) {
        case "passwordRecovery/CHANGE-REQUEST-STATUS":
            return {...state, serverResponseStatus: action.status}
        case "passwordRecovery/SET-ERROR":
            return {...state, error: action.error}
        case "passwordRecovery/SET-REQUEST-STATUS":
            return {...state, serverRequestStatus: action.serverRequestStatus}
        default:
            return state
    }
}

export const changeRequestStatusAC = (status: boolean) => {
    return {type: 'passwordRecovery/CHANGE-REQUEST-STATUS', status} as const
}
export const setErrorAC = (error: string) => {
    return {type: 'passwordRecovery/SET-ERROR', error} as const
}
export const setRequestStatusAC = (serverRequestStatus: ServerRequestStatusType) => {
    return {type: 'passwordRecovery/SET-REQUEST-STATUS', serverRequestStatus} as const
}

// Thunk
export const passwordRecoveryTC = (email: string, currentPageDomain: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setRequestStatusAC("active"))
        passwordRecoveryApi.passwordRecovery(email, currentPageDomain)
            .then(res => {
                if (res.data.success === true) {
                    dispatch(changeRequestStatusAC(true))
                    dispatch(setRequestStatusAC("completed"))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.response.data.error))
                dispatch(setRequestStatusAC("completed"))
            })
    }
}

export type PasswordRecoveryReducerStateType = {
    serverResponseStatus: boolean
    error: string
    serverRequestStatus: ServerRequestStatusType
}

export type ServerRequestStatusType = 'active' | 'completed' | 'undefined'

type PasswordRecoveryReducerActionType =
    | ReturnType<typeof changeRequestStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setRequestStatusAC>