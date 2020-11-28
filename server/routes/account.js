const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
   try{
     const sql=`select * from account order by dateInfo desc`;

      const monthlyTotal=`select sum(salesTotal-minusTotal) as soon from account where month(dateInfo)=month(now())`;


     const [rows]=await con.query(sql);
     const [rows2]=await con.query(monthlyTotal);

     return res.status(200).json({
         success:true,
         account:rows,
         monthlySoon:rows2[0].soon
     })
   }catch(err){
       console.log(err);
       res.send({success:false})
   }
});

module.exports=router;