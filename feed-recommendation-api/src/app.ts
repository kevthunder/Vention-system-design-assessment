import express from "express";
import { videos } from "./video";

const app = express();

app.get("/api/videos", (req, res) => {
  res.json(videos);
});

export default app;