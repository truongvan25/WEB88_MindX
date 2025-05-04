import { Router } from "express";
import {customerMiddleWare} from "../middleware/customerMiddle.js"
import controller from "../controller/authController.js";
const customerRoute = Router();

customerRoute.get('/', controller.getAllCustomer)
customerRoute.post('/', customerMiddleWare, controller.postCustomer)
customerRoute.get('/:id', controller.getSpecific)
customerRoute.get('/:customerId/order', controller.getOrderByCustomerId)
export default customerRoute;
