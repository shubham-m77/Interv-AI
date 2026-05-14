const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer-core");
const fs = require("fs");


const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const WINDOWS_CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
// ─────────────────────────────────────────────
const IS_PRODUCTION = process.env.NODE_ENV==='production';

// ─────────────────────────────────────────────
//  Schema definitions
// ─────────────────────────────────────────────
const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe("The match score between the candidate and the job role (0-100)"),

    technicalQuestions: z
        .array(
            z.object({
                question: z.string().describe("The technical question to be asked in the interview"),
                answer: z.string().describe("How to answer this question, what points to cover"),
                intention: z.string().describe("The intention of interviewer behind this question"),
            })
        )
        .describe("Technical questions with their intention and how to answer them"),

    behavioralQuestions: z
        .array(
            z.object({
                question: z.string().describe("The behavioral question to be asked in the interview"),
                answer: z.string().describe("How to answer this question, what points to cover"),
                intention: z.string().describe("The intention of interviewer behind this question"),
            })
        )
        .describe("Behavioral questions with their intention and how to answer them"),

    skillGaps: z
        .array(
            z.object({
                skill: z.string().describe("The skill which candidate is lacking"),
                severity: z.enum(["low", "medium", "high"]).describe("Severity level of the skill gap"),
            })
        )
        .describe("Skill gaps the candidate has for the applied role with severity levels"),

    preparationPlan: z
        .array(
            z.object({
                day: z.number().describe("Day number in the preparation plan"),
                focus: z.string().describe("Main focus or topic for that day"),
                tasks: z.array(z.string()).describe("Specific tasks to complete on that day"),
            })
        )
        .describe("Day-by-day preparation plan for the interview"),

    title: z.string().describe("Job title which the interview report is generated"),
});

// ─────────────────────────────────────────────
//  PDF generation
// ─────────────────────────────────────────────
const htmlToPdfGenerate = async (htmlResume) => {
    let browser;

    try {
        let executablePath;

        if (IS_PRODUCTION) {
            const chromium = require("@sparticuz/chromium");
            executablePath = await chromium.executablePath();
            browser = await puppeteer.launch({
                args: chromium.args,
                executablePath,
                headless: chromium.headless,
                defaultViewport: chromium.defaultViewport,
            });
        } else {
            // ── Local Windows: use your installed Chrome ──────────────────────────
            // Tries Program Files first, then Program Files (x86) as fallback.
            const fallbackPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

            if (fs.existsSync(WINDOWS_CHROME_PATH)) {
                executablePath = WINDOWS_CHROME_PATH;
            } else if (fs.existsSync(fallbackPath)) {
                executablePath = fallbackPath;
            } else {
                throw new Error(
                    `Chrome not found at:\n  ${WINDOWS_CHROME_PATH}\n  ${fallbackPath}\n\n` +
                    `Please install Google Chrome or update WINDOWS_CHROME_PATH in ai.service.js.`
                );
            }
            browser = await puppeteer.launch({
                executablePath,
                headless: "new",
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                ],
            });
        }

        const page = await browser.newPage();
        await page.setContent(htmlResume, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "12mm",
                right: "12mm",
            },
        });

        return pdfBuffer;
    } catch (error) {
        console.error("Puppeteer PDF generation error:", error);
        throw error;
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch (closeError) {
                console.warn("Error closing browser:", closeError);
            }
        }
    }
};

// ─────────────────────────────────────────────
//  Interview report
// ─────────────────────────────────────────────
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
                responseJsonSchema: zodToJsonSchema(interviewReportSchema),
            },
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error invoking Gemini API:", error);
        throw error;
    }
};

// ─────────────────────────────────────────────
//  Resume PDF
// ─────────────────────────────────────────────
const generateResumePdf = async ({ resume, jobDescription, selfDescription }) => {
    const resumePdfSchema = z.object({
        resumeHtml: z.string().describe("The html content of the resume in professional format"),
    });

    const prompt = `
You are an expert resume writer and ATS optimization specialist.

Generate a highly professional, ATS-friendly, recruiter-optimized resume based on the following candidate information.

Candidate Resume Data:
${resume && resume.trim() ? resume : "No resume was provided. Build the resume from the self description and job description only."}

Candidate Self Description:
${selfDescription && selfDescription.trim() ? selfDescription : "No self description was provided. Build the resume from the uploaded resume and job description only."}

Target Job Description:
${jobDescription}

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

3. DESIGN RULES (VERY IMPORTANT)
- Keep the design minimal, professional, and ATS-safe.
- Use only black, dark gray, and white colors.
- Use professional fonts like Arial, Helvetica, or Calibri.
- No gradients, backgrounds, shadows, cards, or fancy UI styling.
- Use inline CSS only — no external stylesheets.
- Optimize for Puppeteer PDF rendering and print-friendly spacing.

4. RESUME STRUCTURE
Include only relevant sections:
- Header, Professional Summary, Technical Skills,
- Projects, Experience, Education, Certifications, Achievements

5. LENGTH
- 1 page for fresher/junior candidates.
- Maximum 2 pages only if truly necessary.

Return a JSON object with a single field "resumeHtml" containing the complete HTML resume.
`;

    try {
        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(resumePdfSchema),
            },
        });

        const parsed = JSON.parse(response.text);
        return await htmlToPdfGenerate(parsed.resumeHtml);
    } catch (error) {
        console.error("Error generating resume PDF:", error);
        throw error;
    }
};

module.exports = { generateInterviewReport, generateResumePdf };