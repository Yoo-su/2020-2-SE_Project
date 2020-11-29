const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
  try{
    const tableId=req.query.tableId;
    const sql=`delete from customerorder where sicktak_sicktakId=${tableId}`;
    const sql2=`update sicktak set isEmpty=1 where sicktakId=${tableId}`;
    const sql3=`delete from ordercontent where order_orderId in (select orderId from customerorder where sicktak_sicktakId=${tableId})`;

    const [rows]=await con.query(sql3);
    const [rows2]=await con.query(sql2);
    const [rows3]=await con.query(sql);

    return res.status(200).json({success:true});
  }catch(err){
      console.log(err);
      res.send({success:false});
  }
});

module.exports=router;