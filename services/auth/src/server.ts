import express from "express";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

import authRoute from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);

app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`Auth service running on port ${env.PORT}`);
});
