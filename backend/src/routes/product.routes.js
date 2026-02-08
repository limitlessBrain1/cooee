import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createProduct);
router.get("/", getProducts);

export default router;
