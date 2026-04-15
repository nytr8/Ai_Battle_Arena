import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.post("/invoke", async (req, res) => {
  const { query } = req.body;
  const result = await runGraph(query);
  if (!result) {
    return res.status(500).json({ error: "Failed to process the query" });
  }
  res.status(200).json(result);
});

export default app;
