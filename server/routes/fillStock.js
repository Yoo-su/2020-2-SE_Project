const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    try{
    const menuName=req.query.menuName;
    const newAmount=req.query.amount;
    const stockPrice=req.query.stockPrice;
    const minus=newAmount*stockPrice;
    console.log(minus);

    const sql=`update menu set remainStock=remainStock+${newAmount} where menuName='${menuName}'`;
    const sql2=`insert into account values(date(now()),0,${minus}) on duplicate key update minusTotal=minusTotal+${minus}`

    const [rows]=await con.query(sql);
    const [rows2]=await con.query(sql2);
    return res.status(200).json({success:true});

    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
});

module.exports=router;