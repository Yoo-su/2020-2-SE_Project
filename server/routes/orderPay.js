const { response } = require('express');
const express=require('express');
const router=express.Router();
router.use(express.json());
const con=require("./database");

function GenerateRandomNumber(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
// Generates a random alphanumberic character
function GenerateRandomChar() {
	var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
	var randomNumber = GenerateRandomNumber(0,chars.length - 1);
 
	return chars[randomNumber];
}
 
// Generates a Serial Number, based on a certain mask
function GenerateSerialNumber(mask)
{
	var serialNumber = "";
 
	if(mask != null)
	{
		for(var i=0; i < mask.length; i++)
		{
			var maskChar = mask[i];
 
			serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
		}
	}
 
	return serialNumber;
}
// Generate a new Serial Number for a given mask

router.post('/',async(req,res)=>{
  try{
   const tableId=req.body.tableId;
   const content=req.body.content;
   const totalPrice=req.body.total;
   const orderId=req.body.orderId;
   

   let contentString="";
   for(let i=0; i<content.length;i++){
     contentString=contentString+content[i].menuName+' ';
     const [plusSale]=await con.query(`update menu set sales=sales+1 where menuName='${content[i].menuName}'`);
     const [minusStock]=await con.query(`update menu set remainStock=remainStock-1 where menuName='${content[i].menuName}'`);
   }

   const serialKey=GenerateSerialNumber('0000000000-0000000000');

   const recordOrder=`insert into sales (serialKey, orderType, orderPrice, orderTime, cookTime, payTime, contentInOrder)
   values ('${serialKey}', ${tableId}, ${totalPrice}, (select receiveTime from customerorder where orderId=${orderId}),
   (select preparedTime from customerorder where orderId=${orderId}), now(),'${contentString}')`;


   const sql=`delete from ordercontent where order_orderId in (select orderId from customerorder where sicktak_sicktakId=${tableId})`;
   const sql2=`delete from customerorder where sicktak_sicktakId=${tableId}`;
   const sql3=`update sicktak set isEmpty=1 where sicktakId=${tableId}`;
   const sql4=`insert into account values(date(now()),${totalPrice},0) on duplicate key update salesTotal=salesTotal+${totalPrice}`;

   const [rows]=await con.query(recordOrder);
   const [rows2]=await con.query(sql);
   const [rows3]=await con.query(sql2);
   const [rows4]=await con.query(sql3);
   const [rows5]=await con.query(sql4);

   return res.status(200).json({success:true});
  }catch(err){
    console.log(err);
    return res.send({success:false});
  }
});

module.exports=router;