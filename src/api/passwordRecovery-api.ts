import axios from "axios";

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
