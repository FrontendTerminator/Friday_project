import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import {reducer} from "./reducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    state: reducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;