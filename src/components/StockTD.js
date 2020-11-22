import React,{useState} from 'react';
import {Button} from 'react-bootstrap';

function StockTD({stockRemain}){
   const [stockInput,setStockInput]=useState(false);
   return(
     <>
      {!stockInput?(<>
         {stockRemain}개&nbsp;<Button variant="info" size="sm" onClick={()=>{setStockInput(!stockInput);}}>변경</Button>
      </>):(<>
        <input type="number"></input>&nbsp;<Button size="sm">적용</Button>&nbsp;<Button size="sm" variant='secondary' onClick={()=>{
            setStockInput(!stockInput);
        }}>취소</Button>
      </>)}
     </>
 );
}

export default StockTD;