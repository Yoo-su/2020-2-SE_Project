import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import "./ManageEmp.css";

function ManageEmp({location}){
    const emp=location.state;
   return(
    <div id="aboutEmp">
        <div id="detailContent">
            <div id="empDetailTitle">
              <b style={{fontSize:"30px"}}>직원명: {emp.name}</b>
              <Button variant="danger" size="sm" style={{float:"right"}}>삭제</Button>
            </div>
          <br></br>
          <b style={{fontSize:"20px"}}>역할: {emp.role===1?("점원"):("요리사")}</b><br></br>
          <b style={{fontSize:"20px"}}>이메일: {emp.email}</b><br></br>
          <b style={{fontSize:"20px"}}>시급: {emp.pay}</b> 
          </div>
    </div>
   );
}

export default ManageEmp;