const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
    const sql=`select * from customerorder where state='cooking' order by receiveTime desc`;
    const [rows]=await con.query(sql);
    

    return res.status(200).json({
       success:true,
       order:rows
    });
    
    }catch(err){
        res.send({success:false});
    }
});

module.exports=router;