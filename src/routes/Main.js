import React from 'react';
import mainImg from '../imgs/chefHat.png';
import mainBack from '../imgs/mainBack.jpg';
import "./Main.css";

function Main(){
    return(
     <div id="main">
         <div id="mainContent" style={{backgroundImage:`url(${mainBack})`,backgroundSize:"cover"}}>
           <div id="insideContent">
          <img id ="mainImg" src={mainImg} alt={mainImg}></img><br></br><br></br>
          <b style={{fontSize:"80px"}}>에브리 레스토랑</b>
          </div>
         </div>
      </div>
    );
}

export default Main;