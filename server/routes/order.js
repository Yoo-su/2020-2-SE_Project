import { Router, json } from "express";
import {
  getTableInfo,
  getAllTable,
  getOrderInfo,
  getTakeOutOrders,
  createNewOrder,
  createOrderHistory,
  createTakeoutOrderHistory,
  updateOrderStateToPrepared,
  updateOrderStateToServed,
  deleteOrder,
  getTakeoutOrderInfo,
} from "../services/order";

//주문 관련 라우터
const router = express.Router();
router.use(express.json());

//테이블 정보 조회
router.get("/tableInfo", getTableInfo);

//매장 내 모든 테이블 조회
router.get("/tables", getAllTable);

router.get("/orderInfo", getOrderInfo);

//새로운 주문 등록
router.post("/newOrder", createNewOrder);

//준비완료된 주문 상태를 서빙완료 상태로 변경
router.get("/served", updateOrderStateToServed);

//주문에 대한 결제 처리
router.post("/payForOrder", createOrderHistory);

//주문 취소처리
router.get("/cancelOrder", deleteOrder);

//준비중 상태의 주문을 준비완료 상태로 변경
router.get("/orderPrepared", updateOrderStateToPrepared);

//테이크아웃 판매 정보 기록
router.post("/recordTakeOut", createTakeoutOrderHistory);

//하나의 테이크아웃 주문 관련 컨텐츠 조회
router.get("/takeOutContent", getTakeoutOrderInfo);

//테이크아웃 주문 조회
router.get("/takeOutOrders", getTakeOutOrders);
