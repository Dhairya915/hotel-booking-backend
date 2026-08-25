import express from "express";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.get('/health' , (req , res) => {
    res.json({status: 'ok' , service: 'auth'});
})

app.use(errorHandler);

app.listen(env.PORT , () => {
    logger.info(`Auth service running on port ${env.PORT}`);
});