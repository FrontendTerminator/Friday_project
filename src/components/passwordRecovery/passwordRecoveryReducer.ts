import {Dispatch} from "redux"
import {api} from "../../api/api";

type PasswordRecoveryReducerActionType = ReturnType<typeof changeRequestStatusAC>

type PasswordRecoveryReducerStateType = {
    requestStatus: boolean
}

const initialState: PasswordRecoveryReducerStateType = {
    requestStatus: false
}

export const passwordRecoveryReducer = (state: PasswordRecoveryReducerStateType = initialState, action: PasswordRecoveryReducerActionType): PasswordRecoveryReducerStateType => {
    switch (action.type) {
        case "passwordRecovery/CHANGE-REQUEST-STATUS":
            return {
                ...state,
                requestStatus: action.status
            }
        default:
            return state
    }
}

export const changeRequestStatusAC = (status: boolean) => {
    return {type: 'passwordRecovery/CHANGE-REQUEST-STATUS', status} as const
}

// Thunk

export const passwordRecoveryTC = (email: string) => {
    return (dispatch: Dispatch) => {
        api.passwordRecovery(email)
            .then(res => {
                if (res.data.success === true) {
                    dispatch(changeRequestStatusAC(true))
                }
            })
            .catch(error => {
                alert(error)
            })
    }
}



