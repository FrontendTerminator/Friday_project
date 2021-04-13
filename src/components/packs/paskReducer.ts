import {Dispatch} from "redux";
import {packsApi, TypeResponsePacks} from "../../api/auth-api";
import {TypeStatus} from "../registration/registrationReducer";

const initialState: TypeInitialState = {
    status:'free',
    packs: null,
    error:''

}
export const setStatusPacksAC = (status: TypeStatus) => {
    return {
        type: 'packs/SET_STATUS',
        status
    } as const
}
const getPacksAC = (packs: TypeResponsePacks) => {
    return {
        type: 'packs/GET_PACKS',
        packs
    } as const
}
export const setErrorPacksAC = (error: string) => {
    return {
        type: 'packs/SET_ERROR',
        error
    } as const
}
export const packsReducer = (state: TypeInitialState = initialState, action: TypeActions): TypeInitialState => {
    switch (action.type) {

        case "packs/GET_PACKS": {
            return {
                ...state,
                packs: action.packs
            }
        }
        case "packs/SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "packs/SET_ERROR": {
            return {
                ...state,
                error: action.error
            }
        }
        default: {
            return state
        }
    }
}

export const getPackTC = () => async (dispatch: Dispatch<TypeThunkDispatch>) => {
    try{
        dispatch(setStatusPacksAC('loading'))
        let result = await packsApi.getPacks()
        dispatch(getPacksAC(result))
        dispatch(setErrorPacksAC(""))
        dispatch(setStatusPacksAC('success'))
    }catch (e) {
        const error: TypeError = e.response.data;
            dispatch(setErrorPacksAC(error.error))
            dispatch(setStatusPacksAC('success'))

    }
}
export const setPackTC = (name:string) => async (dispatch: Dispatch<TypeThunkDispatch>) => {
    try{
        dispatch(setStatusPacksAC('loading'))
        await packsApi.setPacks(name)
        let result =  await packsApi.getPacks()
        dispatch(getPacksAC(result))
        dispatch(setErrorPacksAC(""))
        dispatch(setStatusPacksAC('success'))
    }catch (e) {
        const error: TypeError = e.response.data;
        dispatch(setErrorPacksAC(error.error))
        dispatch(setStatusPacksAC('success'))

    }
}
export const deletePackTC = (id:string|undefined) => async (dispatch: Dispatch<TypeThunkDispatch>) => {
    try{
        dispatch(setStatusPacksAC('loading'))
        await packsApi.deletePacks(id)
        let result =  await packsApi.getPacks()
        dispatch(getPacksAC(result))
        dispatch(setErrorPacksAC(""))
        dispatch(setStatusPacksAC('success'))


    }catch (e) {
        const error: TypeError = e.response.data;
        dispatch(setErrorPacksAC(error.error))
        dispatch(setStatusPacksAC('success'))

    }
}
export const updatePackTC = (id:string|undefined,name:string) => async (dispatch: Dispatch<TypeThunkDispatch>) => {
    try{
        dispatch(setStatusPacksAC('loading'))
        await packsApi.updatePacks(id,name)
        let result =  await packsApi.getPacks()
        dispatch(getPacksAC(result))
        dispatch(setErrorPacksAC(""))
        dispatch(setStatusPacksAC('success'))


    }catch (e) {
        const error: TypeError = e.response.data;
        dispatch(setErrorPacksAC(error.error))
        dispatch(setStatusPacksAC('success'))

    }
}

type TypeInitialState = {
    status:TypeStatus
    packs: TypeResponsePacks | null;
    error:string
}
type TypeError = {
    error: string
    in:string
}
type TypeThunkDispatch = TypeActions;
type TypeGetPacksAC = ReturnType<typeof getPacksAC>
type TypeActions = TypeGetPacksAC |ReturnType<typeof setStatusPacksAC> |ReturnType<typeof setErrorPacksAC>;