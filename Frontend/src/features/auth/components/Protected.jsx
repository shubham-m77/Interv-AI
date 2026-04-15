import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

 const Protected = ({children}) => {
    const {user,loading} = useAuth()
    if(loading){
        return <div className="  flex items-center justify-center">
            <h1>Loading...</h1>
        </div>
    }
    if(!user){
     return <Navigate to="/login" />
    }
    return children

 }

 export default Protected