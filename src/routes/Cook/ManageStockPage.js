import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import StockInfo from '../../components/Chef/StockInfo';
import axios from "axios";
import "./ManageStockPage.css";

function ManageStockPage(){
    const [menu,setMenu]=useState([]);
    let number=1;

    useEffect(()=>{
       axios.get('https://every-server.herokuapp.com/api/menu').then(res=>{
           if(res.data.success===true){
               setMenu(res.data.menu);
           }
       })
    },[]);
    return(
        <div id="stockPage">
            <div id="stockPageTitle">
            <b>재고관리</b>
            </div><br></br>
           <Table id="stockTable" striped bordered hover>
              <thead>
               <tr>
                <th>-</th>
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
                   <td><StockInfo menuName={one.menuName} stockRemain={one.remainStock} stockPrice={one.stockPrice}></StockInfo></td>
                   <td>{one.stockPrice}원</td>
               </tr>
          ))}
             </tbody>
          </Table>
        </div>
    );
}

export default ManageStockPage;