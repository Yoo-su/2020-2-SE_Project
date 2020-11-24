const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    console.log('주문카드 갱신접속 시도 발견');
    try{
   const orderId=req.query.orderId;
   const sql=`select menuName, price from menu join orderContent on menuName=menu_menuName where order_orderId=${orderId}`;
   
   const [rows]=await con.query(sql);

   return res.status(200).json({
       success:true,
       content:rows
   });
  }catch(err){
      return res.send({success:false});
  }
});

module.exports=router;