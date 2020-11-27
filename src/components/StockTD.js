import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from "axios";

function StockTD({menuName,stockRemain}){
  const [amount,setAmount]=useState(stockRemain);
   const [stockInput,setStockInput]=useState(false);
   const [newAmount,setNewAmount]=useState(0);

   function handleAmountChange(e){
     setNewAmount(e.target.value);
   };

   return(
     <>
      {!stockInput?(<>
         {amount}개&nbsp;<Button variant="info" size="sm" onClick={()=>{setStockInput(!stockInput);}}>변경</Button>
      </>):(<>
        <input type="number" onChange={handleAmountChange}></input>&nbsp;<Button size="sm" onClick={()=>{
          function fillStock(){
            axios.get('http://localhost:3002/api/fillStock',{params:{menuName:menuName,amount:newAmount}}).then(res=>{
              if(res.data.success===true){console.log('재고 업데이트 완료')}
              else{console.log("재고 업데이트 실패");}
            })
          }
          fillStock();
          setAmount(newAmount);
          setNewAmount(0);
          setStockInput(!stockInput);
        }}>적용</Button>&nbsp;<Button size="sm" variant='secondary' onClick={()=>{
            setStockInput(!stockInput);
        }}>취소</Button>
      </>)}
     </>
 );
}

export default StockTD;