const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
  try{
      const email=req.query.email;
      const wage=req.query.wage;

      const sql=`SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( workTime ) ) ) AS timeSum from workhour where 
      user_userEmail='${email}' and workTime not in ('-')`;

      const [rows]=await con.query(sql);
      let result='';

      if(rows[0].timeSum===null)result='0';
      else {
        const sql2=`select time_to_sec('${rows[0].timeSum}') as secondResult`;  
        const [rows2]=await con.query(sql2);
        result=rows2[0].secondResult
       }

       const payPrice=Math.floor(parseInt(result)/3600*wage);

      return res.status(200).json({
          success:true,
          workTime:result,
          payPrice:payPrice
      })
  }catch(err){
      console.log(err);
      return res.send({success:false});
  }
});

module.exports=router;