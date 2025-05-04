import { Router } from "express";
import controller from "../controller/authController.js";
const productRoute = Router();

productRoute.post('/', controller.postProduct);
export default productRoute;
