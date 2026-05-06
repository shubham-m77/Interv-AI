const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require('puppeteer-core');

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("The match score between the candidate and the job role (0-100)"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question to be asked in the interview"),
        answer: z.string().describe("How to answer this question, what points to cover"),
        intention: z.string().describe("The intention of interviewer behind this question")
    })).describe("Technical questions with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question to be asked in the interview"),
        answer: z.string().describe("How to answer this question, what points to cover"),
        intention: z.string().describe("The intention of interviewer behind this question")
    })).describe("Behavioral questions with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("Severity level of the skill gap")
    })).describe("Skill gaps the candidate has for the applied role with severity levels"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number in the preparation plan"),
        focus: z.string().describe("Main focus or topic for that day"),
        tasks: z.array(z.string()).describe("Specific tasks to complete on that day")
    })).describe("Day-by-day preparation plan for the interview"),

    title: z.string().describe("Job title which the interview report is generated"),

});
// Generating pdf from html with puppeteer
const htmlToPdfGenerate = async (htmlResume) => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlResume, {
        waitUntil: 'networkidle2',
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "10mm",
            right: "10mm"
        }
    });
    await browser.close();
    return pdfBuffer

}

// for generating interview report
const generateInterviewReport = async ({ resume = "", jobDescription, selfDescription = "" }) => {
    const prompt = `
You are an expert interview preparation assistant.

Generate a complete interview report based on the available candidate information.

Target Job Description:
${jobDescription}

Candidate Resume:
${resume && resume.trim() ? resume : "No resume provided by the candidate."}

Candidate Self Description:
${selfDescription && selfDescription.trim() ? selfDescription : "No self description provided by the candidate."}

Important Instructions:
- Job description is the main source for required skills and expectations.
- If resume is provided, extract candidate skills, projects, education, and experience from it.
- If self description is provided, use it to understand candidate background, goals, confidence level, projects, and strengths.
- If only resume is provided, generate the report using resume + job description.
- If only self description is provided, generate the report using self description + job description.
- If both are provided, combine both carefully and avoid contradictions.
- Do not assume fake experience.
- Keep the report realistic, helpful, and interview-focused.

Generate:
- Match score
- Technical questions
- Behavioral questions
- Skill gaps
- Preparation plan
- Job title

Return only valid JSON according to the schema.
`;

    try {
        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(interviewReportSchema),  // ✅ Correct key
            }
        });

        const parsed = JSON.parse(response.text);  // ✅ Parse the JSON string
        return parsed;
    } catch (error) {
        console.error("Error invoking Gemini API:", error);
    }
};

// For Generating resume pdf 

const generateResumePdf = async ({ resume, jobDescription, selfDescription }) => {
    const resumePdfSchema = z.object({ resumeHtml: z.string().describe("The html content of the resume which can be provided to puppeteer library to generate pdf ") });
    const prompt = `
You are an expert resume writer and ATS optimization specialist.

Generate a highly professional, ATS-friendly, recruiter-optimized resume based on the following candidate information.

Candidate Resume Data:
${resume && resume.trim() ? resume : "No resume was provided. Build the resume from the self description and job description only."}

Candidate Self Description:
${selfDescription && selfDescription.trim() ? selfDescription : "No self description was provided. Build the resume from the uploaded resume and job description only."}

Target Job Description:
${jobDescription}

Your task is to create a clean, modern, ATS-friendly resume that maximizes:
- ATS score
- Recruiter readability
- Interview selection chances
- Keyword relevance
- Professional presentation

IMPORTANT INSTRUCTIONS:

1. ATS OPTIMIZATION
- Naturally include relevant keywords, technologies, skills, and responsibilities from the job description.
- Ensure the resume is fully ATS parsable.
- Avoid tables, icons, graphics, progress bars, images, emojis, or complex layouts.
- Use a simple single-column professional structure.
- Use semantic HTML and proper heading hierarchy.

2. CONTENT QUALITY
- Make the content sound realistic, human-written, and professional.
- Do NOT use generic AI-generated language.
- Use strong action verbs and achievement-focused bullet points.
- Focus on impact, technical contribution, and practical skills.
- Enhance project descriptions professionally while keeping them believable.
- Prioritize the most relevant technical skills and experiences.

3. RECRUITER RETENTION
- Create a strong professional summary tailored to the job description.
- Make the resume highly scannable and easy to read within 6–8 seconds.
- Use concise but impactful bullet points.
- Highlight job-ready skills and relevant projects clearly.

4. DESIGN RULES (VERY IMPORTANT)
- Keep the design minimal, professional, and ATS-safe.
- STRICTLY avoid colorful designs or creative layouts.
- Use only black, dark gray, and white colors.
- Maintain clean spacing and typography.
- Use professional fonts like Arial, Helvetica, or Calibri.
- No gradients, backgrounds, shadows, cards, or fancy UI styling.
- Resume should look like a real professional corporate resume.

5. RESUME STRUCTURE
Include only relevant sections:
- Header
- Professional Summary
- Technical Skills
- Projects
- Experience
- Education
- Certifications
- Achievements

6. LENGTH
- Keep it concise and high quality.
- Ideal length:
  - 1 page for fresher/junior candidates
  - Maximum 2 pages only if truly necessary
- Avoid filler content and repetition.

7. OUTPUT FORMAT
Return ONLY a valid JSON object in this format:

{
  "html": "<FULL HTML RESUME HERE>"
}

8. HTML REQUIREMENTS
- Generate complete production-ready HTML.
- Use inline CSS only.
- Optimize for Puppeteer PDF generation.
- Ensure print-friendly spacing and clean page breaks.
- Prevent content overflow.
- Maintain professional typography and alignment.
- Keep margins and spacing optimized for ATS parsing.

9. EXTRA ENHANCEMENTS
- If experience is limited, strategically strengthen projects and technical depth.
- Tailor the entire resume to the target role.
- Make the candidate appear interview-ready and professionally competitive.
- Maintain authenticity and realism throughout.

Generate a polished, corporate-level, ATS-friendly resume that looks professional and increases interview conversion chances.
`;
    try {
        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(resumePdfSchema),
            }
        });

        const parsed = JSON.parse(response.text);
        const pdfBuffer = await htmlToPdfGenerate(parsed.resumeHtml);
        return pdfBuffer;
    } catch (error) {
        console.error("Error on Generating Resume ", error);
        throw error;
    }
}

module.exports = { generateInterviewReport, generateResumePdf };