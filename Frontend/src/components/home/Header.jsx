import React from 'react'
import { Dot } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"
const Header = () => {
    return (
        <section className='flex items-center justify-center flex-col my-12 md:my-14'>
            <div className='flex items-center  text-[10px] font-label bg-primary/10 px-2 rounded-full  font-bold text-primary uppercase tracking-[0.2em]'><Dot /> <p>NEXT-GEN CAREER INTELLIGENCE</p></div>

            <div className='max-w-full md:max-w-5xl my-4 text-center'>
                <h1 className='font-extrabold text-4xl md:text-7xl tracking-tight leading-tighter'>Generate high-end interview reports with <span className='bg-gradient-to-r from-[#90abff] to-[#316bf3] bg-clip-text text-transparent'>interv.ai</span></h1>
                <p className='text-sm md:text-lg font-medium text-muted-foreground mt-7 md:px-14 leading-6'>Turn resume details and self-descriptions into polished AI-powered reports that highlight fit, gaps, and interview-ready narrative.</p>
                <div className='flex flex-col md:flex-row gap-4 items-center justify-center my-12'>
                <Link to="/interview-report" className=''><Button className='rounded-xl text-sm font-semibold hover:scale-97 duration-150 py-6 px-8 cursor-pointer bg-gradient-to-r from-[#90abff] to-[#316bf3] hover:brightness-110'>Get Started for Free</Button></Link>
                <Link to="/learn-more" className=''><Button className='rounded-xl   text-sm font-semibold py-6 hover:scale-97 duration-150 px-8 cursor-pointer bg-inherit border-2 border-primary hover:brightness-110'>Learn More</Button></Link>
                </div>
            </div>
        </section>
    )
}
                                                                                                                                    
export default Header