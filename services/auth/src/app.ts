import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import authRoute from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);

app.use(errorHandler);

export default app;
