import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import {reducer} from "./reducer";
import thunk from "redux-thunk";
import {ReducerRegister} from "../components/registration/registrationReducer";

let rootReducer = combineReducers({
    state: reducer,
    register:ReducerRegister
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;