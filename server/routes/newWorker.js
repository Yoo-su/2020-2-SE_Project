const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.post('/',async(req,res)=>{
   try{
        const email=req.body.userEmail;
        const password=req.body.password;
        const nickName=req.body.nickName;
        const wage=req.body.wage;
        const role=req.body.role;

        console.log(email, nickName, wage, role);
        const sql=`insert into user values('${email}', '${password}', '${nickName}', ${role}, ${wage})`;
        const [rows]=await con.query(sql);

        return res.status(200).json({success:true});
   }catch(err){
       console.log(err);
       return res.send({success:false})
   }
})

module.exports=router;