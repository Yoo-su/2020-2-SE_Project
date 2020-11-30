const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
    const tableId=req.query.tableId;
    const sql=`update customerorder set state='served' where sicktak_sicktakID=${tableId} and state='prepared'`;

    const [rows]=await con.query(sql);
    return res.status(200).json({success:true});
    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
})

module.exports=router;