const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
   try{
       const newSalary=req.query.newSalary;
       const userEmail=req.query.userEmail;

      const sql=`update user set hourWage=${newSalary} where userEmail='${userEmail}'`;

      const [rows]=await con.query(sql);

      return res.status(200).json({
          success:true
      });

   }catch(err){
       console.log(err);
       return res.send({success:false})
   }
});

module.exports=router;