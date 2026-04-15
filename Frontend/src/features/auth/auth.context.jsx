import { createContext, useEffect, useState } from "react";
import { getUser } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                // Check if token exists in localStorage
                const token = localStorage.getItem('authToken')
                if (token) {
                    const data = await getUser()
                    if (data?.user) {
                        setUser(data.user)
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error)
                localStorage.removeItem('authToken')
            }
            finally {
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}