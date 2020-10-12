import React,{useState} from 'react';
import {Button,Table} from 'react-bootstrap';
import workers from "../testApi/Workers.json";
import Employeedal from "../components/Employeedal";
import "./Manage.css";

function Manage(){
 const [ants,setants]=useState(workers.Workers);
 const [show,setShow]=useState(false);

 const modalOff=()=>{
   setShow(false);
 }
 return(
     <div id="WorkerList">
         <div id="manageContent">
         <b id="mwTitle">직원 목록</b><Button style={{float:"right"}} onClick={()=>{
           setShow(!show);
         }}>직원 추가</Button>
         <Employeedal show={show} setShow={modalOff}></Employeedal>
         <br></br>
         <div id="workerList">
             <br></br>
             <Table striped borderless hover variant="dark" style={{borderRadius:"10px"}}>
              <thead>
               <tr>
                <th>id</th>
                <th>직원명</th>
                <th>역할</th>
                <th>시급</th>
                </tr>
              </thead>
              <tbody>
                {ants.map(ant=>(
                 <>
                 <tr>
                  <td>{ant.id}</td>
                  <td>{ant.name}</td>
                  <td>{ant.role===1?("점원"):("요리사")}</td>
                  <td>{ant.pay}원</td>
                 </tr>
                 </>))}
              </tbody>
          </Table>
          </div>
        </div>  
     </div>
 );
}

export default Manage;