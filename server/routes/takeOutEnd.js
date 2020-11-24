const { response } = require('express');
const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
        const orderId=req.query.orderId;

        let sql=`delete from ordercontent where order_orderId=${orderId}`;
        const sql2=`delete from customerorder where orderId=${orderId}`;

        const [rows]=await con.query(sql);
        const [rows2]=await con.query(sql2);

        return res.status(200).json({success:true});

    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
})

module.exports=router;