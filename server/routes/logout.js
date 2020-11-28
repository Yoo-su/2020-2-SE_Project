const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
        const nickName=req.query.nickName;
        const sql=`select userEmail,role from user where nickName='${nickName}'`;
        
        
        const [rows]=await con.query(sql);
        if(rows[0].role!==0){
        const userEmail=rows[0].userEmail;

        const sql2=`update workhour set logoutTime=now(), workTime=timediff(now(),loginTime) where user_userEmail='${userEmail}' and logoutTime='-'`;
        const [rows2]=await con.query(sql2);
        
        }
        return res.status(200).json({success:true});
    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
})

module.exports=router;