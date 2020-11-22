import React,{useState,useEffect} from "react";
import "./Order.css";
import tablesj from "../testApi/tables.json";
import takeOutOj from "../testApi/takeOutOrders.json";
import Table from "../components/Table";
import TakeOut from "../components/TakeOut";
import TakeOutOrders from "../components/TakeOutOrders";
import TestFoods from "../testApi/foods.json";
import io from "socket.io-client";
import axios from "axios";

function Order(){
  /* Order.js 정리한다. 컴포넌트 마운트될 때 딱 한번 서버로부터 식탁들, 테이크아웃 주문들, 메뉴정보 불러오도록
  하고 소켓을 'cook' 이벤트에 대해 응답하도록 설정해서 이벤트 발생 시 서버로부터 테이크아웃 주문들만 새로
  가져오도록 설계한다. 식탁이나 메뉴정보는 실시간 반영이 필요한건 아니니 새로고침한번 하면 가져오게 해도 된다.
  식탁데이터 전용 axios, 테이크아웃주문 axios, 메뉴정보 axios 각각 만들어서 컴포넌트 마운트될 땐 axios.all을 통해
  가져오고 'cook'이벤트 발생시엔 테이크아웃 주문 axios만 요청해서 state지정해준다.  */

  const [tables,setTables]=useState([]);
  const [takeOutOrders,setTakeOutOrders]=useState([]);
  const [menus,setMenus]=useState([]);
  
  async function bringDatas(){
    setTables(tablesj.tables);
    setTakeOutOrders(takeOutOj.takeOutOrders);
    console.log("테이블과 테이크아웃 setState완료");
  };

  //const socket=io(""); 
  useEffect(()=>{
    console.log("Order.js 마운트");
    bringDatas();
  },[]);

    return(
      <div id="order">
         <div id="tables">
             {tables.map(table=>(
               <span id="table" key={table.id}>
                <Table tableId={table.name} TestFoods={TestFoods}></Table>
               </span>
              ))}
         </div>
         <div id="takeOut">
           <TakeOut tableId={"TakeOut"}></TakeOut><br></br><br></br>
           <div id="toOrders">
           {takeOutOrders.map(tOO=>(
             <TakeOutOrders key={tOO.id} orderNum={tOO.orderNum} foods={tOO.foods} state={tOO.state}></TakeOutOrders>
           ))}
          </div>
         </div>
      </div>
    );
}

export default Order;
