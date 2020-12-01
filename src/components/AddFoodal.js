import React,{useState} from 'react';
import {Form,Button,Modal} from 'react-bootstrap';
import axios from 'axios';

function AddFoodal({show,setShow}){
    const [menuImg,setMenuImg]=useState('');
    const [menuName,setMenuName]=useState('');
    const [menuPrice,setMenuPrice]=useState(-1);
    const [stockPrice,setStockPrice]=useState(-1);
    
    function handleImg(e){setMenuImg(e.target.files);}

    function handleMenuName(e){setMenuName(e.target.value);}

    function handleMenuPrice(e){setMenuPrice(e.target.value);}

    function handleStockPrice(e){setStockPrice(e.target.value);}
  
    return(
        <div>
            <Modal
             show={show}
             onHide={setShow}
            >
             <Modal.Header><b style={{fontSize:"30px"}}>메뉴 추가</b></Modal.Header>
              <Modal.Body>
                <Form>
                    <b>메뉴 이미지</b><br></br>
                    <Form.Group>
                       <Form.File onChange={handleImg}></Form.File>     
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                     <Form.Label><b>메뉴명</b></Form.Label>
                     <Form.Control type="text" placeholder="메뉴명을 입력하세요 .." onChange={handleMenuName}/>
                   </Form.Group>

                   <Form.Group controlId="formBasicPassword">
                       <Form.Label><b>판매액</b></Form.Label>
                      <Form.Control type="number" placeholder="메뉴 가격을 입력하세요.." onChange={handleMenuPrice}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                       <Form.Label><b>재료비</b></Form.Label>
                      <Form.Control type="number" placeholder="재료비를 입력하세요.." onChange={handleStockPrice}/>
                </Form.Group>
                </Form>
             </Modal.Body> 
             <Modal.Footer>
                 <Button variant="danger" onClick={setShow}>cancle</Button>
                 <Button variant="primary" onClick={()=>{
                     function addMenu(){
                         const formData=new FormData();
                         formData.append('menuImg',menuImg[0]);
                         formData.append('menuName',menuName);
                         formData.append('menuPrice',menuPrice);
                         formData.append('stockPrice',stockPrice);
                         axios.post('http://localhost:3002/api/addMenu',formData).then(res=>{
                             if(res.data.success===true){
                                 alert('메뉴 추가가 완료되었습니다!');
                                 window.location.reload();
                             }
                             else console.log('failed');})
                     }
                     if(menuImg===''||menuName===''||menuPrice<0||stockPrice<0){
                         alert('입력정보를 확인해주세요');
                     }
                     else{
                        addMenu();
                     }
                     }}>추가!</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddFoodal;