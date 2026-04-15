import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, getInterviewReport, getAllInterviewReports, generateResumePDF } from "../services/auth.interview"
import { useParams } from "react-router"
import { enqueueSnackbar } from "notistack"

export const useInterview = () => {
    const { report, setReport, reports, setReports, loading, setLoading } = useContext(InterviewContext);
    const { id: interviewId } = useParams();

    const generateReport = async ({ jobDescription, selfDescription, resume }) => {
        setLoading(true)
        let res = null;
        try {
            res = await generateInterviewReport({ jobDescription, selfDescription, resume })
            setReport(res.interviewReport)
            enqueueSnackbar(res.message, {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Your report not generated', Please try again later!", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })
        }
        finally {
            setLoading(false)
        }
        return res?.interviewReport;
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let res = null;
        try {
            res = await getInterviewReport(interviewId)
            setReport(res.interviewReport)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
        return res?.interviewReport;
    }

    const getAllReports = async () => {
        setLoading(true)
        let res = null;
        try {
            res = await getAllInterviewReports();
            setReports(res.interviewReports)
        } catch (error) {
            console.log(error);
            enqueueSnackbar("You can't fetch your report right now, Please try again later!", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })
        }
        finally {
            setLoading(false)
        }
        return res?.interviewReports
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
        getAllReports()
    }, [interviewId])

    // Generating resume 
    const generateResume = async (interviewId) => {
        setLoading(true);
        let res = null;
        try {
            res = await generateResumePDF(interviewId);
            const url = window.URL.createObjectURL(new Blob([res], { type: "application/pdf" }))
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link);
            link.click();
            enqueueSnackbar("Resume downloaded successfully!", {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });
        } catch (error) {
            console.error(error);
            enqueueSnackbar("You'r resume not downloaded!", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })
        }
        finally {
            setLoading(false)
        }

    }
    return { loading, report, reports, generateReport, getReportById, getAllReports, generateResume }
}