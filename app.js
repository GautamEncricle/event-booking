import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import mainRouter from "./src/routes/index.js";
import errorHandler from "./src/middlewares/error.middleware.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api/v1", mainRouter);

app.use(errorHandler);
export default app;