import axios from "axios";
import {AuthDataType} from "../components/login/Login";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})

export const loginAPI = {
    authMe() {
        return instance.post('/auth/me')
    },
    signIn(payload: AuthDataType) {
        return instance.post('/auth/login', payload)
    },
    signOut() {
        return instance.delete('/auth/me')
    }
}

