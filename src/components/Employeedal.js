import React from 'react';
import {Button, Modal,Form} from 'react-bootstrap';
import "./Employeedal.css";

function Employeedal({show,setShow}){
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
                     <Form.Label><b>직원 이름</b></Form.Label>
                     <Form.Control type="text" placeholder="Enter name.." />
                   </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                     <Form.Label><b>직원 이메일</b></Form.Label>
                     <Form.Control type="text" placeholder="Enter email.." />
                   </Form.Group>

                   <Form.Group controlId="formBasicPassword">
                       <Form.Label><b>직원 비밀번호</b></Form.Label>
                      <Form.Control type="text" placeholder="Enter pw.." />
                   </Form.Group>
                   <Form.Group controlId="formBasicPay">
                     <Form.Label><b>직원 시급</b></Form.Label>
                     <Form.Control type="number" placeholder="Enter pay.." />
                   </Form.Group>
                   <Form.Group controlId="formBasicPay">
                     <Form.Label>직원타입</Form.Label>
                     <Form.Check label="요리사"></Form.Check> <Form.Check label="점원"></Form.Check>
                   </Form.Group>
                </Form>
             </Modal.Body> 
             <Modal.Footer>
                 <Button variant="danger" onClick={setShow}>cancle</Button>
                 <Button variant="primary">Add!</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Employeedal;