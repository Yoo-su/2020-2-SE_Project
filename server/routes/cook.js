import { Router, json } from "express";
import con from "./database";

//쿠킹 관련 라우터
const router = Router();
router.use(json());

//점원으로부터 접수된 모든 주문 조회
router.get('/allOrders',async(req,res)=>{
    try{
    const sql=`select * from customerorder where state='cooking' order by receiveTime asc`;
    const [rows]=await con.query(sql);
    

    return res.status(200).json({
       success:true,
       order:rows
    });
    
    }catch(err){
        res.send({success:false});
    }
});

module.exports=router;