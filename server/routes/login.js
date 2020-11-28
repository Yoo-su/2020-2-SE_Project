const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.post('/',async(req,res)=>{
   try{
   const email=req.body.email;
   const password=req.body.password;

   const sql=`select * from user where userEmail='${email}' and password='${password}'`;
   const [rows]=await con.query(sql);
  
   if(rows[0].role!==0){
   let randId=0;
   const uniqueSql=`select * from workhour where workhourId=${randId}`;
   while(true){
    randId=Math.random()*(5000-4000)+4000;
    const [aleadyExist]=await con.query(uniqueSql);
    if(aleadyExist.length===0)break;
   }

   const sql2=`insert into workhour values(${randId},'${email}',now(),'-','-')`;
   const [rows2]=await con.query(sql2);
  }
 
    return res.status(200).json({
           success:true,
           nickName:rows[0].nickName,
           role:rows[0].role
     })
   

   }catch(err){
       console.log(err);
       return res.send({success:false});
   }
});

module.exports=router;