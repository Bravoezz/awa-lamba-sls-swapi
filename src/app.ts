import "reflect-metadata";
import express from "express";
import serverless from "serverless-http";
import { NotFoundMiddleware, ErrorMiddleware } from './modules/shared/middlewares/error.middleware';
import { loadModules } from "./modules";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.send("API is online"));

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/api/v1", loadModules());
app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

export const server = serverless(app);