const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
   try{
      const userEmail=req.query.userEmail;

      const sql=`delete from user where userEmail='${userEmail}'`;

      const [rows]=await con.query(sql);

      return res.status(200).json({success:true});
   }catch(err){
       console.log(err);
       return res.send({success:false});
   }
})

module.exports=router;