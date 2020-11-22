import React,{useState} from 'react';
import {Button} from 'react-bootstrap';

function StockTD({stockRemain}){
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