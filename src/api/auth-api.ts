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
    setRegister(email: string, password: string) {
        return instance.post('auth/register', {email, password}).then(response => {
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
            },
            {withCredentials: true}
        )
    }
}
export type TypeCards = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    _id: string
}
export type TypeResponsePacks = {
    cardPacks: TypeCards[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type TypeResponseAddPacks = {
    newCardsPack: TypeCards
    token: string
    tokenDeathTime: number
}
export const packsApi = {
    getPacks() {
        return instance.get<TypeResponsePacks>('cards/pack?pageCount=10')
            .then(response => response.data)
    },
    setPacks(name:string) {
        return instance.post<TypeResponseAddPacks>('cards/pack', {
            cardsPack: {
                name
            }
        })
            .then(response => response.data)
    },
    deletePacks(id: string|undefined) {
        return instance.delete<TypeResponseAddPacks>(`cards/pack?id=${id}`)
            .then(response => response.data)
    },
    updatePacks(id: string|undefined,name:string) {
        return instance.put<TypeResponseAddPacks>(`cards/pack`, {
            cardsPack: {
                _id: id,
                name
            }
        })
            .then(response => response.data)
    },

}