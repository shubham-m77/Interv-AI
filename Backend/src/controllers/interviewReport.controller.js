const { PDFParse } = require('pdf-parse');
const interviewReportModel = require('../models/interviewReportModel');
const { generateInterviewReport, generateResumePdf } = require('../services/ai.service');
const InterviewReport = require('../models/interviewReportModel');

// Generate Interview Report
const interviewReportController = async (req, res) => {
    try {
        const resumeFile = req.file;
        const { jobDescription, selfDescription = "" } = req.body;
        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }
        let resumeText = "";
        if (resumeFile) {
            const resumeData = await new PDFParse(
                Uint8Array.from(resumeFile.buffer)
            ).getText();

            resumeText = resumeData.text || "";
        }
        const hasResume = resumeText.trim().length > 0;
        const hasSelfDescription = selfDescription.trim().length > 0;

        if (!hasResume && !hasSelfDescription) {
            return res.status(400).json({
                message: "Please provide either resume or self description"
            });
        }
        const interviewReportByAi = await generateInterviewReport({ resume: resumeText, jobDescription, selfDescription });
        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: resumeText,
            jobDescription,
            selfDescription,
            ...interviewReportByAi
        });
        res.status(201).json({ message: "Interview Report Created", interviewReport });
    } catch (error) {
        console.error(error);
    }
}


// Get Interview Report by Id : Single
const getInterviewReportById = async (req, res) => {
    const { interviewId } = req.params;
    try {
        const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: req.user._id });
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview Report Not found " });

        }
        return res.status(200).json({ message: "Interview Report Fetched ", interviewReport });
    } catch (error) {
        console.error("Interview report not fetched!" + error)
        return res.status(500).json({ message: error.message })
    }
}

// Get All Interview Reports
const getAllInterviewReports = async (req, res) => {
    try {
        const interviewReports = await InterviewReport.find({ user: req.user._id }).sort({ createdAt: -1 })
            .select("-selfDescription -jobDescription -resume -_v -technicalQuestions -behavioralQuestions -preparationPlan -skillGaps -updatedAt");

        if (interviewReports.length == 0) {
            return res.status(404).json({ message: "No interview reports found" });

        }
        return res.status(200).json({ message: "Interview reports fetched", interviewReports });


    } catch (error) {
        console.error("Interview reports not fetched: " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Generating resume : api/interview/resume/pdf/:interviewId

const generateResume = async (req, res) => {
    const { interviewId } = req.params;
    try {
        const interviewReport = await InterviewReport.findOne({
            _id: interviewId,
            user: req.user._id
        });
        if (!interviewReport) {
            if (!interviewReport) {
                return res.status(404).json({ message: "Interview report not available" });
            }
        }
        const { resume = "", selfDescription = "", jobDescription } = interviewReport;

        if (!resume.trim() && !selfDescription.trim()) {
            return res.status(400).json({
                message: "Resume cannot be generated because candidate data is missing"
            });
        }
        const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription });
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
        })
        return res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { interviewReportController, getInterviewReportById, getAllInterviewReports, generateResume };