import { Router, type IRouter } from "express";
import healthRouter from "./health";
import podcastsRouter from "./podcasts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(podcastsRouter);

export default router;
