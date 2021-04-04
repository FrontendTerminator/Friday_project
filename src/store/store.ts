import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer} from "./reducer";
import thunk from "redux-thunk";
import {authReducer} from "../components/login/auth-reducer";

let rootReducer = combineReducers({
    state: reducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;