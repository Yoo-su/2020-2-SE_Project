import React,{useState} from "react";
import "./Order.css";
import tablesj from "../testApi/tables.json";
import takeOutOj from "../testApi/takeOutOrders.json";
import Table from "../components/Table";
import TakeOut from "../components/TakeOut";
import TakeOutOrders from "../components/TakeOutOrders";

function Order(){
  //할것: axios.get을 통해 테이블정보, 테이크아웃주문 정보 불러오기 구현

  const [tables,setTables]=useState(tablesj.tables);
  const [takeOutOrders,setTakeOutOrders]=useState(takeOutOj.takeOutOrders);
    return(
      <div id="order">
         <div id="tables">
             {tables.map(table=>(
               <span id="table" key={table.id}>
                <Table tableName={table.name}></Table>
               </span>
              ))}
         </div>
         <div id="takeOut">
           <TakeOut tableName={"TakeOut"}></TakeOut><br></br><br></br>
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
