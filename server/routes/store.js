const express=require('express');
const con=require("./database");

//매장정보(판매, 회계) 관련 라우터
const router = express.Router();
router.use(express.json());

//판매정보 조회
router.get('/sales',async(req,res)=>{
    try{
        const sql=`select * from sales order by orderTime desc limit 200`;
        const sql2=`select sec_to_time(avg(timediff(cookTime,orderTime))) as waitTime from sales;`;
        const sql3=`select sec_to_time(avg(timediff(payTime,orderTime))) as spendTime from sales where orderType not in(0)`;
 
        const todayTableSalesCount=`select count(*) as ttsc from sales where orderType not in(0) and datediff(now(),orderTime)=0`;
        const todayTakeOutSalesCount=`select count(*) as ttosc from sales where orderType in(0) and datediff(now(),orderTime)=0`;
 
        const [rows]=await con.query(sql);
        const [rows2]=await con.query(sql2);
        const [rows3]=await con.query(sql3);
        const [rows4]=await con.query(todayTableSalesCount);
        const [rows5]=await con.query(todayTakeOutSalesCount);
 
        return res.status(200).json({
            success:true,
            salesInfo:rows,
            waitAvg:rows2[0].waitTime,
            spendAvg:rows3[0].spendTime,
            todayTableSales:rows4[0].ttsc,
            todayTakeOutSales:rows5[0].ttosc,
         })
 
    }catch(err){
        console.log(err);
        return res.send({success:true});
    }
 });

 //회계정보 조회
 router.get('/account',async(req,res)=>{
    try{
      const sql=`select * from account order by dateInfo asc`;
 
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