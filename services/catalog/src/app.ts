import express from "express";
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middleware/errorHandler";
import hotelRoutes from "./routes/hotel.routes"
import roomRoutes from "./routes/room.routes"
import availabilityRoutes from './routes/availability.routes'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', hotelRoutes);
app.use('/',roomRoutes);
app.use('/',availabilityRoutes)

app.get('/health' , (req,res) => {
    res.json({status: 'ok' , service: 'catalog'});
});

app.use(errorHandler);

export default app;