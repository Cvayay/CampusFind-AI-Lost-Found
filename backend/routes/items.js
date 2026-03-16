import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { getAiMatch } from "../gemini.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "../data/items.json");
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]");

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

function readItems() {
  return JSON.parse(fs.readFileSync(dataFile, "utf-8") || "[]");
}

function writeItems(items) {
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
}

router.get("/", (req, res) => {
  res.json(readItems());
});

router.post("/", upload.single("image"), (req, res) => {
  const { type, name, description, location, status } = req.body;

  if (!type || !name || !description || !location) {
    return res.status(400).json({
      error: "type, name, description, and location are required"
    });
  }

  const items = readItems();

  const newItem = {
    id: uuidv4(),
    type,
    name,
    description,
    location,
    status: status || "open",
    image: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString()
  };

  items.push(newItem);
  writeItems(items);

  res.status(201).json(newItem);
});

router.get("/match", async (req, res) => {
  try {
    const items = readItems();
    const lostItems = items.filter((i) => i.type === "lost");
    const foundItems = items.filter((i) => i.type === "found");

    const matches = [];

    for (const lost of lostItems) {
      for (const found of foundItems) {
        const ai = await getAiMatch(lost, found);

        if (ai.match) {
          matches.push({
            lostItem: lost,
            foundItem: found,
            confidence: ai.confidence,
            reason: ai.reason
          });
        }
      }
    }

    res.json(matches);
  } catch (error) {
    console.error("Match route error:", error);
    res.status(500).json({ error: "Failed to generate matches" });
  }
});

export default router;