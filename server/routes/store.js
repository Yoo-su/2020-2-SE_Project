import { Router, json } from "express";
import { getAccountInfo, getSalesInfo } from "../services/store";

/* 매장정보(판매, 회계) 관련 라우터 */

const router = Router();
router.use(json());

//판매정보 조회
router.get("/sales", getSalesInfo);

//회계정보 조회
router.get("/account", getAccountInfo);
