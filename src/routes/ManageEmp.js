import React,{useState,useEffect} from 'react';
import {Button,Table} from 'react-bootstrap';
import axios from 'axios';
import EmpWarning from '../components/EmpWarning';
import "./ManageEmp.css";

function ManageEmp({location}){
    const emp=location.state;
    const [salary,setSalary]=useState(emp.wage);
    const [showInput,setShowInput]=useState(true);
    const [newSalary,setNewSalary]=useState(0);
    const [warningModal,setWarningModal]=useState(false);
    const [workInfo,setWorkInfo]=useState([]);
    const [payPrice,setPayPrice]=useState(0);
    let number=1;
    

   function bringMoney(){
     axios.get('http://localhost:3002/api/empDetail',{params:{email:emp.email,wage:emp.wage}}).then(res=>{
       if(res.data.success===true){
          setPayPrice(res.data.payPrice);
       }else{alert('오류발생')};
     })
   }
   function bringWorkInfo(){
    axios.get('http://localhost:3002/api/workHistory',{params:{userEmail:emp.email}}).then(res=>{
      if(res.data.success===true){
         setWorkInfo(res.data.workInfo);
      }else{alert('오류발생')};
    })
   }

    useEffect(()=>{
      bringMoney();
      bringWorkInfo();
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
              <Button variant="secondary" style={{float:"right",marginLeft:"5px"}} onClick={()=>{window.location.href="#ManageEmp"}}>돌아가기</Button>
              <Button variant="danger" style={{float:"right"}} onClick={()=>{
                  setWarningModal(true);
              }}>삭제</Button>
              <EmpWarning show={warningModal} setShow={warningOff} userEmail={emp.email}></EmpWarning>
            </div>
          <br></br>
          <div id="empDetailContent">
          <label style={{borderBottom:"2px solid #99aab5"}}>●역할: {emp.role===1?("점원"):("요리사")}</label><br></br>
          <label style={{borderBottom:"2px solid #99aab5"}}>●이메일: {emp.email}</label><br></br>

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
              if(newSalary<0||newSalary==='-0')alert('변경할 시급을 확인해주세요');
              else{
              updateSalary();
              setShowInput(!showInput);
              setSalary(newSalary);
              setNewSalary(0);}
            }}>적용</Button>&nbsp;
            <Button variant='secondary' onClick={()=>{
              setShowInput(!showInput);
            }}>취소</Button><br></br>
            </>):(<>
              <label style={{borderBottom:"2px solid #99aab5"}}>●시급: {salary}원</label>
              <Button variant="warning" size="sm" style={{marginLeft:"20px",paddingBottom:"5px"}} onClick={()=>{setShowInput(!showInput)}}>시급변경</Button>
            <br></br></>)}
          </span>
            <label style={{borderBottom:"2px solid #99aab5"}}>●지불할 임금 액수: {payPrice}원</label>
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
              setWorkInfo([]);
            }}>지불</Button>
          </div>
          {workInfo.length>0?(
          <div id="workHistory">
            <label style={{fontSize:"25px",borderBottom:"2px solid #99aab5",color:"#2F66A9"}}>●근무 기록</label>
            <Table striped bordered hover>
            <thead>
               <tr>
                <th>-</th>
                <th>로그인 시간</th>
                <th>로그아웃 시간</th>
                <th>근무 시간</th>
                </tr>
              </thead>
              <tbody>
                {workInfo.map(info=>(
                 <tr key={info.workhourId}>
                  <td>{number++}</td>
                <td>{info.loginTime}</td>
                <td>{info.logoutTime}</td>
                <td>{info.workTime.split('.')[0]}</td>
                 </tr>))}
              </tbody>
            </Table>
          </div>):(<><label style={{fontSize:"25px",borderBottom:"2px solid #99aab5",color:"#2F66A9"}}>●근무 기록 없음</label></>)}
          </div>
    </div>
   );
}

export default ManageEmp;