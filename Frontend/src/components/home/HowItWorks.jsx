import React from 'react'

const steps = [
  {
    title: 'Upload Resume, Self Desc & Job Desc',
    text: 'Simply drag and drop your current profile and the target job description. Our system parses the context immediately.'
  },
  {
    title: 'AI Analyzes Your Profile',
    text: 'The engine identifies high-impact keywords, cultural fit markers, and potential red flags using multi-dimensional cross-referencing.',
    note: 'Cognitive mapping in progress...',
    icon: 'auto_awesome'
  },
  {
    title: 'Receive Your Precision Report',
    text: 'Get a full architectural breakdown of how to win the role, including tailored STAR method responses and technical deep-dives.'
  }
]

const HowItWorks = () => {
  return (
    <section className="md:max-w-4xl mx-auto md:px-6 mb-40">
      <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white text-center mb-20">
        The Blueprint to Get Hired
      </h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800" />
        <div className="space-y-24 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-12 group">
              <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-gray-800 border-4 border-foreground/10 flex items-center justify-center font-headline font-bold text-primary">
                {index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-headline font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-lg">{step.text}</p>
                {step.note ? (
                  <div className="mt-6 p-4 rounded-xl bg-sidebar-primary/20 border border-secondary/10 inline-flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {step.icon}
                    </span>
                    <span className="text-sm font-medium text-primary-dim">{step.note}</span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
