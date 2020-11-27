import React,{useState} from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';
import axios from 'axios';
import EmpWarning from '../components/EmpWarning';
import "./ManageEmp.css";

function ManageEmp({location}){
    const emp=location.state;
    const [salary,setSalary]=useState(emp.wage);
    const [salaryInput,setSalaryInput]=useState(true);
    const [newSalary,setNewSalary]=useState(0);
    const [warningModal,setWarningModal]=useState(false);

    function warningOff(){
      setWarningModal(false);
    }

    function handleInput(e){
      setNewSalary(e.target.value);
    }
   return(
    <div id="aboutEmp">
        <div id="Content">
            <div id="empDetailTitle">
              <b>직원명: {emp.name}</b>
              <Button variant="danger" style={{float:"right"}} onClick={()=>{
                  setWarningModal(true);
              }}>삭제</Button>
              <EmpWarning show={warningModal} setShow={warningOff} userEmail={emp.email}></EmpWarning>
            </div>
          <br></br>
          <div id="empDetailContent">
          <b style={{borderBottom:"2px solid #99aab5"}}>역할: {emp.role===1?("점원"):("요리사")}</b><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>이메일: {emp.email}</b><br></br><br></br>

          <span id="aboutSalary">

            {!salaryInput?(<>
            <b style={{borderBottom:"2px solid #99aab5"}}>시급:</b>&nbsp;
              <input type="number" onChange={handleInput}></input>
            &nbsp;<Button variant='info' onClick={()=>{
              function updateSalary(){
                axios.get('http://localhost:3002/api/updateSalary',{params:{newSalary:newSalary,userEmail:emp.email}}).then(res=>{
                  if(res.data.success===true){
                     alert('변경 적용되었습니다 :)');
                  }else{
                    console.log('failed');
                  }
                })
              }
              updateSalary();
              setSalaryInput(!salaryInput);
              setSalary(newSalary);
              setNewSalary(0);
            }}>적용</Button>
            <Button variant='secondary' onClick={()=>{
              setSalaryInput(!salaryInput);
            }}>취소</Button><br></br>
            </>):(<>
              <b style={{borderBottom:"2px solid #99aab5"}}>시급: {salary}원</b><Button style={{marginLeft:"20px"}} onClick={()=>{setSalaryInput(!salaryInput)}}>시급변경</Button>
            <br></br></>)}
          </span>

          <br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>총 근무시간: 1시간</b><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>지불할 임금: 150000원</b><br></br>
          </div>
          </div>
    </div>
   );
}

export default ManageEmp;