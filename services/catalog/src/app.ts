import express from "express";
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middleware/errorHandler";
import hotelRoutes from "./routes/hotel.routes"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', hotelRoutes);

app.get('/health' , (req,res) => {
    res.json({status: 'ok' , service: 'catalog'});
});

app.use(errorHandler);

export default app;