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
          const [ordersInOneTable]=await con.query(sql2);

          const orderId=ordersInOneTable[0].orderId;
          const orderPrice=ordersInOneTable[0].totalPrice;
          
          const sql3=`select menuName, price from menu join orderContent on menuName=menu_menuName where order_orderId=${orderId}`;

          const [orderContents]=await con.query(sql3);
 
          return res.status(200).json({
              empty:false,
              order:ordersInOneTable,
              total:orderPrice,
              content:orderContents
          })
        }else if(isEmpty===1){
          return res.status(200).json({empty:true});
        }

    }catch(err){
        return res.send(err);
    }
});

module.exports=router;