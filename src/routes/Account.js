import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import './Account.css';

function Account(){
    const [accountInfo,setAccountInfo]=useState([]);
    const [monthly,setMonthly]=useState(0);

    function bringAccount(){
        axios.get('http://localhost:3002/api/account').then(res=>{
            if(res.data.success===true){
                setAccountInfo(res.data.account);
                setMonthly(res.data.monthlySoon);
            }else{alert('오류발생');window.location.href='#';}
        })
    }
    useEffect(()=>{
       bringAccount();
    },[]);
    return(
        <div id="accountPage">
            <div id="accountContent">
             <div id="accountTitle">
               <b style={{fontSize:"35px"}}>회계정보</b>
            </div>
            <div style={{fontSize:"18px",marginBottom:"5px",float:"right"}}> 
            <b>●이번달 순이익:&nbsp;{monthly}&nbsp;원</b>
            </div>
          <div>
          <Table striped bordered hover>
              <thead>
               <tr>
                <th>날짜</th>
                <th>총매출액</th>
                <th>총지출액</th>
                <th>순이익</th>
                <th>임금지불액</th>
                <th>재료구매액</th>
                </tr>
              </thead>
              <tbody>
              {accountInfo.map(account=>(
                 <tr key={account.dateInfo}>
                  <td>{account.dateInfo}</td>
                  <td>{account.salesTotal}원</td>
                  <td>{account.minusTotal}원</td>
                  <td>{account.salesTotal-account.minusTotal}원</td>
                  <td>{account.wageMinus}원</td>
                  <td>{account.stockMinus}원</td>
                 </tr>))}
              </tbody>
          </Table>
            </div>
          </div>
        </div>
    );
}

export default Account;