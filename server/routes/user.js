const express=require('express');
const con=require("./database");

//사용자 관련 라우터
const router = express.Router();
router.use(express.json());

//새 직원 생성
router.post('/newEmp',async(req,res)=>{
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

//직원 삭제 
 router.get('/removeEmp',async(req,res)=>{
    try{
       const userEmail=req.query.userEmail;
      
       const sql=`delete from workhour where user_userEmail='${userEmail}'`;
       const sql2=`delete from user where userEmail='${userEmail}'`;
 
       const [rows]=await con.query(sql);
       const [rows2]=await con.query(sql2);
 
       return res.status(200).json({success:true});
    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
 })

//직원 로그인
router.post('/login',async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
 
    const sql=`select * from user where userEmail='${email}' and password='${password}'`;
    const [rows]=await con.query(sql);
   
    if(rows[0].role!==0){
    let randId=0;
    let uniqueSql=``;
    while(true){
     randId=Math.random()*(5000-4000)+4000;
     uniqueSql=`select * from workhour where workhourId=${randId}`;
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


//직원 로그아웃
 router.get('/logout',async(req,res)=>{
    try{
        const nickName=req.query.nickName;
        const sql=`select userEmail,role from user where nickName='${nickName}'`;
        
        
        const [rows]=await con.query(sql);
        if(rows[0].role!==0){
        const userEmail=rows[0].userEmail;

        //근무시간 기록
        const sql2=`update workhour set logoutTime=now(), workTime=timediff(now(),loginTime) where user_userEmail='${userEmail}' and logoutTime='-'`;
        const [rows2]=await con.query(sql2);
        
        }
        return res.status(200).json({success:true});
    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
})

//모든 직원 조회
router.get('/allEmp',async(req,res)=>{
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

 //직원 상세정보 조회
 router.get('/empDetail',async(req,res)=>{
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

//직원 근무기록 조회
  router.get('/workHistory',async(req,res)=>{
    try{
        const userEmail=req.query.userEmail;
  
        const sql=`select * from workhour where user_userEmail='${userEmail}' order by loginTime desc`;
  
        const [rows]=await con.query(sql);
  
        return res.status(200).json({
            success:true,
            workInfo:rows
        });
    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
  });


  //직원 급여 업데이트
  router.get('/updateSalary',async(req,res)=>{
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


 //직원 급여 지불처리
 router.get('/payForWage',async(req,res)=>{
    try{
       const userEmail=req.query.userEmail;
       const minus=req.query.payPrice;

       const sql=`insert into account values(date(now()),0,${minus},${minus},0) on duplicate key 
       update minusTotal=minusTotal+${minus}, wageMinus=wageMinus+${minus}`;
       const sql2=`delete from workhour where user_userEmail='${userEmail}'`;

       const [rows]=await con.query(sql);
       const [rows2]=await con.query(sql2);
     
       return res.status(200).json({success:true});
    }catch(err){
        console.log(err);
        res.send({success:false});
    }
});