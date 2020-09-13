import React,{useState, useEffect} from "react";
import axios from "axios";
import "./Order.css";
import tables from "../testApi/tables.json";
import Table from "../components/Table";
import { Button } from "react-bootstrap";


function Order(){
    return(
      <div id="order" style={{textAlign:"center"}}>
      <div id="orderContent" style={{backgroundColor:"#FFFFFF",borderRadius:"20px"}}>
           {tables.tables.map(table=>(
               <span className="tables" key={table.id}>
                <Table tableName={table.name}></Table>
               </span>
           ))}
      </div>
      <Button variant="info">테이블 추가</Button>
      </div>
    );
}

export default Order;
