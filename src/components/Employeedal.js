import React,{useState} from 'react';
import {Button, Modal,Form} from 'react-bootstrap';
import axios from "axios";
import "./Employeedal.css";

function Employeedal({show,setShow}){
  const [newEmail,setEmail]=useState('');
  const [newNickname,setNickname]=useState('');
  const [newPassword,setPassword]=useState('');
  const [newWage,setWage]=useState(0);
  const [newRole,setRole]=useState('');
  const [newRole2,setRole2]=useState('');

  const handleEmail=(e)=>{setEmail(e.target.value);}
  const handleNickname=(e)=>{setNickname(e.target.value);}
  const handlePassword=(e)=>{setPassword(e.target.value);}
  const handleWage=(e)=>{setWage(e.target.value);}
  const handleRole=(e)=>{setRole(e.target);}
  const handleRole2=(e)=>{setRole2(e.target)}

    return(
    <div id="addEmpDal">
        <Modal
             show={show}
             onHide={setShow}
            >
             <Modal.Header><b style={{fontSize:"30px"}}>직원 추가</b></Modal.Header>
              <Modal.Body>
                <Form>
                   <Form.Group controlId="formBasicName">
                     <Form.Label><b>직원 닉네임</b></Form.Label>
                     <Form.Control type="text" placeholder="Enter name.."  onChange={handleNickname}/>
                   </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                     <Form.Label><b>직원 이메일</b></Form.Label>
                     <Form.Control type="text" placeholder="Enter email.." onChange={handleEmail}/>
                   </Form.Group>

                   <Form.Group controlId="formBasicPassword">
                       <Form.Label><b>직원 비밀번호</b></Form.Label>
                      <Form.Control type="text" placeholder="Enter pw.." onChange={handlePassword}/>
                   </Form.Group>
                   <Form.Group controlId="formBasicPay">
                     <Form.Label><b>직원 시급</b></Form.Label>
                     <Form.Control type="number" placeholder="Enter pay.." onChange={handleWage}/>
                   </Form.Group>
                   <Form.Group controlId="formBasicPay">
                     <Form.Label>직원역할</Form.Label>
                     <Form.Check label="요리사" value="요리사" onChange={handleRole}></Form.Check> 
                     <Form.Check label="점원" value="점원" onChange={handleRole2}></Form.Check>
                   </Form.Group>
                </Form>
             </Modal.Body> 
             <Modal.Footer>
                 <Button variant="danger" onClick={setShow}>cancle</Button>
                 <Button variant="primary" onClick={()=>{
                   if(newRole.checked&&newRole2.checked){
                     alert('직원의 역할은 하나만 골라주세요');
                   }else{
                     axios.post('http://localhost:3002/api/newWorker',{
                       userEmail:newEmail,
                       nickName:newNickname,
                       password:newPassword,
                       wage:newWage,
                       role:newRole.checked?2:1
                     }).then(res=>{
                       if(res.data.success===true){
                         alert('직원 추가가 완료되었습니다!');
                         window.location.reload();
                       }else alert('오류발생');
                     })
                   }
                 }}>Add!</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Employeedal;