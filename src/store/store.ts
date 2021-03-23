import { createStore } from "redux";
import { combineReducers } from "redux";
import {reducer} from "./reducer";

let rootReducer = combineReducers({
    state: reducer
})

const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;