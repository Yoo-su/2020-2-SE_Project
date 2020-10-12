import React from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import logo from "../icons/logo2.png";

function NavBar({userRole,isLogin}){
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
             {userRole===0?(<>
                <Nav.Link href="#Manage">Manage</Nav.Link>
                <Nav.Link href="#AboutMenu">Menu</Nav.Link>
             </>):(null)}
             {userRole===1?(<>
                <Nav.Link href="#Order">Order</Nav.Link>
             </>):(<></>)}
             {userRole===2?(<>
             <Nav.Link href="#Cook">Cook</Nav.Link>
             </>):(<></>)}
        </Nav>
        {isLogin===true?(<>
         <Button variant="danger" size="sm">Logout</Button>
        </>):(
            <Nav className="sign">
              <Nav.Link href="#Login">LogIn</Nav.Link>
            </Nav>)}
        </Navbar>
</div>
   );
};

function mapStateToProps(state){
    return {
        userRole:state.userRole,
        isLogin:state.isLogin
    };
}



export default connect(mapStateToProps,null) (NavBar);

