/*----------------------- VALIDACIÓN DE NOMBRE Y APELLIDO ------------------- */
export const validateName = (name) => {
    const regex = /[\s\S]/
    return regex.test(name)
}

export const validateSurname = (surname) => {
    const regex = /[\s\S]/
    return regex.test(surname)
}

/*-------------------------VALIDACIÓN DE CORREO------------------------------ */
export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}
/*------------------------VALIDACIÓN DE CORREO------------------------------- */

/*----------------------VALIDACIÓN DE NOMBRE DE USUARIO---------------------- */
export const validateUsername = (username) => {
    const regex = /^\S{3,20}$/
    return regex.test(username)
}
/*----------------------VALIDACIÓN DE NOMBRE DE USUARIO---------------------- */

/*------------------------VALIDACIÓN DE CONTRASEÑA--------------------------- */
export const validatePassword = (password) => {
    const regex = /^\S{6,20}$/
    return regex.test(password)
}
/*------------------------VALIDACIÓN DE CONTRASEÑA--------------------------- */

/*----------------VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA------------------- */
export const validatePasswordConfirm = (password, passwordConfirm) => {
    return password == passwordConfirm
}
/*----------------VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA------------------- */

/*---------------------------VALIDACION DE CLIENTE-------------------------- */
export const validateClient = (password) => {

}

/*---------------------------VALIDACION DE CLIENTE-------------------------- */



/*---------------------------VALIDACION DE ResDate-------------------------- */

export const validateResDate = (password) => {
    
}
/*---------------------------VALIDACION DE ResDate-------------------------- */




/*---------------------------VALIDACION DE InDate-------------------------- */
export const validateInDate = (password) => {
    
}

/*---------------------------VALIDACION DE InDate-------------------------- */





/*---------------------------VALIDACION DE OutDate-------------------------- */
export const validateOutDate = (password) => {
    
}

/*---------------------------VALIDACION DE OutDate-------------------------- */





/*---------------------------VALIDACION DE Room-------------------------- */
export const validateRoom = (password) => {
    
}

export const nameValidationMessage = 'Por favor, ingrese un nombre válido, no se permiten números ni carácteres especiales. @ # $ % &'
export const surnameValidationMessage = 'Por favor, ingrese un apellido/s válido, no se permiten números ni carácteres especiales. @ # $ % &'
export const emailValidationMessage = 'Por favor, ingresa un correo válido.'
export const usernameValidationMessage = 'El nombre de usuario debe de contener entre 3 y 20 carácteres, no se permite espacio ni carácteres especiales. @ # $ % &'
export const passwordValidationMessage = 'La contraseña debe de contener entre 6 y 20 carácteres, no se permite espacio.'
export const passwordConfirmValidationMessage = 'Las contraseñas no coinciden.'