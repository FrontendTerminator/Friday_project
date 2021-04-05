import {
    changeRequestStatusAC,
    passwordRecoveryReducer,
    PasswordRecoveryReducerStateType, setErrorAC, setRequestStatusAC
} from "./passwordRecoveryReducer";

let initialState: PasswordRecoveryReducerStateType

beforeEach(()=>{
    initialState = {
        serverResponseStatus: false,
        error: "",
        serverRequestStatus: "undefined"
    }
})

test("passwordRecovery/CHANGE-REQUEST-STATUS", ()=>{

    const endState = passwordRecoveryReducer(initialState, changeRequestStatusAC(true))

    expect(endState.serverResponseStatus).toBe(true)
    expect(initialState.serverResponseStatus).toBe(false)
})

test("passwordRecovery/SET-ERROR", ()=>{

    const endState = passwordRecoveryReducer(initialState, setErrorAC("Response text"))

    expect(endState.error).toBe("Response text")
    expect(initialState.error).toBe("")
})

test("passwordRecovery/SET-REQUEST-STATUS", ()=>{

    const endState = passwordRecoveryReducer(initialState, setRequestStatusAC("completed"))

    expect(endState.serverRequestStatus).toBe("completed")
    expect(initialState.serverRequestStatus).toBe("undefined")
})


