import React, {  useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import { Button } from './ui/button'
import { LogIn, LogOut, Menu, X } from 'lucide-react'
const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    const pathname = location.pathname

    const handleMenuToggle = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false)
        } else {
            setIsMenuOpen(true)
        }
    }

    return (
        <header className=" top-0 w-full rounded-2xl my-6 z-50 bg-[#363636]/70 backdrop-blur flex justify-between items-center px-8 h-16 shadow-[0_24px_24px_-4px_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 group">
               <a href="/"><h2 className="font-manrope font-bold text-xl tracking-tighter text-white">interv<span className='font-black bg-gradient-to-r from-primary to-primary-dim group-hover:from-primary-dim transition-colors duration-150 ease-linear group-hover:to-primary bg-clip-text text-transparent'>.ai</span></h2></a> </div>
            {/* PC Menu */}
            <nav className="hidden md:flex items-center gap-12 h-full justify-center">
                <a className={`font-manrope tracking-tight nav-link font-medium text-sm text-gray-300 hover:text-white h-full flex items-center border-b-primary ${pathname === '/interview-report' ? 'border-b-2' : ''}`} href="/interview-report">
                    Report Generator
                </a>

                <a className={`font-manrope tracking-tight nav-link font-medium text-sm text-gray-300 hover:text-white h-full flex items-center border-b-primary ${pathname === '/learn-more' ? 'border-b-2' : ''}`} href="/learn-more">
                    About Us
                </a>
                {user && (
                    <>
                        <a className={`font-manrope tracking-tight nav-link font-medium text-sm text-gray-300 hover:text-white  transition duration-200 border-b-primary ease-linear h-full flex items-center active:scale-95 ${pathname === '/interview-reports' ? 'border-b-2' : ''}`} href="/interview-reports">
                            Your Reports
                        </a>
                    </>)}

            </nav>
            {/* Mobile menu */}

            <nav className={`flex flex-col md:hidden items-center duration-300 ease-in-out transition-all  h-auto justify-center absolute right-2 bg-card-foreground rounded-lg px-4 py-6 gap-4  text-xs top-16 ${isMenuOpen ? 'block' : 'hidden'}`}>
                {user && (
                    <><a className={`font-manrope tracking-tight nav-link border-b-primary font-medium text-sm text-white h-full flex items-center ${pathname === '/interview-report' ? 'border-b-2' : ''}`} href="/interview-report">
                        Report Generator
                    </a>
                        <a className={`font-manrope tracking-tight nav-link border-b-primary font-medium text-sm text-white h-full flex items-center  ${pathname === '/interview-reports' ? 'border-b-2' : ''}`} href="/interview-reports">
                            Your Reports
                        </a>
                        <a className={`font-manrope tracking-tight nav-link border-b-primary font-medium text-sm text-white h-full flex items-center  ${pathname === '/learn-more' ? 'border-b-2' : ''}`} href="/learn-more">
                            About Us
                        </a>

                        <Button onClick={handleLogout} className="md:hidden font-manrope text-xs md:px-4 gap-2 md:py-2 border-2 cursor-pointer border-red-400 bg-inherit hover:bg-red-400/20 rounded-xl font-semibold md:text-sm text-gray-400 hover:text-white transition duration-200 ease-linear active:scale-95">
                            Logout <LogOut />
                        </Button>
                    </>)}

            </nav>
            <div className="flex items-center gap-5">
                {/* <button className="relative text-gray-400 hover:text-white transition-colors active:scale-95">
          <span className="material-symbols-outlined text-[22px]" data-icon="notifications">
            notifications
          </span>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-[#0e0e10]"></span>
        </button> */}

                <div className="flex items-center gap-3 group cursor-pointer transition-all duration-200">
                    {user ? (<>
                        <Button onClick={handleLogout} className="hidden md:flex font-manrope text-xs md:px-4 gap-2 md:py-2 border-2 cursor-pointer border-red-400 bg-inherit hover:bg-red-400/20 rounded-xl font-semibold md:text-sm text-gray-400 hover:text-white transition duration-200 ease-linear active:scale-95">
                            Logout <LogOut />
                        </Button>
                        <div className={`md:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-180' : ''}`} onClick={handleMenuToggle}>{isMenuOpen ? <X className='stroke-primary/70' /> : <Menu className='stroke-primary/70' />}</div>
                    </>
                    ) : (
                        <a href={"/login"} className=''> <Button className="font-manrope text-xs md:px-4 gap-2 md:py-2 border-2 cursor-pointer border-primary-dim bg-inherit rounded-xl font-semibold md:text-sm text-gray-400 hover:text-white transition duration-200 ease-linear active:scale-95">
                            Login <LogIn />
                        </Button>
                        </a>
                    )}


                </div>
            </div>
        </header>
    )
}

export default Navbar


