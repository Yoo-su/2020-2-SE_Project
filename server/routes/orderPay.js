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

    let contentString="";
    const contentNames=content.map(c=>c.menuName);
    const set=new Set(contentNames)

    for(let item of set){
      const filtered=content.filter(c=>c.menuName===item);

      const itemCount=filtered.length===1?filtered[0].count:filtered.reduce(function(cur,next){
        return cur.count+next.count
      })

      contentString=contentString.concat(item).concat(`(${itemCount.toString()}) `)

      const [plusSale]=await con.query(`update menu set sales=sales+${itemCount} where menuName='${item}'`);
      const [minusStock]=await con.query(`update menu set remainStock=remainStock-${itemCount} where menuName='${item}'`);
   }

   const serialKey=GenerateSerialNumber('0000000000-0000000000');

   const findFirstOrderTime=`select receiveTime from customerorder where sicktak_sicktakId=${tableId} order by receiveTime asc`;
   const [receiveTimes]=await con.query(findFirstOrderTime);
   const firstReceive=receiveTimes[0].receiveTime;

   const findLastPreparedTime=`select preparedTime from customerorder where sicktak_sicktakId=${tableId} order by preparedTime desc`;
   const [preparedTimes]=await con.query(findLastPreparedTime);
   const lastPrepared=preparedTimes[0].preparedTime;

   const recordOrder=`insert into sales (serialKey, orderType, orderPrice, orderTime, cookTime, payTime, contentInOrder)
   values ('${serialKey}', ${tableId}, ${totalPrice}, '${firstReceive}',
   '${lastPrepared}', now(),'${contentString}')`;

   const sql=`delete from ordercontent where order_orderId in (select orderId from customerorder where sicktak_sicktakId=${tableId})`;
   const sql2=`delete from customerorder where sicktak_sicktakId=${tableId}`;
   const sql3=`update sicktak set isEmpty=1 where sicktakId=${tableId}`;
   const sql4=`insert into account values(date(now()),${totalPrice},0,0,0) on duplicate key update salesTotal=salesTotal+${totalPrice}`;

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