import React,{useState, useEffect} from "react";
import axios from "axios";
import "./Order.css";
import tablesj from "../testApi/tables.json";
import Table from "../components/Table";
import TakeOutOrder from "../components/TakeOutOrder";
import { Button } from "react-bootstrap";


function Order(){
  const [tables,setTables]=useState(tablesj.tables);
    return(
      <div id="order">
      <div id="tables" style={{backgroundColor:"#FFFFFF",borderRadius:"20px"}}>
      <TakeOutOrder id="takeOut" tableName={"TakeOut"}></TakeOutOrder>
      <Button id="addTable" style={{position:"relative"}}variant="info">테이블 추가</Button>
      <br></br>
           {tables.map(table=>(
               <span className="tables" key={table.id}>
                <Table tableName={table.name}></Table>
               </span>
           ))}
      </div>
      </div>
    );
}

export default Order;
