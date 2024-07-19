import { useState } from "react"
import {useLogout as logOut} from "./useLogout.jsx"

const getUserDetails = ()=>{

    const userDetails = localStorage.getItem('token')
    return userDetails
}
const logoutSys = ()=>{
    logOut()
}
export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails())
  return {
    isLogged: Boolean(userDetails),
    username: userDetails?.username ? userDetails.username : 'Guest',
    logoutSys
  }
}