import { useState } from "react";
import toast from 'react-hot-toast';
import { registerRequest } from "../../services/api.js";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const register = async(name, surname, username, email, password) => {
        setIsLoading(true)
        const user = {
            name, surname, username, email, password
        }
        const response = await registerRequest(user)
        setIsLoading(false)

        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error general al intentar registrar al usuario. Intenta de nuevo.'
            )
        }
        console.log(response)
    }
    return {
        register,
        isLoading
    }
}