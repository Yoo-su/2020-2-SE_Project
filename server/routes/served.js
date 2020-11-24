const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    const tableId=req.query.tableId;
    const sql=`update customerorder set state='served' where sicktak_sicktakID=${tableId}`;

    const [rows]=await con.query(sql);
    return res.send({success:true});
})

module.exports=router;