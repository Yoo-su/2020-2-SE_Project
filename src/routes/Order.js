import React,{useState} from "react";
import axios from "axios";
import "./Order.css";
import tablesj from "../testApi/tables.json";
import takeOutOj from "../testApi/takeOutOrders.json";
import Table from "../components/Table";
import TakeOut from "../components/TakeOut";
import TakeOutOrders from "../components/TakeOutOrders";

function Order(){
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
           <TakeOut tableName={"TakeOut"}></TakeOut>
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
