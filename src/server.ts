import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

const PORT = process.env.PORT || 5000;

// ================= ALLOWED ORIGINS =================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://task-management-system-frontend-ten.vercel.app",
];

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman/mobile apps)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// ================= ROOT ROUTE =================
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running",
  });
});

// ================= ROUTES =================
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});