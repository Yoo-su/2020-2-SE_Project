import React, {useState,useEffect} from "react";
import {Button,Card} from 'react-bootstrap';
import TestFoods from "../test/foods.json";
import axios from "axios";
import AddFoodal from "../components/AddFoodal";
import "./AboutMenu.css";

function AboutMenu(){
  const [foods,setFoods]=useState([]);
  const [show,setShow]=useState(false);
  let number=1;
 
  const modalOff=()=>{
    setShow(false);
  }

  useEffect(()=>{
    axios.get('http://localhost:3002/api/menu').then(res=>{
      if(res.data.success===true){setFoods(res.data.menu)}
      else console.log('error');
    })
  },[])
  return(
           <div id="menuPage">
             <div id="header" style={{textAlign:"center"}}>
              <b style={{fontSize:"50px"}}>Menus</b><br></br>
              <Button variant="info" id="addMenuBtn" style={{float:"right"}} onClick={()=>{
               setShow(!show);
             }}>메뉴 추가</Button><br></br>
             </div>
             <div id="menus" style={{margin:"20px", textAlign:"center"}}>
              {foods.map(food=>(
                  <Card border="dark" key={number++} style={{margin:"20px", width:"200px", display:"inline-block"}}>
                    <Card.Img variant="top" src={food.imgPath} style={{width:"150px",height:"150px"}}></Card.Img>
                    <Card.Body>
              <Card.Title>{food.menuName}</Card.Title>
              <Card.Text>
                {food.price}원 <br></br>
                누적판매량: <b>{food.sales}</b> <br></br>
                재고량: <b>{food.remainStock}</b>
              </Card.Text>
                    </Card.Body>
                  </Card>
              ))}
             </div>
             <AddFoodal show={show} setShow={modalOff}></AddFoodal>
           </div>
       );
}

export default AboutMenu;