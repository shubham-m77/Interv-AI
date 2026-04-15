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
        required: [true, 'Resume is required']
    },
    selfDescription: {
        type: String,
        required: [true, 'Self description is required']
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
    title:{
        type:String,
        required:[true,"Job title is required for generating report"]
    }

},{timestamps:true})

const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReport;