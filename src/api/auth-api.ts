import axios from "axios";
import {AuthDataType} from "../components/login/Login";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    /*baseURL: 'http://localhost:7542/2.0/',*/
    withCredentials: true
})

export const authAPI = {
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

export const ApiRegister = {
    setRegister (email:string,password:string){
        return  instance.post('auth/register',{email,password}).then(response =>{
            return response.data
        })
    }

}

export const passwordRecoveryApi = {
    passwordRecovery(email: string, domain: string) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot',
            {
                email: email,
                from: "Test-front-admin <mikutishvili.koba@gmail.com>",
                message: `<div>Password recovery. Click this <a href='http://${domain}/#/newPassword/$token$'>link</a></div>`
            }
        )
    }
}