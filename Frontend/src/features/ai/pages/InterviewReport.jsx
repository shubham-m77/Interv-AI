import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInterview } from "../hooks/useInterview"
import { useParams } from "react-router"
import { Loader2,Sparkles } from "lucide-react";
// ─── Nav Items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "technical", label: "Technical Questions", icon: "code" },
  { key: "behavioral", label: "Behavioral Questions", icon: "psychology" },
  { key: "roadmap", label: "Readmap", icon: "map" },
];

const severityStyles = {
  high: "bg-red-500/15 text-red-400 border border-red-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  low: "bg-green-500/15 text-green-400 border border-green-500/30",
};

// ─── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ question, answer, intention, index, type }) => {

  const [open, setOpen] = useState(false);
  const isTech = type === "technical";
  const accentColor = isTech ? "text-blue-400" : "text-purple-400";
  const borderColor = isTech ? "border-blue-500/20" : "border-purple-500/20";
  const hoverBorder = isTech ? "hover:border-blue-500/40" : "hover:border-purple-500/40";
  const badgeBg = isTech ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400";



  return (
    <Card
      className={`bg-card-foreground border ${borderColor} ${hoverBorder} rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-none`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-start gap-3">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeBg} shrink-0 mt-0.5`}>
          Q{index + 1}
        </span>
        <p className="text-gray-200 font-semibold text-sm leading-relaxed flex-1">{question}</p>
        <span
          className={`material-symbols-outlined text-sm shrink-0 mt-0.5 transition-transform duration-200 ${accentColor} ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-muted-foreground mt-0.5 shrink-0">lightbulb</span>
            <p className="text-xs text-muted-foreground leading-relaxed italic">{intention}</p>
          </div>
          <div className="flex items-start gap-2">
            <span className={`material-symbols-outlined text-sm mt-0.5 shrink-0 ${accentColor}`}>chat_bubble</span>
            <p className="text-sm text-gray-300 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

// ─── Roadmap Day ───────────────────────────────────────────────────────────────
const RoadmapDay = ({ day, focus, tasks, isLast }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-blue-400">{day}</span>
      </div>
      {!isLast && <div className="w-px flex-1 bg-blue-500/15 mt-1" />}
    </div>
    <div className="pb-6 flex-1">
      <p className="text-gray-200 font-bold text-sm mb-2">{focus}</p>
      <ul className="space-y-1.5">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
            <span className="material-symbols-outlined text-blue-500 text-xs mt-0.5 shrink-0">check_circle</span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ─── Score Ring ────────────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#3b82f6" : "#f97316";

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg width="72" height="72" className="-rotate-90">
          <circle cx="36" cy="36" r={radius} fill="none" stroke="#ffffff10" strokeWidth="5" />
          <circle
            cx="36" cy="36" r={radius} fill="none"
            stroke={color} strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xl font-extrabold text-gray-200">{score}%</span>
      </div>
      <span className="text-xs text-muted-foreground mt-1">Match Score</span>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const InterviewReport = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report, getReportById,loading,generateResume } = useInterview();
  const { id: interviewId } = useParams()


  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])
  
  
  if (loading || !report) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const questions =
    activeTab === "technical"
      ? report.technicalQuestions
      : activeTab === "behavioral"
        ? report.behavioralQuestions
        : [];

  return (
    <main className="flex-1 pt-4 md:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 3-Column Layout */}
        <div className="bg-card-foreground rounded-2xl border shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[75vh]">

          {/* ── Left Sidebar ── */}
          <aside className="w-full md:w-52 shrink-0 border-b border-white/5 md:border-b-0 md:border-r md:border-white/5 flex flex-col p-4 gap-2">
            {/* Score ring */}
            <div className="flex flex-col items-center py-5 mb-2 border-b border-white/5">
              <ScoreRing score={report.matchScore} />
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_ITEMS.map((item) => {
                const active = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left w-full cursor-pointer
                      ${active
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-muted-foreground hover:text-gray-200 hover:bg-white/5 border border-transparent"
                      }`}
                  >
                    <span className={`material-symbols-outlined text-base ${active ? "text-blue-400" : ""}`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Download Resume  */}
              <Button className="gap-2 font-medium cursor-pointer bg-primary-dim/80 hover:bg-primary-dim" onClick={()=>generateResume(interviewId)}>Download Resume <Sparkles/></Button>
            {/* Bottom badge */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 px-2">
                <span className="material-symbols-outlined text-blue-500 text-sm">auto_awesome</span>
                <span className="text-xs text-muted-foreground leading-snug">AI-generated report</span>
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <section className="flex-1 overflow-y-auto px-4 py-6 md:p-6">
            {(activeTab === "technical" || activeTab === "behavioral") && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <span className={`material-symbols-outlined ${activeTab === "technical" ? "text-blue-500" : "text-purple-500"}`}>
                    {activeTab === "technical" ? "code" : "psychology"}
                  </span>
                  <h2 className="text-xl font-bold text-gray-200">
                    {activeTab === "technical" ? "Technical Questions" : "Behavioral Questions"}
                  </h2>
                  <span className="ml-auto text-xs text-muted-foreground bg-white/5 w-auto h-auto gap-1 px-4 py-1 rounded-full">
                    {questions.length} questions
                  </span>
                </div>
                {questions.map((q, i) => (
                  <QuestionCard
                    key={q._id.$oid}
                    index={i}
                    type={activeTab}
                    question={q.question}
                    answer={q.answer}
                    intention={q.intention}
                  />
                ))}
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-blue-500">map</span>
                  <h2 className="text-xl font-bold text-gray-200">7-Day Preparation Roadmap</h2>
                  <span className="ml-auto text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                    {report.preparationPlan.length} days
                  </span>
                </div>
                <Card className="bg-card-foreground border border-white/5 rounded-xl p-6 shadow-none">
                  {report.preparationPlan.map((item, i) => (
                    <RoadmapDay
                      key={item._id.$oid}
                      day={item.day}
                      focus={item.focus}
                      tasks={item.tasks}
                      isLast={i === report.preparationPlan.length - 1}
                    />
                  ))}
                </Card>
              </div>
            )}
          </section>

          {/* ── Right Sidebar: Skill Gaps ── */}
          <aside className="w-full md:w-56 shrink-0 border-t border-white/5 md:border-t-0 md:border-l md:border-white/5 p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400 text-base">warning</span>
              <h3 className="font-bold text-gray-200 text-sm">Skill Gaps</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {report.skillGaps.map((gap) => (
                <div
                  key={gap._id.$oid}
                  className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/3 border border-white/5"
                >
                  <span className="text-xs font-semibold text-gray-200 leading-snug">{gap.skill}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit capitalize ${severityStyles[gap.severity]}`}>
                    {gap.severity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Focus on high severity gaps first to maximize your match score.
              </p>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-blue-500 text-sm">trending_up</span>
                <span className="text-xs font-semibold text-blue-400">Improve your score</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default InterviewReport;