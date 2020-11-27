import React,{useState} from 'react';
import {Form,Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import fs from 'fs';

function AddFoodal({show,setShow}){
    const [menuImg,setMenuImg]=useState('');
    const [menuName,setMenuName]=useState('');
    const [menuPrice,setMenuPrice]=useState('');
    
    function handleImg(e){
        setMenuImg(e.target.files);
    }

    function handleMenuName(e){
      setMenuName(e.target.value);
      console.log(menuName);
    }

    function handleMenuPrice(e){
        setMenuPrice(e.target.value);
    }
  
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
                       <Form.File onChange={handleImg}></Form.File>     
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                     <Form.Label>Food Name</Form.Label>
                     <Form.Control type="text" placeholder="Enter Food Name" onChange={handleMenuName}/>
                   </Form.Group>

                   <Form.Group controlId="formBasicPassword">
                       <Form.Label>Food Price</Form.Label>
                      <Form.Control type="number" placeholder="Food Price" onChange={handleMenuPrice}/>
                </Form.Group>
                </Form>
             </Modal.Body> 
             <Modal.Footer>
                 <Button variant="danger" onClick={setShow}>cancle</Button>
                 <Button variant="primary" onClick={()=>{
                     console.log(typeof(menuImg));
                     function addMenu(){
                         const formData=new FormData();
                         formData.append('menuImg',menuImg[0]);
                         formData.append('menuName',menuName);
                         formData.append('menuPrice',menuPrice);
                         axios.post('http://localhost:3002/api/addMenu',formData).then(res=>{
                             if(res.data.success===true){
                                 alert('메뉴 추가가 완료되었습니다!');
                                 window.location.reload();
                             }
                             else console.log('failed');})
                     }
                     addMenu();
                     }}>Add!</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddFoodal;