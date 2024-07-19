import { useState } from "react"
import { getAllHotels } from "../../services/api"
import toast from "react-hot-toast"

export const useDetailsUser = () => {
    const [hotelDetails, setDetailsHotel] = useState(null)

    const getHotels = async(token) => {
        const response = await getAllHotels(token)
        if(response.error) {
            return toast.error(
                response?.err?.response?.data ||
                'Error al obtener la información'
            )
        }
        setDetailsHotel(response.data)
    }
    return {
        hotelDetails,
        isFetching: !hotelDetails,
        getHotels
    }
}