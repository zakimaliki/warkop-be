import { generateResumeSummary } from '../service/gemini.service';

export const getResumeData = async (resumeText: string) => {
    // Prompt seperti di frontend
    let prompt = `please summarize this resume or CV briefly with this layout as JSON Format:
  1. first layout is name, Position or tittle, city,
  2. second layout is contact email, linkedin, and contact number,
  3. third layout is all experience,
  5. fifth layout is education,
  from this text: ${resumeText}`;

    prompt += `\n\nmake exactly like this:
  {
    personal_information: {
      name: "",
      title: "",
      city: "",
    },
    contact: {
      email: "",
      linkedin: "",
      phone: "",
    },
    experience: [
      {
        company: "",
        title: "",
        startYear: "",
        endYear: "",
        location: "",
        description: "",
      },
    ],
    education: [
      {
        university: "",
        degree: "",
        gpa: "",
        startYear: "",
        endYear: "",
      }
    ],
    additional_information: {
      technical_skills: "",
    }
  } and return only JSON format`;

    const text = await generateResumeSummary(prompt);
    console.log("Gemini raw response:", text);
    if (!text || text.trim() === "null") {
        throw new Error("Gemini did not return a valid response");
    }
    // Bersihkan dan parse response Gemini
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in Gemini response");
    let jsonStr = jsonMatch[0]
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\t/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g, '$1"$2"$3');
    return JSON.parse(jsonStr);
}; 