import { useState } from "react"
import { Register } from "../../components/Register/Register.jsx"
import { Login } from '../../components/Login.jsx'
 
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const handleAuthPage = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div>
      {
        isLogin ? (
          <Login />
        ) : (
          <Register switchAuthAndler={handleAuthPage}/>
        )
      }
    </div>
  )
}