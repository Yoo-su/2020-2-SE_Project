import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import {Button,Table} from 'react-bootstrap';
import workers from "../testApi/Workers.json";
import Employeedal from "../components/Employeedal";
import "./Manage.css";

function Manage(){
 const [ants,setAnts]=useState(workers.Workers);
 const [showAddEmp,setShowAddEmp]=useState(false);

 const addEmpModalOff=()=>{
   setShowAddEmp(false);
 }
 return(
     <div id="WorkerList">
         <div id="manageContent">
         <b id="mwTitle">직원 목록</b><Button style={{float:"right"}} onClick={()=>{
           setShowAddEmp(!showAddEmp);
         }}>직원 추가</Button>
         <Employeedal show={showAddEmp} setShow={addEmpModalOff}></Employeedal>
         <br></br>
         <div id="workerList">
             <br></br>
             <Table striped borderless hover variant="dark" style={{borderRadius:"10px"}}>
              <thead>
               <tr>
                <th>id</th>
                <th>직원명</th>
                <th>이메일</th>
                <th>역할</th>
                <th>시급</th>
                <th>-</th>
                </tr>
              </thead>
              <tbody>
                {ants.map(ant=>(
                 <tr key={ant.id}>
                  <td>{ant.id}</td>
                  <td>{ant.name}</td>
                  <th>{ant.email}</th>
                  <td>{ant.role===1?("점원"):("요리사")}</td>
                  <td>{ant.pay}원</td>
                  <td><Link to={{
                    pathname:`/Manage/${ant.email}`,
                    state:{
                      id:ant.id,
                      name:ant.name,
                      role:ant.role,
                      pay:ant.pay,
                      email:ant.email
                    }
                    }}><Button size="sm">관리</Button></Link></td>
                 </tr>))}
              </tbody>
          </Table>
          </div>
        </div>  
     </div>
 );
}

export default Manage;