import React, {Component} from "react";
import {Button,Card} from 'react-bootstrap';
import TestFoods from "../testApi/foods.json";
import "./AboutMenu.css";

class AboutMenu extends Component{
   state={
     foods:TestFoods.foods
   };

   render(){
       return(
           <div id="menuPage">
             <br></br>
             <h1 style={{textAlign:"center"}}>Menus</h1>
             <div id="menus" style={{margin:"20px", textAlign:"center"}}>
              {this.state.foods.map(food=>(
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
             <Button variant="info" id="addMenuBtn">메뉴 추가</Button>
           </div>
       );
   }
}

export default AboutMenu;