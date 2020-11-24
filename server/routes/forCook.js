const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
    const sql=`select * from customerorder where state='cooking'`;
    const [rows]=await con.query(sql);
    
    if(rows){
        return res.status(200).json({
            success:true,
            order:rows
        });
    }else{
        return res.status(200).json({
            success:false
        })
    }
    }catch(err){
        res.send({success:false});
    }
});

module.exports=router;