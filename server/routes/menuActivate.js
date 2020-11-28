const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
        const menuName=req.query.menuName;
        const activate=req.query.activate;

        const sql=`update menu set activate=${activate} where menuName='${menuName}'`;
        const [rows]=await con.query(sql);

        return res.status(200).json({success:true});
    }catch(err){
        console.log(err);
        res.send({success:false});
    }
})

module.exports=router;