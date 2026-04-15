import React from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/button'

const HomeCta = () => {
  return (
    <section className="mx-auto mb-40">
      <div className="rounded-3xl p-12 lg:p-20 relative overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary-dim to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
          <h2 className="text-4xl lg:text-6xl font-headline font-extrabold text-white">
            Ready to Build Your Future?
          </h2>
          <p className="text-base md:text-lg text-gray-300">
            Join over 10,000 candidates who have leveled up their interview game with Architectural Mind AI.
          </p>
          <Link to="/interview-report">
            <Button className="hover:bg-primary shadow-accent-foreground bg-inherit border-primary border-2 px-10 py-5 rounded-xl font-headline font-semibold text-lg text-card shadow-2xl hover:scale-97 transition-transform duration-150">
              Build My Precision Report Now
            </Button>
          </Link>
          <p className="text-sm font-label text-gray-400">
            No credit card required. First report is on us.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HomeCta
