import { createBrowserRouter, Outlet } from 'react-router'
import Navbar from './components/Navbar.jsx'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import InterviewGenerator from './features/ai/pages/InterviewGenerator'
import InterviewReport from './features/ai/pages/InterviewReport'
import Home from './pages/Home'
import AllInterviewReports from './features/ai/pages/AllInterviewReports.jsx'

const AppLayout = () => (
    <div className="px-4 md:px-12 lg:px-32 relative w-full min-h-screen">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,240,0.05)_1px,transparent_1px)] bg-[length:36px_36px]" />
        <Navbar />
        <Outlet />
    </div>
)

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'interview-report', element: <Protected><InterviewGenerator /></Protected> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'interview-report/:id', element: <Protected><InterviewReport /></Protected> },
            { path: 'interview-reports', element: <Protected><AllInterviewReports /></Protected> },

        ],
    },
])