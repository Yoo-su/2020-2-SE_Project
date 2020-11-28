const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.post('/',async(req,res)=>{

    try{
    const tableId=req.body.tableId;
   const content=req.body.content;
   const total=req.body.total;

    const sql=`update sicktak set isEmpty='0' where sicktakId=${tableId}`; //테이블 empty변경

   if(tableId!==0){
    const [rows1]=await con.query(sql);
   }

   let randId=0;
   const uniqueOrderSql=`select * from customerorder where orderId=${randId}`;
   while(true){
    randId=Math.random()*(1200-1000)+1000;
    const [aleadyExist]=await con.query(uniqueOrderSql);
    if(aleadyExist.length===0)break;
   }
   

   const sql2=`insert into customerorder values (${randId},'cooking',${total},${tableId},now(),'-')`;

   const [rows2]=await con.query(sql2);
 
   let randId2=0;
   for(let i=0;i<content.length;i++){
    while(true){
      randId2=Math.random()*(20000-10000)+10000;
      const [aleadyExist2]=await con.query(`select * from ordercontent where contentId=${randId2}`);
      if(aleadyExist2.length===0)break;
    }
    const sql3=`insert into ordercontent values(${randId2},${randId},'${content[i].menuName}')`;
    const [rows3]=await con.query(sql3);
   }
   
   return res.status(200).json({success:true}); 
}catch(err){
    console.log(err);
    return res.send({success:false});
}

});

module.exports=router;