const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
  try{
    let sql=`select * from customerorder where sicktak_sicktakId=0`; //여기서 주문 row가 여러개가 나와서 문제가 생긴다.

    const [rows]=await con.query(sql);
    return res.status(200).json({success:true,takeOutOrders:rows});
  }catch(err){
    console.log(err);
    return res.send({success:false});
  }
  });
  
  module.exports=router;