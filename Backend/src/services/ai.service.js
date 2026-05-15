const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const WINDOWS_CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// ─────────────────────────────────────────────
//  PDF generation
// ─────────────────────────────────────────────
const htmlToPdfGenerate = async (htmlResume) => {
    let browser;
    try {
        let executablePath;
        let launchArgs = [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
        ];

        if (IS_PRODUCTION) {
            // Try multiple common Chromium paths in Render/Ubuntu
            const possiblePaths = [
                process.env.CHROMIUM_PATH,  // allow override via env var
                "/usr/bin/chromium-browser",
                "/usr/bin/chromium",
                "/usr/lib/bin/chromium-browser",
                "/usr/lib/bin/chromium",
                "/snap/bin/chromium"
            ];

            executablePath = possiblePaths.find(path => path && fs.existsSync(path));

            if (!executablePath) {
                throw new Error(
                    `Chromium not found at any of these paths: ${possiblePaths.filter(Boolean).join(', ')}\n` +
                    `Make sure Chromium is installed in your Render environment.`
                );
            }

            console.log(`Using Chromium at: ${executablePath}`);

            browser = await puppeteer.launch({
                executablePath,
                headless: true,
                args: launchArgs,
            });
        } else {
            // Local Windows
            const fallbackPath =
                "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
            executablePath = fs.existsSync(WINDOWS_CHROME_PATH)
                ? WINDOWS_CHROME_PATH
                : fallbackPath;

            if (!fs.existsSync(executablePath)) {
                throw new Error(
                    `Chrome not found. Install it or update WINDOWS_CHROME_PATH.`
                );
            }

            browser = await puppeteer.launch({
                executablePath,
                headless: "new",
                args: launchArgs,
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
//  Schema definitions (unchanged)
// ─────────────────────────────────────────────
const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("Match score (0-100)"),
    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            answer: z.string(),
            intention: z.string(),
        })
    ),
    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            answer: z.string(),
            intention: z.string(),
        })
    ),
    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"]),
        })
    ),
    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string()),
        })
    ),
    title: z.string(),
});

// ─────────────────────────────────────────────
//  Interview report (fixed model name)
// ─────────────────────────────────────────────
const generateInterviewReport = async ({ resume = "", jobDescription, selfDescription = "" }) => {
    const prompt = `
You are an expert interview preparation assistant.
Generate a complete interview report based on the available candidate information.

Target Job Description: ${jobDescription}
Candidate Resume: ${resume?.trim() || "No resume provided."}
Candidate Self Description: ${selfDescription?.trim() || "No self description provided."}

Instructions:
- Job description is the main source for required skills and expectations.
- If resume is provided, extract candidate skills, projects, education, and experience.
- If self description is provided, use it to understand background, goals, and strengths.
- Combine both carefully if both are provided.
- Do not assume fake experience.
- Keep the report realistic, helpful, and interview-focused.

Return only valid JSON according to the schema.
`;

    try {
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",   
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
//  Resume PDF (fixed model name)
// ─────────────────────────────────────────────
const generateResumePdf = async ({ resume, jobDescription, selfDescription }) => {
    const resumePdfSchema = z.object({
        resumeHtml: z.string().describe("The HTML content of the resume"),
    });

    const prompt = `
You are an expert resume writer and ATS optimization specialist.
Generate a highly professional, ATS-friendly resume based on the following.

Candidate Resume: ${resume?.trim() || "No resume provided. Use self description and job description only."}
Candidate Self Description: ${selfDescription?.trim() || "No self description provided."}
Target Job Description: ${jobDescription}

Rules:
- ATS parsable, no tables/icons/images/emojis/progress bars.
- Single-column, semantic HTML, inline CSS only.
- Black, dark gray, white colors only. Professional fonts (Arial, Helvetica, Calibri).
- Strong action verbs, achievement-focused bullet points.
- Sections: Header, Summary, Skills, Projects, Experience, Education, Certifications.
- 1 page for freshers, max 2 pages if necessary.

Return JSON with field "resumeHtml" containing the complete HTML string.
`;

    try {
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",   
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