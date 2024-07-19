import { useState } from "react";
import { Input } from "./Input.jsx";
import { emailValidationMessage, passwordValidationMessage, validateEmail, validatePassword } from "../shared/validators/validator.js";
import { useLogin } from "../shared/hooks/useLogin.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import { useNavigate } from "react-router-dom";

export const Login = ({ switchAuthAndler }) => {
    const { login, isLoading } = useLogin()

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        {
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const mandar = () => {
        navigate('/staygo/register')
    }

    const isSubmitButtonDisable = !formData.email.isValid ||
        !formData.password.isValid

    const handleLogin = async (e) => {
        e.preventDefault()
        login(
            formData.email.value,
            formData.password.value
        )
        console.log(formData)
    }

    const handleValueChange = (value, field) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'email':
                isValid = validateEmail(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            default:
                break
        }
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }
    return (
        <div>
            <div  className="container-fix-login">
                <div className="title-StayGo">
                    <h1>StayGo!</h1>
                </div>
                <div className="login-container">
                    <div className="login-title"><h1>Inicio de Sesión</h1></div>
                    <form action="" className="auth-form"
                        onSubmit={handleLogin}>
                        <Input
                            field='email'
                            label='Email'
                            value={formData.email.value}
                            onChangeHandler={handleValueChange}
                            type='email'
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.email.showError}
                            validationMessage={emailValidationMessage}
                        />
                        <Input
                            field='password'
                            label='Password'
                            value={formData.password.value}
                            onChangeHandler={handleValueChange}
                            type='password'
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.password.showError}
                            validationMessage={passwordValidationMessage}
                        />
                        <button className="login" disabled={isSubmitButtonDisable}>
                            Login
                        </button>
                    </form>
                    <div className="block-suggestion">
                        <span className="suggestion">¿Aún no tienes cuenta?</span>
                        <span className="cursor" onClick={mandar}>Regístrate aquí</span>
                    </div>
                </div>
            </div>
        </div>
    )

}