import React,{useState,useEffect} from 'react';
import {Table,Button} from 'react-bootstrap';
import StockTD from '../components/StockTD';
import axios from "axios";
import "./ManageStock.css";

function ManageStock(){
    const [menu,setMenu]=useState([]);
    let number=1;

    useEffect(()=>{
       axios.get('http://localhost:3002/api/menu').then(res=>{
           if(res.data.success===true){
               setMenu(res.data.menu);
           }
       })
    },[]);
    return(
        <div id="stockPage">
            <div id="stockPageTitle">
            <b style={{fontSize:"35px"}}>재고관리</b>
            </div><br></br>
           <Table striped bordered hover>
              <thead>
               <tr>
                <th>재고id</th>
                <th>재고명</th>
                <th style={{width:"25%"}}>남은수량</th>
                <th>가격</th>
                </tr>
              </thead>
              <tbody>
              {menu.map(one=>(
               <tr key={one.menuName}>
                   <td>{number++}</td>
                   <td>{one.menuName}</td>
                   <td><StockTD menuName={one.menuName} stockRemain={one.remainStock} stockPrice={one.stockPrice}></StockTD></td>
                   <td>{one.stockPrice}원</td>
               </tr>
          ))}
             </tbody>
          </Table>
        </div>
    );
}

export default ManageStock;