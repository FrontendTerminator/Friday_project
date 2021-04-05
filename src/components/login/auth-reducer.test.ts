import {authReducer, InitStateType} from "./auth-reducer";

let initState: InitStateType

beforeEach(() => {
    initState = {
        userData: {
            email: null as string | null,
            name: null as string | null,
            avatar: null as string | null,
            publicCardPacksCount: null as number | null
        },
        isLoading: false,
        error: null as string | null,
        isAuthSuccess: false
    }
})

test('Set user data', () => {
    let payload = {
        email: "test@test.com",
        name: "Test",
        avatar: "avatar-test",
        publicCardPacksCount: 17
    }
    const newState = authReducer(initState, {type: "friday-project/login/SET_USER_DATA", payload})
    expect(newState.userData.name).toBe("Test")
    expect(newState.userData.publicCardPacksCount).toBe(17)
    expect(initState.userData.name).toBe(null)
    expect(initState.userData.publicCardPacksCount).toBe(null)
})

test('Set is loading', () => {
    let value = true
    const newState = authReducer(initState, {type: "friday-project/login/SET_IS_LOADING", value})
    expect(newState.isLoading).toBe(true)
    expect(initState.isLoading).toBe(false)

})

test('Set error', () => {
    let error = "Test error message"
    const newState = authReducer(initState, {type: "friday-project/login/SET_ERROR", error})
    expect(newState.error).toBe("Test error message")
    expect(initState.error).toBe(null)
})

test('Set isAuthSuccess', () => {
    let value = true
    const newState = authReducer(initState, {type: "friday-project/login/SET_IS_AUTH_SUCCESS", value})
    expect(newState.isAuthSuccess).toBe(true)
    expect(initState.isAuthSuccess).toBe(false)
})