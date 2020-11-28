import React,{useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import axios from 'axios';

function MenuCard({activate,showBtn,menuName,imgPath,price,sales,remain}){
    const [acti,setActi]=useState(activate);
    
    const card1=<Card border="gray" style={{margin:"20px", width:"200px", display:"inline-block"}}>
                 <Card.Img variant="top" src={imgPath} style={{width:"150px",height:"150px"}}></Card.Img>
                <Card.Body>
                <Card.Title>{menuName}</Card.Title>
                 <Card.Text>
                 {price}원 <br></br>
                 누적판매량: <b>{sales}</b> <br></br>
                 재고량: <b>{remain}</b><br></br>
                 {showBtn?(<Button size="sm" variant='danger'onClick={()=>{
                      function changeActivate(){
                        axios.get('http://localhost:3002/api/menuActivate',{params:{menuName:menuName,activate:0}}).then(res=>{
                            if(res.data.success===true){
                                setActi(0);
                            }else{alert('오류발생');}
                        })
                      }
                      changeActivate();
                 }}>비활성화</Button>):(<></>)}
                 </Card.Text>
                 </Card.Body>
                 </Card>;
    const card2= <Card border="gray" style={{margin:"20px",zIndex:"1", width:"200px", display:"inline-block"}}>
                  <Card.Img variant="top" src={imgPath} style={{width:"150px",height:"150px",opacity:"0.5"}}></Card.Img>
                  <Card.Body>
                   <Card.Title style={{opacity:"0.5"}}>{menuName}</Card.Title>
                   <Card.Text>
                    <span style={{opacity:"0.5"}}>
                    {price}원 <br></br>
                     누적판매량: <b>{sales}</b> <br></br>
                     재고량: <b>{remain}</b><br></br>
                    </span>
                    {showBtn?(<Button size="sm" variant='info' onClick={()=>{
                      function changeActivate2(){
                        axios.get('http://localhost:3002/api/menuActivate',{params:{menuName:menuName,activate:1}}).then(res=>{
                            if(res.data.success===true){
                                setActi(1);
                            }else{alert('오류발생');}
                        })
                      }
                      changeActivate2();
                 }}>활성화</Button>):(<></>)}
                    </Card.Text>
                    </Card.Body>
                    </Card>;
                
  return(
      <div>
        {acti===1?card1:card2}
      </div>
  );   
}

export default MenuCard;