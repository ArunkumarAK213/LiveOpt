import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

const app = express();

// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// Logging
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", routes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;