import React,{useState} from 'react';
import {Carousel, Button} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import image1 from "../imgs/image1.jpg";
import image3 from "../imgs/image3.jpg"

function Main(){
  const [popshow,setpopshow]=useState(false);

  function test(){setpopshow(false);}
  function soo(){
    setTimeout(()=>{
      setpopshow(false);
    },1000);
  }
    return(
        <div id="main">
        <div id="coolCarousel">
        <Carousel>
  <Carousel.Item style={{textAlign:"center"}}>
    <img
      className="d-block w-100"
      src={image1}
      alt="First slide"
      style={{width:"600px",height:"400px"}}
    />
    <Carousel.Caption>
      <h1>Restaurant automation</h1>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item style={{textAlign:"center"}}>
    <img
      className="d-block w-100"
      src={image3}
      alt="Third slide"
      style={{width:"600px",height:"400px"}}
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
        <div id="content" style={{textAlign:"center"}}>
        <Button variant="warning" onClick={()=>{setpopshow(true); soo();}}>test</Button>
      <Popup open={popshow} position="bottom center" >
          <div style={{backgroundColor:"white", width:"150px",height:"150px", position:"relative",bottom:"100px"}}>
          
          <b>테스트중입니다</b>
        </div>
      </Popup> 
        </div>
        </div>
    );
}

export default Main;