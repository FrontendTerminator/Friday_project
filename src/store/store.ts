import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {ReducerRegister} from "../components/registration/registrationReducer";
import {authReducer} from "../components/login/auth-reducer";
import {passwordRecoveryReducer} from "../components/passwordRecovery/passwordRecoveryReducer";
import {packsReducer} from "../components/packs/paskReducer";

let rootReducer = combineReducers({
    register:ReducerRegister,
    auth: authReducer,
    passwordRecovery: passwordRecoveryReducer,
    packs:packsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;