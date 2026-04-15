import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/ai/interview.context.jsx"
import { SnackbarProvider } from 'notistack'
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
          <Footer />
        </InterviewProvider>
      </SnackbarProvider>
    </AuthProvider>
  )
}

export default App
