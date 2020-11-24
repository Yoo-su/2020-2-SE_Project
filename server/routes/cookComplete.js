const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
    const orderId=req.query.orderId;

    const sql=`update customerorder set state='prepared' where orderId='${orderId}'`;

    const [rows]=await con.query(sql);

    return res.status(200).json({success:true});

    }catch(err){
        return res.send({success:false});
    }
})

module.exports=router;