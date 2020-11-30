const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

router.get('/',async(req,res)=>{
    const tableId=req.query.tableId;
    const sql=`select isEmpty from sicktak where sicktakId=${tableId}`;
    try{
        const [isEmpty]=await con.query(sql);

        if(isEmpty[0].isEmpty===0){// 빈 테이블 아닌 경우.

          const sql2=`select * from customerorder where sicktak_sicktakId=${tableId}`;
          const [orders]=await con.query(sql2);

          //상태별 분류
          let cooking=[]; let prepared=[]; let served=[]; let orderIds=[]
          for(let i=0;i<orders.length;i++){
            orderIds.push(orders[i].orderId);
            if(orders[i].state==='cooking')cooking.push(orders[i]);
            else if(orders[i].state==='prepared')prepared.push(orders[i]);
            else served.push(orders[i]);
          }

          let orderId=0; let orderPrice=0; let allContent=[]; let sql3=``;
          for(let i=0;i<orders.length;i++){
            orderId=orders[i].orderId; orderPrice=orderPrice+orders[i].totalPrice;
            sql3=`select menuName, price from menu join orderContent on menuName=menu_menuName where order_orderId=${orderId}`;
            const [rows]=await con.query(sql3);

            for(let j=0;j<rows.length;j++){
              allContent.push({menuName:rows[j].menuName,price:rows[j].price});
            }
          }
      
          let state='';
          if(prepared.length>0)state='prepared';
          else if(prepared.length===0&&cooking.length>0&&served.length>=0)state='cooking';
          else if(prepared.length===0&&cooking.length===0&&served.length>0)state='served';

          return res.status(200).json({
              empty:false,
              state:state,
              order:orderIds,
              total:orderPrice,
              content:allContent
          });
        }else if(isEmpty===1){
          return res.status(200).json({empty:true});
        }

    }catch(err){
        return res.send(err);
    }
});

module.exports=router;