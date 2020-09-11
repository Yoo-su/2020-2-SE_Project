import React,{useState, useEffect} from "react";
import {Button,Modal} from "react-bootstrap";
import axios from "axios";
import "./Home.css";
import tables from "../testApi/tables.json";
import Table from "../components/Table";


function Home(){
    return(
      <div id="Home" style={{backgroundColor:"#FFFFFF",borderRadius:"20px"}}>
           {tables.tables.map(table=>(
               <span className="tables" key={table.id}>
                <Table tableName={table.name}></Table>
               </span>
           ))}
      </div>
    );
}

export default Home;
