import {ReducerRegister, ReducerStateType, setErrorAC, setIsRegisterAC, setStatusAC} from "./registrationReducer";

let  state:ReducerStateType;

beforeEach(()=>{
    state = {
        status: "free",
        isRegister: false,
        error: "",
    }
})
test('setStatus',()=>{

    let action = setStatusAC('loading')
    let result = ReducerRegister(state,action)

    expect(result.status).toBe('loading')
})

test('setIsRegister',()=>{

    let action = setIsRegisterAC(true)
    let result = ReducerRegister(state,action)

    expect(result.isRegister).toBe(true)

})
test('setError',()=>{

    let action = setErrorAC("Error")
    let result = ReducerRegister(state,action)

    expect(result.error.length>1).toBe(true)
    expect(result.error).toEqual('Error')

})