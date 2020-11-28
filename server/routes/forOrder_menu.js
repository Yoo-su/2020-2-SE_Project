const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    let sql=`select * from menu where activate=1 order by sales desc`;

    const [rows]=await con.query(sql);

    return res.status(200).json({success:true,menu:rows});

  });
  
  module.exports=router;