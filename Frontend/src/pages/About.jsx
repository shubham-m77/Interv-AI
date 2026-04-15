import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent,CardDescription } from '@/components/ui/card'

const About = () => {
  return (
    <main className="space-y-16 py-12 text-white">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Interview AI report planner
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Build executive interview reports from candidate insights — in minutes.
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-7">
              <span className="font-bold  text-primary">interv.ai</span> transforms resume details, self-descriptions and job context into polished, recruiter-ready interview reports that highlight fit, gaps and opportunity.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center ">
            <Link to="/login">
              <Button className="bg-gradient-to-r cursor-pointer from-primary to-primary-dim text-on-primary px-6 py-3 font-semibold">
                Get started
              </Button>
            </Link>
            <a href="#how-it-works" >
             <Button className="inline-flex bg-inherit cursor-pointer hover:bg-inherit items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-primary/50 hover:text-white transition"> How it works</Button>
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#141519] p-6 ring-1 ring-white/5">
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Designed for modern hiring teams</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Interview-ready reports, not just summaries.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Every report is generated with structural clarity so recruiters and candidates see strengths, weaknesses and next steps at a glance.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-[#101116] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Input</p>
                <p className="mt-3 text-lg font-semibold text-white">Candidate profile + role details</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#101116] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Output</p>
                <p className="mt-3 text-lg font-semibold text-white">A high-end interview report with modern structure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="rounded-[2rem] border-white/10 bg-[#11131b]">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl font-semibold text-white">Why this matters</CardTitle>
            <CardDescription>
              Most interview prep tools are generic and unfocused. interv.ai replaces guesswork with an evidence-based report that aligns candidate strengths to hiring outcomes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <div className="rounded-3xl border border-white/10 bg-[#101116] p-5">
              <p className="font-semibold text-white">Reduce bias in prep</p>
              <p className="text-sm leading-6 text-slate-400">Standardized reports help teams evaluate interviews consistently across skills, experience and cultural fit.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#101116] p-5">
              <p className="font-semibold text-white">Save time for hiring teams</p>
              <p className="text-sm leading-6 text-slate-400">Auto-generated reports eliminate manual note-taking and accelerate decision-making.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#101116] p-5">
              <p className="font-semibold text-white">Improve candidate confidence</p>
              <p className="text-sm leading-6 text-slate-400">Candidates receive clear feedback and talking points tailored to the role.</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#101116] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Problem</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Scattershot interview prep</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Candidates and recruiters often rely on broad advice instead of precise insights. That leads to unfocused interviews, missed opportunities, and wasted effort.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#101116] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Solution</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">A structured AI plan for every interview</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              interv.ai synthesizes applicant input into a concise report that clarifies fit, identifies risk areas, and recommends the strongest narrative for interview success.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-primary/80">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Three steps to a high-end interview report</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-[2rem] border-white/10 bg-[#11131b] p-6">
            <CardHeader>
              <CardTitle className="text-xl text-white">1. Candidate capture</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 leading-6">
              Gather role details, self-description and resume highlights in a single flow.
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-white/10 bg-[#11131b] p-6">
            <CardHeader>
              <CardTitle className="text-xl text-white">2. AI analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 leading-6">
              The engine maps candidate experience against the target role and creates a polished evaluation outline.
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-white/10 bg-[#11131b] p-6">
            <CardHeader>
              <CardTitle className="text-xl text-white">3. Report delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 leading-6">
              Receive a ready-to-share report with strengths, opportunities and next-step recommendations.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-primary/5 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-primary/80">Ready to make every interview count?</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Turn candidate details into a premium interview narrative.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          interv.ai is built for talented professionals and hiring teams who want a fast, reliable path from raw input to smart, structured reporting.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <Button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 font-semibold">
              Start with your first report
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="px-8 py-3 text-white bg-inherit hover:bg-primary/10 hover:text-white border-white/15 hover:border-primary/50">
              Create account
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About