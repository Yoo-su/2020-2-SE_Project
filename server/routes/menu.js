import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "public/foodImgs/" });
import {
  createMenu,
  getAllActivateMenu,
  getAllMenu,
  updateMenuActivation,
  updateMenuStock,
} from "../services/menu";

//메뉴 관련 라우터
const router = Router();

//메뉴 추가
router.post("/", upload.single("menuImg"), createMenu);

//메뉴 활성화
router.put("/menuActivate", updateMenuActivation);

//활성 상태인 전 메뉴 조회
router.get("/allActivatedMenu", getAllActivateMenu);

//활성 상태에 상관없이 전 메뉴 조회
router.get("/", getAllMenu);

//메뉴 재고 변경
router.get("/", updateMenuStock);

module.exports = router;
