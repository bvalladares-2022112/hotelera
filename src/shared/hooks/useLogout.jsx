export const useLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/stayGo/login'    
}