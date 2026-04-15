import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { handleRegister, loading,user } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister({ username, email, password })
  }

 if (loading) {
     return (
       <div className="flex h-screen w-full items-center justify-center">
         <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
       </div>
     )
   }

     useEffect(()=>{
       if(user){
       navigate("/");
     }
     },[user])
  return (
   <main className="flex my-20 md:my-24 w-full items-center justify-center ">
         <Card className="w-full max-w-sm shadow-lg">
           <CardHeader className="space-y-1 pb-2">
             <CardTitle className="text-2xl font-semibold tracking-tight">
               Welcome to Interv.AI
             </CardTitle>
             <CardDescription className="text-sm text-muted-foreground">
               Enter your credentials to sign up
             </CardDescription>
           </CardHeader>
    
           <CardContent>
             <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                 <Label htmlFor="username">Username</Label>
                 <Input
                   id="username"
                   type="text"
                   placeholder="Enter your username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required
                 />
               </div>

               <div className="space-y-1.5">
                 <Label htmlFor="email">Email</Label>
                 <Input
                   id="email"
                   type="email"
                   placeholder="you@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   autoComplete="email"
                 />
               </div>
    
               <div className="space-y-1.5">
                 <div className="flex items-center justify-between">
                   <Label htmlFor="password">Password</Label>
                 </div>
                 <Input
                   id="password"
                   type="password"
                   placeholder="••••••••"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   autoComplete="current-password"
                 />
               </div>
    
               <Button type="submit" className="w-full bg-primary-dim/80 hover:bg-primary-dim hover:scale-97" disabled={loading}>
                 {loading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Signing up...
                   </>
                 ) : (
                   'Sign up'
                 )}
               </Button>
             </form>
           </CardContent>
    
           <CardFooter className="justify-center pb-6">
             <p className="text-sm md:text-xs text-muted-foreground">
               Already have an account?{' '}
               <Link
                 to="/login"
                 className="font-medium text-foreground underline-offset-4 hover:underline"
               >
                 Sign in
               </Link>
             </p>
           </CardFooter>
         </Card>
       </main>
  )
}

export default Register