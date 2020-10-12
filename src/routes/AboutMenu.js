import React, {useState} from "react";
import {Button,Card} from 'react-bootstrap';
import TestFoods from "../testApi/foods.json";
import AddFoodal from "../components/AddFoodal";
import "./AboutMenu.css";

function AboutMenu(){
  const [foods,setFoods]=useState(TestFoods.foods);
  const [show,setShow]=useState(false);
 
  return(
           <div id="menuPage">
             <br></br>
             <h1 style={{textAlign:"center"}}>Menus</h1>
             <div id="menus" style={{margin:"20px", textAlign:"center"}}>
              {foods.map(food=>(
                  <Card key={food.id} style={{margin:"20px", width:"230px", display:"inline-block",border:"2px solid #C6C6C6", borderRadius:"10px"}}>
                    <Card.Img variant="top" src={food.foodImgs[0]} style={{width:"150px",height:"150px"}}></Card.Img>
                    <Card.Body>
              <Card.Title>{food.name}</Card.Title>
              <Card.Text>
                {food.price}원 <br></br>
                누적판매량: <b>{food.hotpoint}</b> <br></br>
                누적매출액: <b>{food.ownSales}</b> 
              </Card.Text>
                    </Card.Body>
                  </Card>
              ))}
             </div>
             <Button variant="info" id="addMenuBtn" onClick={()=>{
               setShow(!show);
             }}>메뉴 추가</Button>
             <AddFoodal show={show} setShow={setShow}></AddFoodal>
           </div>
       );
}

export default AboutMenu;