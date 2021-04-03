import {Dispatch} from "react";
import {ApiRegister} from "../../api/RegistrApi";

let initialState: ReducerStateType = {
    status: "free",
    isRegister: false,
    error:"",
}
const setStatusAC = (status: TypeStatus) => {
    return {
        type: '/register_reducer/SET_STATUS',
        status
    } as const
}
const setIsRegisterAC = (isRegister: boolean) => {
    return {
        type: '/register_reducer/SET_IS_REGISTER',
        isRegister
    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: '/register_reducer/SET_ERROR',
        error
    } as const
}
export const ReducerRegister = (state: ReducerStateType = initialState, action: ReducerActionType): ReducerStateType => {
    switch (action.type) {

        case "/register_reducer/SET_IS_REGISTER": {
            return {
                ...state,
                isRegister: action.isRegister
            }
        }
        case "/register_reducer/SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "/register_reducer/SET_ERROR": {
            return {
                ...state,
                error: action.error
            }
        }

        default:
            return state
    }
}

export const registerTC = (email: string, password: string) => async (dispatch: Dispatch<ReducerActionType>) => {
    try {
        dispatch(setStatusAC("loading"))
          await ApiRegister.setRegister(email, password)
        dispatch(setStatusAC("success"))
        dispatch(setIsRegisterAC(true))
    } catch (e) {
        const error:TypeError = e.response.data;
        dispatch(setStatusAC("error"))
        dispatch(setErrorAC(error.error))

    }


}
export type TypeStatus = 'free' | 'loading' | 'success' | 'error'
type ReducerStateType = {
    status: TypeStatus
    isRegister: boolean
    error:string
}
type TypeError = {
    emailRegExp: {}
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    passwordRegExp: string
}
type ReducerActionType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setIsRegisterAC>
    | ReturnType<typeof setErrorAC>