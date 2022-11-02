import { Router, json } from "express";
import order from "./order";
import cook from "./cook";
import menu from "./menu";
import user from "./user";
import store from "./store";

const router = Router();
router.use(json());

router.use("/order", order);

router.use("/cook", cook);

router.use("/menu", menu);

router.use("/user", user);

router.use("/store", store);

export default router;
