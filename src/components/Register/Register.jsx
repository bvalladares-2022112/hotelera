import { useState } from "react";
import { Input } from '../Input.jsx'
import { nameValidationMessage, surnameValidationMessage, emailValidationMessage, passwordConfirmValidationMessage, passwordValidationMessage, usernameValidationMessage, validateName, validateSurname, validateEmail, validatePassword, validatePasswordConfirm, validateUsername } from "../../shared/validators/validator.js";
import { useRegister } from "../../shared/hooks/useRegister.jsx";
import './Register.css'
import { useNavigate } from "react-router-dom";

export const Register = ({ switchAuthAndler }) => {
    const { register, isLoading } = useRegister()

    const navigate = useNavigate()
    const mandar = () => {
        navigate('/staygo/login')
    }

    const [formData, setFormData] = useState(
        {
            name: {
                value: '',
                isValid: false,
                showError: false
            },
            surname: {
                value: '',
                isValid: false,
                showError: false
            },
            username: {
                value: '',
                isValid: false,
                showError: false
            },
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            },
            passwordConfirm: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const isSubmitButtonDisable = !formData.name.isValid ||
        !formData.surname.isValid ||
        !formData.username.isValid ||
        !formData.email.isValid ||
        !formData.password.isValid ||
        !formData.passwordConfirm.isValid

    const handleRegister = async (e) => {
        e.preventDefault()
        register(
            formData.name.value,
            formData.surname.value,
            formData.username.value,
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
            case 'name':
                isValid = validateName(value)
                break
            case 'surname':
                isValid = validateSurname(value)
                break
            case 'email':
                isValid = validateEmail(value)
                break
            case 'username':
                isValid = validateUsername(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            case 'passwordConfirm':
                isValid = validatePasswordConfirm(formData.password.value, value)
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
        <div className="container-fix-register">
            <div className="title-StayGo">
                <h1>StayGo!</h1>
            </div>
            <div className='register-container'>
                <h1 className="h1-register">Register</h1>
                <form className="auth-form"
                    onSubmit={handleRegister}>
                    <Input
                        field='name'
                        label='Name'
                        value={formData.name.value}
                        onChangeHandler={handleValueChange}
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.name.showError}
                        validationMessage={nameValidationMessage}
                    />
                    <Input
                        field='surname'
                        label='Surname'
                        value={formData.surname.value}
                        onChangeHandler={handleValueChange}
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.surname.showError}
                        validationMessage={surnameValidationMessage}
                    />
                    <Input
                        field='username'
                        label='Username'
                        value={formData.username.value}
                        onChangeHandler={handleValueChange}
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.username.showError}
                        validationMessage={usernameValidationMessage}
                    />
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
                    <Input
                        field='passwordConfirm'
                        label='Password Confirmation'
                        value={formData.passwordConfirm.value}
                        onChangeHandler={handleValueChange}
                        type='password'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.passwordConfirm.showError}
                        validationMessage={passwordConfirmValidationMessage}
                    />
                    <button disabled={isSubmitButtonDisable}>
                        Register
                    </button>
                </form>
                <span className="cursor" onClick={mandar}>
                    ¿Ya tienes una cuenta? ¡Inicia sesión acá!
                </span>
            </div>
        </div>

    )
}