import cors from "cors";
import express, { Application, json } from "express";
import "express-async-errors";
import helmet from "helmet";
import { handleErrors } from "./middlewares";
import { addressRouter, sessionRouter, userRouter } from "./routes";

export const app: Application = express();

app.use(cors());
app.use(helmet());

app.use(json());

app.use("/api/users", userRouter);
app.use("/api", sessionRouter);
app.use("/api/addresses", addressRouter);

app.use(handleErrors);
