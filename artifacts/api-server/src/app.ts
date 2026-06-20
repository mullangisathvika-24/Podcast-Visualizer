import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve podcast artwork images so the mobile app can load them via the API domain.
// process.cwd() = artifacts/api-server/ when launched by pnpm filter from monorepo root.
const assetsDir = path.join(process.cwd(), "../podcast-visualizer/public/assets");
app.use("/assets", express.static(assetsDir));

app.use("/api", router);

export default app;
