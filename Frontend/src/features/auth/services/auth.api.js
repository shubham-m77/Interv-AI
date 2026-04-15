import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// register connection of frontend to backend for authentication
export const register = async ({email,username,password}) => {
    try {
        const response = await api.post('/api/auth/register', {
            email,
            username,
            password
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// login: connection of frontend to backend for authentication
export const login = async ({email,password}) => {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Logout: connection of frontend to backend for authentication
export const logout = async () => {
    try {
        const response = await api.get('/api/auth/logout')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GetUser: connection of frontend to backend for authentication
export const getUser = async () => {
    try {
        const response = await api.get('/api/auth/get-user')
        return response.data
    } catch (error) {
        console.log(error)
    }
}