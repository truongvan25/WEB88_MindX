import { Router } from "express";
import { orderMiddleWare } from "../middleware/orderMiddle.js";
import controller from "../controller/authController.js";
const orderRoute = Router();

orderRoute.post('/', orderMiddleWare, controller.postOrder);
orderRoute.get('/', controller.getOrderOverTen)
orderRoute.get('/filter', controller.getFilterMaxMin)
orderRoute.put('/:orderId', controller.updateOrder)
export default orderRoute;
