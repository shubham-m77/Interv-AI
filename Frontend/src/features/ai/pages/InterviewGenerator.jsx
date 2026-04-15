import React, { useRef, useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router"
import { ChevronRight, Loader2 } from "lucide-react";

const InterviewGenerator = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { generateReport, loading, reports } = useInterview()
  const navigate = useNavigate()

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  // Generating report function
  const handleGenerateReport = async () => {
    const resume = selectedFile || fileInputRef.current?.files[0]
    if (!resume) {
      alert("Please select a resume file");
      return;
    }
    const res = await generateReport({  jobDescription,selfDescription, resume })
    if (res) {
      navigate(`/interview-report/${res._id}`)
    }
  }
  if (loading) {
    return (
      <div className="flex h-screen flex-col w-full items-center  gap-2 justify-center">

        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <h2>Loading your Interview Plan...</h2>
      </div>
    )
  }
  return (
    <main className="flex-1  py-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-200">
            Create Your Custom Interview Plan
          </h1>
          <p className="text-muted-foreground md:max-w-2xl mx-auto text-sm md:text-base">
            Leverage AI intelligence to generate a structured interview strategy.
            Provide the job context and candidate profile to get started.
          </p>
        </header>

        {/* Generator Form Container */}
        <div className="bg-card-foreground flex flex-col items-center justify-center min-h-[500px] rounded-2xl px-2 py-4 md:px-4 md:py-6 border shadow-xl">
          <div className="flex flex-col md:flex-row w-full gap-6">
            {/* Left Column: Job Description */}
            <div className="flex flex-col space-y-4 px-4 md:w-1/2 self-stretch min-w-0">
              <div className="flex items-center gap-2 text-foreground">
                <span className="material-symbols-outlined text-blue-600">
                  description
                </span>
                <Label
                  htmlFor="jobDescription"
                  className="font-bold text-lg text-gray-200"
                >
                  Job Description
                </Label>
              </div>

              <div className="flex-1 relative h-full min-w-0">
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  required
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the detailed job description here. Include key responsibilities, required skills, and cultural expectations..."
                  className="w-full min-w-0 rounded-xl p-4 md:p-6 text-sm  bg-accent-foreground h-full outline-none border-none resize-none leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 text-xs text-background/70">
                  Min 200 characters
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col md:w-1/2 justify-start self-stretch px-4 gap-6 min-w-0">
              { /* Resume Upload */}
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="material-symbols-outlined text-blue-600">
                    upload_file
                  </span>
                  <Label
                    htmlFor="resume"
                    className="font-bold text-lg text-gray-200"
                  >
                    Candidate Resume
                  </Label>
                </div>
            
                <Card
                  onClick={() => {fileInputRef.current?.click()}}
                  className="flex-1 border-2 border-dashed border-blue-500/30 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/30 hover:border-blue-500 transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-none"
                >
                  <Input
                    ref={fileInputRef}
                    id="resume"
                    type="file"
                    accept=".pdf,.docx"
                    name="resume"
                    onChange={handleFileChange}
                    hidden
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-green-500 text-2xl">
                        check_circle
                      </span>
                      <p className="text-gray-200 font-semibold text-sm">
                        {selectedFile.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center transition-transform hover:scale-110">
                        <span className="material-symbols-outlined text-blue-600">
                          cloud_upload
                        </span>
                      </div>
                      <p className="text-gray-200 font-semibold">
                        Drag & drop resume here
                      </p>
                      <p className="text-muted-foreground text-sm">
                        PDF/ DOCX up to 5MB
                      </p>
                    </>
                  )}
                </Card>
              </div>

              {/* Self Description */}
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="material-symbols-outlined text-blue-600">
                    person_search
                  </span>
                  <Label
                    htmlFor="selfDescription"
                    className="font-bold text-lg text-gray-200"
                  >
                    Self Description
                  </Label>
                </div>

                <div className="flex-1 relative h-full min-w-0">
                  <Textarea
                    id="selfDescription"
                    name="selfDescription"
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="Add specific notes about the candidate, your impressions, or particular areas you want to probe..."
                    className="w-full min-w-0 rounded-xl text-sm p-4 md:p-6 bg-accent-foreground h-full outline-none border-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-12 flex flex-col items-center gap-6 max-w-full">
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-200/10 rounded-full">
              <span className="material-symbols-outlined text-blue-600 text-sm fill">
                auto_awesome
              </span>
              <span className="text-xs font-semibold text-gray-300">
                AI-powered analysis will be performed on these documents
              </span>
            </div>

            <Button onClick={handleGenerateReport} className="px-6 py-4 bg-primary-dim/90 hover:bg-primary-dim md:px-12 max-w-full md:py-6 cursor-pointer rounded-xl text-sm md:text-lg font-extrabold flex items-center duration-200 gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              Generate Interview Report
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Button>
          </div>
        </div>
        {/* showing past reports */}
        {
          reports.length > 0 && (
            <Card className="bg-accent-foreground p-6">
              <h2 className="text-white font-semibold ">Your Past Interview Reports</h2>
              <hr className="" />
              <div className="flex gap-4 flex-col md:flex-row">
                {
                  reports.slice(0, 4).map((report) => (
                    <Card className="bg-background px-4 gap-4" key={report._id}>
                      <CardTitle className="text-sm">{report.title}</CardTitle>
                      <div className="flex flex-col gap-0.5">
                        <p className="flex text-xs font-semibold text-gray-700 gap-1">
                          Generated At: <span className="">{new Date(report.createdAt).toLocaleDateString()}</span>
                        </p>
                        <p className={`flex text-xs font-semibold gap-1  ${report.matchScore > 70 ? "text-green-800" : "text-red-400"}`}>
                          Match Score: <span className="">{report.matchScore}</span></p>
                      </div>
                      <Button className="text-xs font-medium cursor-pointer bg-primary-dim/80 hover:bg-primary-dim" onClick={() => navigate(`/interview-report/${report._id}`)}>View Report</Button>
                    </Card>
                  ))
                }
              </div>
              <Button className="bg-accent/80 cursor-pointer hover:bg-accent w-auto text-gray-900 gap-2" onClick={() => navigate("/interview-reports")}>View All Reports <ChevronRight /></Button>
            </Card>
          )
        }
      </div>
    </main>
  );
};

export default InterviewGenerator;