import { Router } from "express";
import { getAllOrders } from "../services/cook";

/*쿠킹 관련 라우터*/

const router = Router();

//점원으로부터 접수된 모든 주문 조회
router.get("/allOrders", getAllOrders);

module.exports = router;
