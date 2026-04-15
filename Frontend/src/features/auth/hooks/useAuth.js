import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, logout, register } from "../services/auth.api"
import { useNavigate } from "react-router"
import { enqueueSnackbar } from "notistack"
export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()

    // Login Functionality
    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            // Calling the login API and update the user state
            const data = await login({ email, password })
            setUser(data.user)
            navigate('/')
            enqueueSnackbar("You're Logged-In", { 
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });

        } catch (error) {
            console.error("Login failed:", error)
            enqueueSnackbar("Login failed. Please try again.", { 
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });
        }
        finally {
            setLoading(false)
        }
    }

    // Register Functionality
    const handleRegister = async ({ email, password }) => {
        setLoading(true)
        try {
            // Calling the register API and update the user state
            const data = await register({ email, username, password })
            setUser(data.user)
            navigate('/')
            enqueueSnackbar("Registration Successful! You're Logged-In", { 
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })

        } catch (error) {
            console.error("Register failed:", error)
            enqueueSnackbar("Registration failed. Please try again.", { 
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });

        }
        finally {
            setLoading(false)
        }
    }

    // Logout Functionality
    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            navigate('/')
            enqueueSnackbar("You're Logged-Out!", {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })

        } catch (error) {
            console.error("Logout failed:", error)
            enqueueSnackbar("Logout failed. Please try again.", { 
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });

        }
        finally {
            setLoading(false)

        }
    }

    return { user, loading, handleLogin, handleRegister, handleLogout }
}