import React from 'react';
import {Button} from 'react-bootstrap';
import "./ManageEmp.css";

function ManageEmp({location}){
    const emp=location.state;
   return(
    <div id="aboutEmp">
        <div id="Content">
            <div id="empDetailTitle">
              <b>직원명: {emp.name}</b>
              <Button variant="danger"  style={{float:"right"}}>삭제</Button>
            </div>
          <br></br>
          <div id="empDetailContent">
          <b style={{borderBottom:"2px solid #99aab5"}}>역할: {emp.role===1?("점원"):("요리사")}</b><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>이메일: {emp.email}</b><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>시급: {emp.pay}원</b><Button style={{marginLeft:"20px"}}>시급변경</Button><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>총 근무시간: 1시간</b><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>지불할 임금: 150000원</b><br></br>
          </div>
          </div>
    </div>
   );
}

export default ManageEmp;