const express = require("express");

const { isAuthUser } = require("../middlewares/auth.middleware");
const {interviewReportController,getAllInterviewReports,getInterviewReportById, generateResume} = require("../controllers/interviewReport.controller");
const multerUpload = require("../middlewares/files.middleware");
const interviewRouter = express.Router();

// Interview Report Generate ApI
interviewRouter.post("/",isAuthUser,multerUpload.single('resume'),interviewReportController);

// get Single Inteview Report by Id API
interviewRouter.get("/report/:interviewId",isAuthUser,getInterviewReportById);

// get All Inteview Reports API
interviewRouter.get("/",isAuthUser,getAllInterviewReports);

// Generate Resume in pdf format
interviewRouter.get("/resume/pdf/:interviewId",isAuthUser,generateResume);

module.exports = interviewRouter;

