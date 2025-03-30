import { Router } from "express";
import bookRouter from "./src/routes/bookRoutes";

const router = Router();

router.use("/books", bookRouter); // Add the message routes under the "/messages" path

export default router;
