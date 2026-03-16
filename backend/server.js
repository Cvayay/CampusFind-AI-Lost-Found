import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import itemsRouter from "./routes/items.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("CampusFind backend running");
});

app.listen(PORT, () => {
  console.log(`CampusFind backend running on port ${PORT}`);
});