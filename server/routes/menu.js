import { Router, json } from "express";
import con from "./database";
const multer = require("multer");
const upload = multer({ dest: "public/foodImgs/" });

//메뉴 관련 라우터
const router = Router();
router.use(json());

//메뉴 추가
router.post("/", upload.single("menuImg"), async (req, res) => {
  try {
    const menuName = req.body.menuName;
    const menuPrice = req.body.menuPrice;
    const stockPrice = req.body.stockPrice;
    const imgPath = "foodImgs/" + req.file.filename;
    const addMenuSql = `insert into menu values('${menuName}',${menuPrice},500,0,'${imgPath}',1,${stockPrice})`;

    const [rows] = await con.query(addMenuSql);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
});

//메뉴 활성화
router.put("/menuActivate", async (req, res) => {
  try {
    const menuName = req.query.menuName;
    const activate = req.query.activate;

    const sql = `update menu set activate=${activate} where menuName='${menuName}'`;
    const [rows] = await con.query(sql);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
});

//활성 상태인 전 메뉴 조회
router.get("/allActivatedMenu", async (req, res) => {
  let sql = `select * from menu where activate=1`;

  const [rows] = await con.query(sql);

  return res.status(200).json({ success: true, menu: rows });
});

//활성 상태에 상관없이 전 메뉴 조회
router.get("/", async (req, res) => {
    //판매량 높은 순으로 조회
    let sql = `select * from menu order by sales desc`;

    const [rows] = await con.query(sql);

    return res.status(200).json({ success: true, menu: rows });
});

//메뉴 재고 변경
router.get('/',async(req,res)=>{
    try{
    const menuName=req.query.menuName;
    const newAmount=req.query.amount;
    const stockPrice=req.query.stockPrice;
    const minus=newAmount*stockPrice;
    console.log(minus);

    const sql=`update menu set remainStock=remainStock+${newAmount} where menuName='${menuName}'`;
    const sql2=`insert into account values(date(now()),0,${minus},0,${minus}) on duplicate key 
    update minusTotal=minusTotal+${minus},stockMinus=stockMinus+${minus}`;

    const [rows]=await con.query(sql);
    const [rows2]=await con.query(sql2);
    return res.status(200).json({success:true});

    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
});

module.exports=router;