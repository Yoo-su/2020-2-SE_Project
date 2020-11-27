const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
   try{
     const sql=`select * from user where role not in(0)`;

     const [rows]=await con.query(sql);

     return res.status(200).json({
         success:true,
         users:rows
     })
   }catch(err){
       console.log(err);
       return res.send({success:false});
   }
});

module.exports=router;