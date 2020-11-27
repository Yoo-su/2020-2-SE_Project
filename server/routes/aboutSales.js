const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
   try{
       const sql=`select * from sales order by orderTime desc`;
       const sql2=`select avg(timediff(cookTime,orderTime)) as waitTime from sales;`;
       const sql3=`select avg(timediff(payTime,orderTime)) as spendTime from sales where orderType not in(0)`;

       const todayTableSalesCount=`select count(*) as ttsc from sales where orderType not in(0) and datediff(now(),orderTime)=0`;
       const todayTakeOutSalesCount=`select count(*) as ttosc from sales where orderType in(0) and datediff(now(),orderTime)=0`;
       const dailyTotal=`select sum(orderPrice) as dT from sales where datediff(now(),orderTime)=0`;
       const monthlyTotal=`select sum(orderPrice) as mT from sales where month(now())-month(orderTime)=0`;

       const [rows]=await con.query(sql);
       const [rows2]=await con.query(sql2);
       const [rows3]=await con.query(sql3);
       const [rows4]=await con.query(todayTableSalesCount);
       const [rows5]=await con.query(todayTakeOutSalesCount);
       const [rows6]=await con.query(dailyTotal);
       const [rows7]=await con.query(monthlyTotal);

       return res.status(200).json({
           success:true,
           salesInfo:rows,
           waitAvg:rows2[0].waitTime,
           spendAvg:rows3[0].spendTime,
           todayTableSales:rows4[0].ttsc,
           todayTakeOutSales:rows5[0].ttosc,
           dailyTotal:rows6[0].dT,
           monthlyTotal:rows7[0].mT
        })

   }catch(err){
       console.log(err);
       return res.send({success:true});
   }
});

module.exports=router;