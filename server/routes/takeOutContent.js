const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    let conn=await con.getConnection(async corn=>corn);
   const orderId=req.query.orderId;
   
   try{
   const sql=`select menuName, price from menu join orderContent on menuName=menu_menuName where order_orderId=${orderId}`;
   const [rows]=await conn.query(sql);

   conn.release();
   return res.status(200).json({content:rows});
   }catch(err){
       console.log(err);
       return res.send(err);
   }
});

module.exports=router;