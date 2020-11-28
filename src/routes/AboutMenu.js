import React, {useState,useEffect} from "react";
import {Button,Card} from 'react-bootstrap';
import axios from "axios";
import AddFoodal from "../components/AddFoodal";
import MenuCard from '../components/MenuCard';
import "./AboutMenu.css";

function AboutMenu(){
  const [foods,setFoods]=useState([]);
  const [show,setShow]=useState(false);
  const [editMode,setEditMode]=useState(false);
  const [showEditBtn,setEditBtn]=useState(true);
 
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
              <Button variant="info" id="addMenuBtn" style={{float:"right",marginLeft:"5px"}} onClick={()=>{
               setShow(!show);
             }}>메뉴 추가</Button>
             {showEditBtn?(<Button style={{float:"right"}} onClick={()=>{
               setEditMode(!editMode);
               setEditBtn(!showEditBtn);
             }}>편집</Button>):(<Button variant="success" style={{float:"right"}} onClick={()=>{
               setEditMode(!editMode);
               setEditBtn(!showEditBtn);
             }}>완료</Button>)}
             <br></br>
             </div>
             <div id="menus" style={{margin:"20px", textAlign:"center"}}>
              {foods.map(food=>(
                <MenuCard activate={food.activate} menuName={food.menuName} showBtn={editMode} imgPath={food.imgPath} price={food.price} sales={food.sales} remain={food.remainStock}></MenuCard>
              ))}
             </div>
             <AddFoodal show={show} setShow={modalOff}></AddFoodal>
           </div>
       );
}

export default AboutMenu;