import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import logo from "../icons/logo2.png";

function NavBar(){
    const test=true;
   return(
    <div id="NavBar">
    <Navbar className="HomeNav" style={{backgroundColor:"#D8D8D8"}} variant="light">
         <Navbar.Brand href="#">
             <img 
             src={logo}
             width="40"
             height="40"
             alt="mainlogo">
             </img>{' '}
             <b>Restaurant Management</b>
         </Navbar.Brand>
         <Nav className="mr-auto">
         <Nav.Link href="#Order">order</Nav.Link>
        <Nav.Link href="#AboutMenu">about</Nav.Link>
        <Nav.Link href="/">test</Nav.Link>
         {test?(<></>):(<Nav.Link href="#">관리자만 볼수있도록</Nav.Link>)}
        </Nav>
        <Nav className="user">
            <Nav.Link href="#Login">Sign In</Nav.Link>
            <Nav.Link href="#Signup">Sign Up</Nav.Link>
        </Nav>
        </Navbar>
</div>
   );
};

export default NavBar;

