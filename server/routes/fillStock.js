const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
    const menuName=req.query.menuName;
    const newAmount=req.query.amount;

    const sql=`update menu set remainStock=${newAmount} where menuName='${menuName}'`;

    const [rows]=await con.query(sql);
    return res.status(200).json({success:true});

    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
});

module.exports=router;