import { useState } from "react"
import { getDetailsUser } from "../../services/api"
import toast from "react-hot-toast"

export const useDetailsUser = () => {
    const [userDetails, setDetailsUser] = useState(null)

    const getDetails = async(token) => {
        const response = await getDetailsUser(token)
        if(response.error) {
            return toast.error(
                response?.err?.response?.data ||
                'Error al obtener la información'
            )
        }
        setDetailsUser(response.data)
    }
    return {
        userDetails,
        isFetching: !userDetails,
        getDetails
    }
}