import React,{useState} from 'react';
import {Table,Button} from 'react-bootstrap';
import stockj from "../testApi/stock.json";
import "./ManageStock.css";

function ManageStock(){
    const [stock,setStock]=useState(stockj.stock);
    return(
        <div id="stockPage">
           <Table striped borderless hover variant="dark" style={{borderRadius:"10px"}}>
              <thead>
               <tr>
                <th>재고id</th>
                <th>재고명</th>
                <th>남은수량</th>
                <th>가격</th>
                </tr>
              </thead>
              <tbody>
              {stock.map(oneStock=>(
               <tr key={oneStock.id}>
                   <td>{oneStock.id}</td>
                   <td>{oneStock.name}</td>
                   <td>{oneStock.remain}개</td>
                   <td>{oneStock.price}원</td>
               </tr>
          ))}
             </tbody>
          </Table>
        </div>
    );
}

export default ManageStock;