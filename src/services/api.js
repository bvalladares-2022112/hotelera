import axios from "axios";
import Reservation from "../Pages/Reservation/Reservation";

const apiClient = axios.create({
    baseURL: 'http://localhost:2656',
    timeout: 1000
})

apiClient.interceptors.request.use(
    config=> {
        const token = localStorage.getItem('token')
        if(token) config.headers.Authorization = token
        return config
    },
    err=> Promise.reject(err)
)

export const registerRequest = async(user) => {
    try {
        return await apiClient.post('/staygo/user/register', user)
    } catch (err) {
        return {
        error: true,
        err
        }
    }
}

export const loginRequest = async(user) => {    
    try {
        return await apiClient.put('/staygo/user/login', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getDetailsUser = async (token) => {
    try {
        const response = await apiClient.get('/staygo/user/detailsUser', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return {
            error: true,
            message: err.message || 'Error al obtener la información'
        };
    }
};

export const updateUserRequest = async(token, user) => {
    try {
        const userDetails = await getDetailsUser()
        return await apiClient.put(`/staygo/user/update/${userDetails.uid}`, user, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const reservationRequest = async(reservation, token) => {
    try {
        return await apiClient.post('/staygo/reservation/makeReservation', reservation, {headers: {
            authorization: `Bearer ${token}`,
          }})
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getAllHotels = async (token) => {
    try {
      return await apiClient.get("/staygo/user/viewHotels", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
  };