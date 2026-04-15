import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Code, Database, Palette, Shield, Cloud, Lightbulb, Search, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'

const AllInterviewReports = () => {
  const [filteredReports, setFilteredReports] = useState([])
  const {reports,loading,user} = useInterview()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const itemsPerPage = 6

  // Mock data - replace with actual API call
  useEffect(() => {
    setFilteredReports(reports)
  }, [reports])

  // Filter and sort reports
  useEffect(() => {
    let filtered = reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesScore = scoreFilter === 'all' ||
        (scoreFilter === 'high' && report.matchScore >= 80) ||
        (scoreFilter === 'medium' && report.matchScore >= 50 && report.matchScore < 80) ||
        (scoreFilter === 'low' && report.matchScore < 50)

      return matchesSearch && matchesScore
    })

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    setFilteredReports(filtered)
    setCurrentPage(1)
  }, [searchTerm, sortBy, scoreFilter, reports])

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedReports = filteredReports.slice(startIdx, startIdx + itemsPerPage)

  const ScoreRing = ({ score }) => {
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference
    const color = score >= 80 ? '#22c55e' : score >= 50 ? '#3b82f6' : '#ef4444'

    return (
      <div className="relative flex items-center justify-center w-16 h-16">
        <svg width="64" height="64" className="-rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xs font-bold text-gray-200">{score}%</span>
      </div>
    )
  }

  const IconMap = {
    code: <Code className="w-5 h-5" />,
    database: <Database className="w-5 h-5" />,
    palette: <Palette className="w-5 h-5" />,
    shield: <Shield className="w-5 h-5" />,
    cloud: <Cloud className="w-5 h-5" />,
    lightbulb: <Lightbulb className="w-5 h-5" />,
  }

  const getStatusStyle = (status) => {
    const styles = {
      'PRO REPORT': 'bg-blue-500/10 text-blue-400',
      'RE-RUN': 'bg-purple-500/10 text-purple-400',
      'FAVORITE': 'bg-pink-500/10 text-pink-400',
      'LOW MATCH': 'bg-red-500/10 text-red-400',
      'REVIEWED': 'bg-green-500/10 text-green-400',
      'DEEP DIVE': 'bg-yellow-500/10 text-yellow-400',
    }
    return styles[status] || 'bg-gray-500/10 text-gray-400'
  }

  return (
    <main className="flex-1 py-4 md:py-8 min-h-screen">
      <div className="md:max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-manrope text-4xl font-extrabold tracking-tight text-white mb-3">
                Interview Report History
              </h1>
              <p className="text-gray-400 max-w-2xl leading-relaxed text-sm md:text-base">
                Access and manage your interview reports archive. Review past interview reports, analysis summaries, and candidate performance scores.
              </p>
            </div>
            {/* <Button className="gap-2 font-medium cursor-pointer shrink-0">
              <Download className="w-4 h-4" />
              Export All
            </Button> */}
          </div>
        </header>

        {/* Search and Filter Bar */}
        <section className="bg-card-foreground rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center border border-white/5">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-dim border border-white/10 text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-primary/40 transition-colors placeholder-gray-500 text-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 lg:flex-none bg-surface-dim border border-white/10 text-gray-300 px-4 py-3 rounded-lg outline-none text-sm cursor-pointer hover:border-white/20 transition-colors"
            >
              <option value="newest">Date: Newest First</option>
              <option value="oldest">Date: Oldest First</option>
            </select>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="flex-1 lg:flex-none bg-surface-dim border border-white/10 text-gray-300 px-4 py-3 rounded-lg outline-none text-sm cursor-pointer hover:border-white/20 transition-colors"
            >
              <option value="all">Score: All</option>
              <option value="high">Score: High (80+)</option>
              <option value="medium">Score: Medium (50-79)</option>
              <option value="low">Score: Low (0-49)</option>
            </select>
          </div>
        </section>

        {/* Reports Grid */}
        {paginatedReports.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedReports.map((report) => (
              <Card
                key={report._id}
                className="bg-card-foreground border border-white/5 rounded-xl px-6 hover:bg-white/5 hover:border-white/10 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                onClick={() => navigate(`/interview-report/${report._id}`)}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <ScoreRing score={report.matchScore} />
                  </div>

                  <h3 className="font-manrope text-lg font-bold text-white mb-1">
                    {report.title}
                  </h3>

                    <p className="flex items-center gap-2 text-gray-500 font-medium uppercase tracking-wider ">
                      📅 <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    </p>
                </div>

                <Button className="w-full gap-2 bg-primary-dim/80 hover:bg-primary-dim cursor-pointer font-medium group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                  View Report
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No reports found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-dim hover:bg-white/5 transition-colors text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors border ${
                    currentPage === pageNum
                      ? 'bg-primary text-white border-primary/40'
                      : 'bg-surface-dim hover:bg-white/5 text-gray-400 border-white/10'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            {totalPages > 5 && (
              <>
                <span className="mx-2 text-gray-500">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-dim hover:bg-white/5 text-gray-400 border border-white/10 font-bold text-sm"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-dim hover:bg-white/5 transition-colors text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default AllInterviewReports