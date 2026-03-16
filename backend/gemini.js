import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

function fallbackMatch(lostItem, foundItem) {
  const lostText =
    `${lostItem.name || ""} ${lostItem.description || ""} ${lostItem.location || ""}`.toLowerCase();
  const foundText =
    `${foundItem.name || ""} ${foundItem.description || ""} ${foundItem.location || ""}`.toLowerCase();

  const lostWords = new Set(lostText.split(/\W+/).filter(Boolean));
  const foundWords = new Set(foundText.split(/\W+/).filter(Boolean));

  let overlap = 0;
  for (const word of lostWords) {
    if (foundWords.has(word)) overlap += 1;
  }

  const sameLocation =
    lostItem.location &&
    foundItem.location &&
    lostItem.location.toLowerCase() === foundItem.location.toLowerCase();

  const score = overlap + (sameLocation ? 2 : 0);

  return {
    match: score >= 3,
    confidence: score >= 5 ? "high" : score >= 3 ? "medium" : "low",
    reason: sameLocation
      ? "Similar description and same location were detected."
      : "Keyword similarity fallback was used."
  };
}

export async function getAiMatch(lostItem, foundItem) {
  try {
    const prompt = `
You are helping a university lost-and-found platform identify whether two reports likely refer to the same real-world item.

Return ONLY valid JSON with exactly this schema:
{
  "match": true,
  "confidence": "high",
  "reason": "short reason"
}

Lost item:
- name: ${lostItem.name || ""}
- description: ${lostItem.description || ""}
- location: ${lostItem.location || ""}

Found item:
- name: ${foundItem.name || ""}
- description: ${foundItem.description || ""}
- location: ${foundItem.location || ""}

Rules:
- match must be true or false
- confidence must be one of: low, medium, high
- reason must be under 20 words
- consider item identity, appearance, keywords, and location
- be conservative: only return match=true if it is genuinely plausible
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text.trim().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini failed, using fallback:", error.message);
    return fallbackMatch(lostItem, foundItem);
  }
}