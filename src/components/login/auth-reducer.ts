import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {authAPI} from "../../api/auth-api";
import {AuthDataType} from "./Login";
import {setIsRegisterAC, TypesetIsRegister} from "../registration/registrationReducer";

export type UserDataType = {
    email: string | null
    name: string | null
    avatar: ""
    publicCardPacksCount: number | null
}

export type InitStateType = {
    userData: UserDataType
    isLoading: boolean
    error: null | string
    isAuthSuccess: boolean
}

let initState: InitStateType = {
    userData: {
        email: null as string | null,
        name: null as string | null,
        avatar: "",
        publicCardPacksCount: null as number | null
    },
    isLoading: false,
    error: null as string | null,
    isAuthSuccess: false
}

export const authReducer = (state = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "friday-project/login/SET_USER_DATA":
            return {
                ...state, userData: {...action.payload}
            }

        case "friday-project/login/SET_IS_LOADING":
            return {
                ...state, isLoading: action.value
            }

        case "friday-project/login/SET_ERROR":
            return {
                ...state, error: action.error
            }

        case "friday-project/login/SET_IS_AUTH_SUCCESS":
            return {
                ...state, isAuthSuccess: action.value
            }

        default:
            return state
    }
}

// Actions
const setUserData = (payload: UserDataType) => ({type: 'friday-project/login/SET_USER_DATA', payload} as const)
const setIsLoading = (value: boolean) => ({type: 'friday-project/login/SET_IS_LOADING', value} as const)
export const setError = (error: string) => ({type: 'friday-project/login/SET_ERROR', error} as const)
const setIsAuthSuccess = (value: boolean) => ({type: 'friday-project/login/SET_IS_AUTH_SUCCESS', value} as const)

// Thunks
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>
type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType|TypesetIsRegister>




export const signIn = (payload: AuthDataType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsLoading(true))
        let res = await authAPI.signIn(payload)
        dispatch(setIsLoading(false))
        dispatch(setIsAuthSuccess(true))
        dispatch(setUserData(res.data))
        dispatch(setError(''))
    } catch (e) {
        let error = e.response.data.error
        dispatch(setIsLoading(false))
        dispatch(setError(error))
    }
}

export const signOut = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsLoading(true))
         await authAPI.signOut()
        dispatch(setIsLoading(false))
        dispatch(setIsAuthSuccess(false))
        dispatch(setIsRegisterAC(false))

    } catch (e) {
        let error = e.response.data.error
        dispatch(setIsLoading(false))
        dispatch(setError(error))
    }
}

export const authMe = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        let res = await authAPI.authMe()
        dispatch(setIsAuthSuccess(true))
        dispatch(setUserData(res.data))
    } catch (e) {
        let error = e.response.data.error
        dispatch(setIsLoading(false))
        dispatch(setError(error))
    }
}

type SetUserDataActionType = ReturnType<typeof setUserData>
type SetIsLoadingActionType = ReturnType<typeof setIsLoading>
type SetErrorActionType = ReturnType<typeof setError>
type SetIsAuthSuccess = ReturnType<typeof setIsAuthSuccess>

type ActionsType = SetUserDataActionType | SetIsLoadingActionType | SetErrorActionType | SetIsAuthSuccess