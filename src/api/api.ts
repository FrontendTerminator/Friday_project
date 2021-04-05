import axios from "axios";

export const api = {
    passwordRecovery(email: string) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {email: email, from: "", message: ''})
    }
}
