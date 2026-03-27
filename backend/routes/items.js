import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { getAiMatch } from "../gemini.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "../data/items.json");
const uploadDir = path.join(__dirname, "../../uploads"); // Ensure this points to your root uploads

// Middleware & File Setup
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const readItems = () => JSON.parse(fs.readFileSync(dataFile, "utf-8") || "[]");
const writeItems = (items) => fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// --- ROUTES ---

router.get("/", (req, res) => res.json(readItems()));

router.post("/", upload.single("image"), (req, res) => {
  const { type, title, name, description, location, category, contactName, contactInfo } = req.body;
  const finalTitle = title || name;

  if (!type || !finalTitle || !description || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const items = readItems();
  const newItem = {
    id: uuidv4(),
    type,
    title: finalTitle,
    category: category || "Other",
    description,
    location,
    contactName,
    contactInfo,
    status: "open",
    // Match the frontend expectation: store the URL path
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null, 
    createdAt: new Date().toISOString()
  };

  items.push(newItem);
  writeItems(items);
  res.status(201).json(newItem);
});

// Optimized AI Matching
router.post("/match", async (req, res) => {
  try {
    const items = readItems();
    const lostItems = items.filter(i => i.type === "lost" && i.status === "open");
    const foundItems = items.filter(i => i.type === "found" && i.status === "open");

    if (lostItems.length === 0 || foundItems.length === 0) {
      return res.json([]);
    }

    // Instead of looping individual calls, you should ideally pass 
    // arrays to Gemini for batch processing in gemini.js.
    // For now, we'll keep the loop but add a limit to prevent crashes.
    const matches = [];
    const pool = lostItems.slice(0, 5); // Limit processing for speed

    for (const lost of pool) {
      for (const found of foundItems.slice(0, 5)) {
        // Only match if categories are somewhat similar or 'Other'
        if (lost.category === found.category || lost.category === "Other" || found.category === "Other") {
          const ai = await getAiMatch(lost, found);
          if (ai && ai.match) {
            matches.push({
              lostItem: lost,
              foundItem: found,
              confidence: ai.confidence,
              reason: ai.reason
            });
          }
        }
      }
    }

    res.json(matches);
  } catch (error) {
    console.error("Match error:", error);
    res.status(500).json({ error: "AI Matching failed" });
  }
});

export default router;