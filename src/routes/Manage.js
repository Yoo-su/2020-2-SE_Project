import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Button,Table} from 'react-bootstrap';
import axios from 'axios';
import Employeedal from "../components/Employeedal";
import "./Manage.css";

function Manage(){
 const [ants,setAnts]=useState([]);
 const [showAddEmp,setShowAddEmp]=useState(false);
 let number=1;

 const addEmpModalOff=()=>{
   setShowAddEmp(false);
 }

 useEffect(()=>{
   axios.get('http://localhost:3002/api/allWorkers').then(res=>{
     if(res.data.success===true){
       setAnts(res.data.users);
     }else{console.log('failed');}
   })
 },[])
 return(
     <div id="WorkerList">
         <div id="manageContent">
         <b id="mwTitle">직원 목록</b><Button style={{float:"right"}} onClick={()=>{
           setShowAddEmp(!showAddEmp);
         }}>직원 추가</Button>
         <Employeedal show={showAddEmp} setShow={addEmpModalOff}></Employeedal>
         <div id="workerList">
             <br></br>
             <Table striped borderless hover variant="dark" style={{borderRadius:"10px"}}>
              <thead>
               <tr>
                <th>-</th>
                <th>직원명</th>
                <th>이메일</th>
                <th>역할</th>
                <th>시급</th>
                <th>-</th>
                </tr>
              </thead>
              <tbody>
                {ants.map(ant=>(
                 <tr key={ant.userEmail}>
                  <td>{number++}</td>
                  <td>{ant.nickName}</td>
                  <th>{ant.userEmail}</th>
                  <td>{ant.role===1?("점원"):("요리사")}</td>
                  <td>{ant.hourWage}원</td>
                  <td><Link to={{
                    pathname:`/ManageEmp/${ant.nickName}`,
                    state:{
                      name:ant.nickName,
                      role:ant.role,
                      wage:ant.hourWage,
                      email:ant.userEmail
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