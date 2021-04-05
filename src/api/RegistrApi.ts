import axios from "axios";

const instance =axios.create({
    baseURL:'http://localhost:7542/2.0/',
    withCredentials:true
})

export const ApiRegister = {
        setRegister (email:string,password:string){
            return  instance.post('auth/register',{email,password}).then(response =>{
                return response.data
            })
}

}
