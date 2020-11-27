const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
   const orderId=req.query.orderId;
   const sql=`select menuName, price from menu join orderContent on menuName=menu_menuName where order_orderId=${orderId}`;
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