import React from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from "axios";
import {logOut} from "../Store";
import logo from "../icons/logo2.png";

function NavBar({userRole,isLogin,logOut,curUser}){
   return(
    <div id="NavBar">
    <Navbar className="HomeNav" style={{backgroundColor:"#F4DCB5"}}>
         <Navbar.Brand href="#" style={{paddingBottom:"0px"}}>
         <img 
             src={logo}
             width="40"
             height="45"
             alt="mainlogo">
             </img>{' '}
             <label style={{fontSize:"35px",margin:"0px"}}>에브리 레스토랑</label>
         </Navbar.Brand>
         <Nav className="mr-auto" style={{fontSize:"22px"}}>
             {userRole===0?(<>
                <Nav.Link href="#ManageEmp">직원관리</Nav.Link>
                <Nav.Link href="#AboutMenu">메뉴</Nav.Link>
                <Nav.Link href="#SalesInfo">판매</Nav.Link>
                <Nav.Link href="#Account">회계</Nav.Link>
             </>):(null)}
             {userRole===1||userRole===2?(<>
                <Nav.Link href="#Order">주문</Nav.Link>
             </>):(<></>)}
             {userRole===1||userRole===2?(<>
             <Nav.Link href="#Cook">요리</Nav.Link>
             <Nav.Link href="#ManageStock">재고</Nav.Link>
             </>):(<></>)}
        </Nav>
        {isLogin===true?(<>
        <b style={{fontSize:"20px"}}>{curUser} 님</b>&nbsp;
         <Button variant="danger" size="sm" onClick={()=>{
           function logout(){
             axios.get('http://localhost:3002/api/logout',{params:{nickName:curUser}}).then(res=>{
               if(res.data.success===true){
                 console.log('로그아웃완료');
               }else alert('오류발생');
             })
           }
           logout();
           logOut();
         }}>로그아웃</Button>
        </>):(
            <Nav className="sign">
              <Nav.Link href="#Login">로그인</Nav.Link>
            </Nav>)}
        </Navbar>
</div>
   );
};

function mapStateToProps(state){
    return {
        userRole:state.userRole,
        isLogin:state.isLogin,
        curUser:state.curUser
    };
}

function mapDispatchToProps(dispatch,ownProps){
    return(
      {
        logOut:()=>{dispatch(logOut());}
      }
    );
 }

export default connect(mapStateToProps,mapDispatchToProps) (NavBar);

