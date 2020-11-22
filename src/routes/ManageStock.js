import React,{useState} from 'react';
import {Table,Button} from 'react-bootstrap';
import StockTD from '../components/StockTD';
import stockj from "../testApi/stock.json";
import "./ManageStock.css";

function ManageStock(){
    const [stock,setStock]=useState(stockj.stock);
 
    return(
        <div id="stockPage">
            <div id="stockPageTitle">
            <b style={{fontSize:"35px"}}>재고관리</b>
            </div><br></br>
           <Table striped borderless hover variant="dark" style={{borderRadius:"10px"}}>
              <thead>
               <tr>
                <th>재고id</th>
                <th>재고명</th>
                <th style={{width:"25%"}}>남은수량</th>
                <th>가격</th>
                </tr>
              </thead>
              <tbody>
              {stock.map(oneStock=>(
               <tr key={oneStock.id}>
                   <td>{oneStock.id}</td>
                   <td>{oneStock.name}</td>
                   <td><StockTD stockRemain={oneStock.remain}></StockTD></td>
                   <td>{oneStock.price}원</td>
               </tr>
          ))}
             </tbody>
          </Table>
        </div>
    );
}

export default ManageStock;