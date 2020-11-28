const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
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

module.exports=router;