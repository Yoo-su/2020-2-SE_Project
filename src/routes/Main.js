import React from 'react';
import {Carousel} from 'react-bootstrap';
import image1 from "../imgs/image1.jpg";
import image2 from "../imgs/image2.jpg";
import "./Main.css";

function Main(){
    return(
        <div id="main">
          <div id="Carousels">
        <div id="Carousel1">
        <Carousel style={{borderRadius:"30px"}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="first slide"
    />
    <Carousel.Caption>
      <h1>레스토랑 자동화</h1>
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