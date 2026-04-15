import React from 'react'

const FeatureBento = () => {
  return (
    <section className="max-w-full md:max-w-7xl mx-auto md:px-6 mb-40">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white mb-6">
          Designed for Structural Success
        </h2>
        <p className="text-gray-400 txt-sm md:text-lg">
          Beyond standard feedback. Deep cognitive analysis of your professional profile.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8 group relative rounded-xl p-10 bg-card-foreground/50 border-2 border-primary/10 hover:bg-card-foreground hover:backdrop-blur transition-all duration-300 overflow-hidden">
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl luminous-button flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-on-primary">architecture</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-white mb-4">Architectural Precision</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Our AI doesn't just read resumes; it maps your entire professional trajectory against industry benchmarks to find the perfect narrative for your interview.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity ">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1",fontSize:"200px" }}>
              grid_view
            </span>
          </div>
        </div>

        <div className="md:col-span-4 rounded-xl p-8 bg-card-foreground border border-primary/10 hover:bg-card-foreground/50 hover:backdrop-blur transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary">psychology</span>
          </div>
          <h3 className="text-xl font-headline font-bold text-white mb-3">Cognitive Mapping</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Visualize your skill hierarchy. Identify exactly where your expertise overlaps with high-priority job requirements.
          </p>
        </div>

        <div className="md:col-span-4 rounded-xl p-8 bg-card-foreground/50 border border-primary/10 hover:bg-card-foreground hover:backdrop-blur transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-tertiary">route</span>
          </div>
          <h3 className="text-xl font-headline font-bold text-white mb-3">Intelligent Roadmaps</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A step-by-step tactical guide to closing gaps. Dynamic learning paths updated based on interview performance.
          </p>
        </div>

        <div className="md:col-span-8 relative rounded-xl h-64 overflow-hidden border-2 border-primary/10">
          <img
            alt="AI Intelligence"
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUvke1PdDEEcfEfATyhju3-9FI9rhdLwOzbo0vX82_K79-E-G_E5JJVBIwKrbeAUkRv8zdYZuvIucRqoPu6Xqv4fAG_3gnpgd7RTLdXoo23V2L0mg3yeQq4jv1NAVAs3_Z94WBDSINhWHfPqa4OiQNM66tLVVySjyNc7ANNAVM_rux2ofH7EwuJJhYVY7mKtvH2FSi3WrnCohbofmGOXKq_-_tjSWvv-Ut8TOu5iOgbIhb-NQsPs08BQrxbQHysn56-a0iQTIlBZga"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-800 to-transparent"></div>
          <div className="absolute bottom-6 left-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-xs font-bold text-primary uppercase">
                New Interface
              </span>
              <span className="text-white font-bold">Real-time gap analysis enabled.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureBento
