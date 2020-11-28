import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from "axios";

function StockTD({menuName,stockRemain,stockPrice}){
  const [amount,setAmount]=useState(stockRemain);
   const [stockInput,setStockInput]=useState(false);
   const [newAmount,setNewAmount]=useState(0);

   function handleAmountChange(e){
     setNewAmount(e.target.value);
   };

   return(
     <>
      {!stockInput?(<>
         {amount}개&nbsp;<Button variant="info" size="sm" onClick={()=>{setStockInput(!stockInput);}}>추가</Button>
      </>):(<>
        <input type="number" placeholder="추가할 수량 입력.." onChange={handleAmountChange}></input>&nbsp;<Button size="sm" onClick={()=>{
          function fillStock(){
            if(newAmount<0)alert('추가 수량을 확인해주세요');
            else{
            axios.get('http://localhost:3002/api/fillStock',{params:{menuName:menuName,amount:parseInt(newAmount),stockPrice:parseInt(stockPrice)}}).then(res=>{
              if(res.data.success===true){
                console.log('재고 추가 완료');
                setAmount(parseInt(amount)+parseInt(newAmount));
              }
              else{console.log("재고 업데이트 실패");}
            })
          }}
          fillStock();
          setNewAmount(0);
          setStockInput(!stockInput);
        }}>완료</Button>&nbsp;<Button size="sm" variant='secondary' onClick={()=>{
            setStockInput(!stockInput);
        }}>취소</Button>
      </>)}
     </>
 );
}

export default StockTD;