const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
   const orderId=req.query.orderId;
   const sql=`select menu_menuName, count, price from orderContent where order_orderId=${orderId}`;
   const sql2=`select sicktak_sicktakId from customerorder where orderId=${orderId}`;
   
   const [rows]=await con.query(sql);
   const [rows2]=await con.query(sql2);

   return res.status(200).json({
       success:true,
       content:rows,
       tableId:rows2
   });
  }catch(err){
      return res.send({success:false});
  }
});

module.exports=router;