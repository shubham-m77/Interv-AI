import apiClient from '../../../lib/apiClient'

// generating interview report :connecting backend with frontend
export const generateInterviewReport = async ({  jobDescription, selfDescription ,resume}) => {
    const formData = new FormData();
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resume)

    try {
        const res = await apiClient.post("/api/interview", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    } catch (error) {
        console.error(error)
    }
}

// get interview report by id :connecting backend with frontend
export const getInterviewReport = async (interviewId) => {
    try {
        const res = await apiClient.get(`/api/interview/report/${interviewId}`);
        return res.data;
    } catch (error) {
        console.error(error)
    }
}

// get interview report by id :connecting backend with frontend
export const getAllInterviewReports = async () => {
    try {
        const res = await apiClient.get(`/api/interview`);
        return res.data;
    } catch (error) {
        console.error(error)
    }
}

// generate resume by interviewId :connecting backend with frontend
export const generateResumePDF = async (interviewId) => {
    try {
        const res = await apiClient.get(`/api/interview/resume/pdf/${interviewId}`,{
            responseType:"blob"
        });
        return res.data;
    } catch (error) {
        console.error(error)
    }
}



