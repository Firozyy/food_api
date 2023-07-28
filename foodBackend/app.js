import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./midleware/error.js"
import cookieparser from "cookie-parser"
dotenv.config({ path: "./config/.env" })

const app = express();
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

import UserRoutes from "./routes/userRoutes.js"
import menuRoutes from "./routes/menuRoute.js"

app.use("/api/v1", UserRoutes)
app.use("/api/v1", menuRoutes)

app.use(notFound);
app.use(errorHandler);
export default app