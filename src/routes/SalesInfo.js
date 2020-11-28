import React,{useState,useEffect} from 'react';
import {Table} from "react-bootstrap";
import axios from "axios";
import "./SalesInfo.css";

function Account(){
    const [salesHistory,setSalesHistory]=useState([]);
    const [waitAvg,setWaitAvg]=useState('');
    const [spendAvg,setSpendAvg]=useState('');
    const [todayTableSales,setTTS]=useState(0);
    const [todayTakeOutSales,setTTOS]=useState(0);
    let number=1;

    useEffect(()=>{
       axios.get('http://localhost:3002/api/aboutSales').then(res=>{
           if(res.data.success===true){
               setSalesHistory(res.data.salesInfo);
               setTTS(res.data.todayTableSales);
               setTTOS(res.data.todayTakeOutSales);
               const date=new Date(null);
               const date2=new Date(null);
               date.setSeconds(res.data.waitAvg);
               date2.setSeconds(res.data.spendAvg);
               setWaitAvg(date.toISOString().substr(11,8));
               setSpendAvg(date.toISOString().substr(11,8));
               
           }else{ console.log('failed');}
       })
    },[])

    return(
        <div id="salesInfo">
            <div id="salesContent">
                <div id="saleSTitle">
                    <div style={{fontSize:"35px"}}>
                     <b>판매정보</b>
                    </div>
                    <div style={{fontSize:"18px",marginBottom:"5px",float:"right",color:"#2F66A9"}}>
                 <b>●평균 주문 준비시간:{waitAvg}&nbsp;&nbsp;&nbsp; ●평균 고객 매장이용시간:{spendAvg}</b>&nbsp;&nbsp;&nbsp;
                 <b>●금일 테이블 판매 수: {todayTableSales}&nbsp;&nbsp; ●금일 테이크아웃 판매 수: {todayTakeOutSales} </b>
                 </div>
              </div>
            <Table striped bordered hover>
              <thead>
               <tr>
                <th>-</th>
                <th>주문타입</th>
                <th>총액</th>
                <th>주문시간</th>
                <th>준비시간</th>
                <th>결제시간</th>
                <th>주문메뉴</th>
                </tr>
              </thead>
              <tbody>
                {salesHistory.map(sale=>(
                 <tr key={sale.serialKey}>
                  <td>{number++}</td>
                  <td>{sale.orderType===0?("테이크아웃"):(<>{sale.orderType}번 테이블</>)}</td>
                  <td>{sale.orderPrice}원</td>
                  <td>{sale.orderTime}</td>
                  <td>{sale.cookTime}</td>
                  <td>{sale.payTime}</td>
                <td>{sale.contentInOrder}</td>
                 </tr>))}
              </tbody>
          </Table>
            </div>
        </div>
    );
}

export default Account;