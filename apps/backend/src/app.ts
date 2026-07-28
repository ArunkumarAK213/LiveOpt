import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "🚍 LiveOpt API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
interface CustomError extends Error {
  status?: number;
}

app.use(
  (
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error(err);

    res.status(err.status ?? 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;