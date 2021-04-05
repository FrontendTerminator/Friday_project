import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import {reducer} from "./reducer";
import thunk from "redux-thunk";
import {ReducerRegister} from "../components/registration/registrationReducer";
import {authReducer} from "../components/login/auth-reducer";
import {passwordRecoveryReducer} from "../components/passwordRecovery/passwordRecoveryReducer";

let rootReducer = combineReducers({
    state: reducer,
    register:ReducerRegister,
    auth: authReducer,
    passwordRecovery: passwordRecoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;