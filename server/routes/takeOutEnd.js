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

router.post('/',async(req,res)=>{
    try{
        const orderId=req.body.orderId;
        const serialKey=GenerateSerialNumber('0000000000-0000000000');
        const tableId=0;
        const total=req.body.price;
        const content=req.body.content;

        let contentString="";
        for(let i=0; i<content.length;i++){
          contentString=contentString+content[i].menuName+' ';
          const [plusSale]=await con.query(`update menu set sales=sales+1 where menuName='${content[i].menuName}'`);
          const [minusStock]=await con.query(`update menu set remainStock=remainStock-1 where menuName='${content[i].menuName}'`);
        }
     
        const recordOrder=`insert into sales (serialKey, orderType, orderPrice, orderTime, cookTime, payTime, contentInOrder)
            values ('${serialKey}', ${tableId}, ${total}, (select receiveTime from customerorder where orderId=${orderId}),
            (select preparedTime from customerorder where orderId=${orderId}), (select preparedTime from customerorder where orderId=${orderId}),
            '${contentString}')`;
        let sql=`delete from ordercontent where order_orderId=${orderId}`;
        const sql2=`delete from customerorder where orderId=${orderId}`;
        const sql3=`insert into account values(date(now()),${total},0,0,0) on duplicate key update salesTotal=salesTotal+${total}`;
         
        const [rows]=await con.query(recordOrder);
        const [rows2]=await con.query(sql);
        const [rows3]=await con.query(sql2);
        const [rows4]=await con.query(sql3);

        return res.status(200).json({success:true});

    }catch(err){
        console.log(err);
        return res.send({success:false});
    }
})

module.exports=router;