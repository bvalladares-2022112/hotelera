import { useState } from "react";
import toast from "react-hot-toast";
import { reservationRequest } from "../../services/api";

export const useReservation = () => {
    const [isLoading, setIsLoading] = useState(false)

    const reservation = async(client, resDate, InDate, OutDate, Room) => {
        setIsLoading(true)
        const reservation = {
            client, resDate, InDate, OutDate, Room
        }
        const response = await reservationRequest(reservation)
        setIsLoading(false)

        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error al hacer tu reservación'
            )
        }
        console.log(response)
    }
    return {
        reservation,
        isLoading
    }
}