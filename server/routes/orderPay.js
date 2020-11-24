const { response } = require('express');
const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
   const tableId=req.query.tableId;

   const sql=`delete from ordercontent where order_orderId in (select orderId from customerorder where sicktak_sicktakId=${tableId})`;
   const sql2=`delete from customerorder where sicktak_sicktakId=${tableId}`;
   const sql3=`update sicktak set isEmpty=1 where sicktakId=${tableId}`;
   
   const [rows]=await con.query(sql);
   const [rows2]=await con.query(sql2);
   const [rows3]=await con.query(sql3);

   return res.status(200).json({success:true});

});

module.exports=router;