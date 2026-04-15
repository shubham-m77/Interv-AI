import React from 'react'

const Footer = () => {
    return (
        <footer class="w-full px-4 md:px-12 lg:px-32 py-12 border-t border-white/10 bg-card-foreground">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div class="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 group">
                        <a href="/"><h2 className="font-manrope font-bold text-lg tracking-tighter text-white">Interv<span className='font-black bg-gradient-to-r from-primary to-primary-dim group-hover:from-primary-dim transition-colors duration-150 ease-linear group-hover:to-primary bg-clip-text text-transparent'>.AI</span></h2></a> 
                        </div>
                    <p class="font-['Inter'] text-xs text-gray-500 max-w-[280px] text-center md:text-left">
                        © 2026 InterviewAI. Precision in every insight.
                    </p>
                </div>
                                    <hr className='border-0.5 md:hidden w-full border-primary/20'/>
                <div class="flex flex-wrap justify-center gap-6 md:gap-8">
                    <a class="font-['Inter'] text-xs text-gray-500 hover:text-[#90abff] transition-colors" href="#">Privacy Policy</a>
                    <a class="font-['Inter'] text-xs text-gray-500 hover:text-[#90abff] transition-colors" href="#">Terms of Service</a>
                    <a class="font-['Inter'] text-xs text-gray-500 hover:text-[#90abff] transition-colors" href="#">Security</a>
                    <a class="font-['Inter'] text-xs text-gray-500 hover:text-[#90abff] transition-colors" href="#">Contact Support</a>
                </div>

            </div>
        </footer>
    )
}

export default Footer