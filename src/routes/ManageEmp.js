import React,{useState,useEffect} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import EmpWarning from '../components/EmpWarning';
import "./ManageEmp.css";

function ManageEmp({location}){
    const emp=location.state;
    const [salary,setSalary]=useState(emp.wage);
    const [showInput,setShowInput]=useState(true);
    const [newSalary,setNewSalary]=useState(0);
    const [warningModal,setWarningModal]=useState(false);
    const [workTime,setWorkTime]=useState('');
    const [payPrice,setPayPrice]=useState(0);
    

   function bringMoney(){
     axios.get('http://localhost:3002/api/empDetail',{params:{email:emp.email,wage:emp.wage}}).then(res=>{
       if(res.data.success===true){
          setWorkTime(res.data.workTime);
          setPayPrice(res.data.payPrice);
       }else{alert('오류발생')};
     })
   }

    useEffect(()=>{
      bringMoney();
    },[]);

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
              <Button style={{float:"right",marginLeft:"5px"}} onClick={()=>{window.location.href="#ManageEmp"}}>돌아가기</Button>
              <Button variant="danger" style={{float:"right"}} onClick={()=>{
                  setWarningModal(true);
              }}>삭제</Button>
              <EmpWarning show={warningModal} setShow={warningOff} userEmail={emp.email}></EmpWarning>
            </div>
          <br></br>
          <div id="empDetailContent">
          <b style={{borderBottom:"2px solid #99aab5"}}>●역할: {emp.role===1?("점원"):("요리사")}</b><br></br><br></br>
          <b style={{borderBottom:"2px solid #99aab5"}}>●이메일: {emp.email}</b><br></br><br></br>

          <span id="aboutSalary">

            {!showInput?(<>
            <b style={{borderBottom:"2px solid #99aab5"}}>●시급:</b>&nbsp;
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
              if(newSalary<0)alert('변경할 시급을 확인해주세요');
              else{
              updateSalary();
              setShowInput(!showInput);
              setSalary(newSalary);
              setNewSalary(0);}
            }}>적용</Button>
            <Button variant='secondary' onClick={()=>{
              setShowInput(!showInput);
            }}>취소</Button><br></br>
            </>):(<>
              <b style={{borderBottom:"2px solid #99aab5"}}>●시급: {salary}원</b>
              <Button variant="warning" size="sm" style={{marginLeft:"20px",paddingBottom:"5px"}} onClick={()=>{setShowInput(!showInput)}}>시급변경</Button>
            <br></br></>)}
          </span>

          <br></br>
            <b style={{borderBottom:"2px solid #99aab5"}}>●지불할 임금 액수: {payPrice}원</b>
            <Button variant="warning" size="sm" style={{marginLeft:"20px",paddingBottom:"5px"}} onClick={()=>{
              function payforWage(){
                axios.get('http://localhost:3002/api/payForWage',{params:{userEmail:emp.email,payPrice:payPrice}}).then(res=>{
                  if(res.data.success===true){
                    setPayPrice(0);
                    alert('임금지불 완료')}
                    else{alert('오류발생');}
                })
              }
              payforWage();
            }}>지불</Button>
          </div>
          </div>
    </div>
   );
}

export default ManageEmp;