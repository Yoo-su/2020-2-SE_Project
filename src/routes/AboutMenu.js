import React, {useState} from "react";
import {Button,Card} from 'react-bootstrap';
import TestFoods from "../testApi/foods.json";
import AddFoodal from "../components/AddFoodal";
import "./AboutMenu.css";

function AboutMenu(){
  const [foods,setFoods]=useState(TestFoods.foods);
  const [show,setShow]=useState(false);
 
  const modalOff=()=>{
    setShow(false);
  }
  return(
           <div id="menuPage">
             <div id="header">
              <h1 style={{textAlign:"center"}}>Menus</h1>
              <Button variant="info" id="addMenuBtn" style={{float:"right"}} onClick={()=>{
               setShow(!show);
             }}>메뉴 추가</Button><br></br>
             </div>
             <div id="menus" style={{margin:"20px", textAlign:"center"}}>
              {foods.map(food=>(
                  <Card border="dark" key={food.id} style={{margin:"20px", width:"230px", display:"inline-block",borderRadius:"10px"}}>
                    <Card.Img variant="top" src={food.foodImgs[0]} style={{width:"150px",height:"150px"}}></Card.Img>
                    <Card.Body>
              <Card.Title>{food.name}</Card.Title>
              <Card.Text>
                {food.price}원 <br></br>
                누적판매량: <b>{food.hotpoint}</b> <br></br>
                누적매출액: <b>{food.ownSales}</b> <br></br>
                재고량: <b>{food.stock}</b>
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