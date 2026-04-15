import apiClient from '../../../lib/apiClient'

// register connection of frontend to backend for authentication
export const register = async ({email,username,password}) => {
    try {
        const response = await apiClient.post('/api/auth/register', {
            email,
            username,
            password
        })
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token)
        }
        return response.data
    } catch (error) {
        console.log("register error:", error)
        return null
    }
}

// login: connection of frontend to backend for authentication
export const login = async ({email,password}) => {
    try {
        const response = await apiClient.post('/api/auth/login', {
            email,
            password
        })
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token)
        }
        return response.data
    } catch (error) {
        console.log("login error:", error)
        return null
    }
}

// Logout: connection of frontend to backend for authentication
export const logout = async () => {
    try {
        const response = await apiClient.get('/api/auth/logout')
        // Remove token from localStorage
        localStorage.removeItem('authToken')
        return response.data
    } catch (error) {
        console.log("logout error:", error)
        localStorage.removeItem('authToken')
        return null
    }
}

// GetUser: connection of frontend to backend for authentication
export const getUser = async () => {
    try {
        const response = await apiClient.get('/api/auth/get-user')
        return response.data
    } catch (error) {
        console.log("getUser error:", error)
        return null
    }
}