import React from 'react';
import {Form,Button,Modal} from 'react-bootstrap';

function AddFoodal({show,setShow}){
    return(
        <div>
            <Modal
             show={show}
             onHide={setShow}
            >
             <Modal.Header><b style={{fontSize:"30px"}}>음식 추가</b></Modal.Header>
              <Modal.Body>
                <Form>
                    <b>Food Image</b><br></br>
                    <Form.Group>
                       <Form.File></Form.File>     
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                     <Form.Label>Food Name</Form.Label>
                     <Form.Control type="text" placeholder="Enter Food Name" />
                   </Form.Group>

                   <Form.Group controlId="formBasicPassword">
                       <Form.Label>Food Price</Form.Label>
                      <Form.Control type="number" placeholder="Food Price" />
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

export default AddFoodal;