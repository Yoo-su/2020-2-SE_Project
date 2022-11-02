import { Router } from "express";
import {
  updateLogoutUserInfo,
  insertLoginUserInfo,
  createNewEmp,
  deleteEmp,
  getAllEmp,
  getEmpDetail,
  getEmpHistory,
  updateEmpSalary,
  payForEmp,
} from "../services/user";

//사용자 관련 라우터
const router = Router();

//새 직원 생성
router.post("/newEmp", createNewEmp);

//직원 삭제
router.get("/removeEmp", deleteEmp);

//직원 로그인
router.post("/login", insertLoginUserInfo);

//직원 로그아웃
router.get("/logout", updateLogoutUserInfo);

//모든 직원 조회
router.get("/allEmp", getAllEmp);

//직원 상세정보 조회
router.get("/empDetail", getEmpDetail);

//직원 근무기록 조회
router.get("/workHistory", getEmpHistory);

//직원 급여 업데이트
router.put("/updateSalary", updateEmpSalary);

//직원 급여 지불처리
router.get("/payForWage", payForEmp);
