const mongoose = require('mongoose');

/**
 * - job description schema : String
 * - resume : String
 * - Self description : String
 * 
 * - matchScore : Number
 * 
 * - Technical questions : [{ question: "", answer: "" , intention:""}]
 * - Behavioral questions : [{ question: "", answer: "" , intention:""}]
 * - Skill gaps : [{skill:"",severity:{type:String, enum:["low","medium","high"]}}]
 * - Preparation plan : [{
 *   day: Number,
 *   focus: String,
 *   tasks: [String]
 * }]
 */

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, 'Job description is required']
    },
    resume: {
        type: String,
        default: ""
    },
    selfDescription: {
        type: String,
        default: ""
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [{
        question: {
            type: String,
            required: [true, 'Technical question is required']
        },
        answer: {
            type: String,
            required: [true, 'Answer is required']
        },
        intention: {
            type: String,
            required: [true, 'Intention is required']
        },
    }, { _id: false }],
    behavioralQuestions: [{
        question: {
            type: String,
            required: [true, 'Behavioral question is required']
        },
        answer: {
            type: String,
            required: [true, 'Answer is required']
        },
        intention: {
            type: String,
            required: [true, 'Intention is required']
        }
    }, { _id: false }],
    skillGaps: [{
        skill: String,
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, 'Severity is required']
        }
    }, { _id: false }],
    preparationPlan: [{
        day: { type: Number, required: [true, 'Day is required'] },
        focus: { type: String, required: [true, 'Focus is required'] },
        tasks: { type: [String], required: [true, 'Tasks are required'] }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Job title is required for generating report"]
    }

}, { timestamps: true });

interviewReportSchema.pre("validate", function () {
    const hasResume = this.resume && this.resume.trim().length > 0;
    const hasSelfDescription =
        this.selfDescription && this.selfDescription.trim().length > 0;

    if (!hasResume && !hasSelfDescription) {
        this.invalidate(
            "resume",
            "Either resume or self description is required"
        );

        this.invalidate(
            "selfDescription",
            "Either self description or resume is required"
        );
    }
});
const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReport;