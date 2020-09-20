import React,{useState} from 'react';
import {Carousel, Button} from 'react-bootstrap';
import image1 from "../imgs/image1.jpg";
import image2 from "../imgs/image2.jpg";
import image3 from "../imgs/image3.jpg";
import image4 from "../imgs/image4.jpg"
import "./Main.css";

function Main(){
    return(
        <div id="main">
          <div id="Carousels">
        <div id="Carousel1">
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="first slide"
    />
    <Carousel.Caption>
      <h1>Restaurant automation</h1>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item style={{}}>
    <img
      className="d-block w-100"
      src={image2}
      alt="second slide"
    />
    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
     </div>
   
        </div>
        </div>
    );
}

export default Main;