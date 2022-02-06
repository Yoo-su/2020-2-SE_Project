import React,{useEffect} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Order from "./routes/Order/Order";
import Login from "./routes/User/Login";
import AboutMenu from "./routes/Manage/AboutMenu";
import Main from "./routes/Main";
import Cook from "./routes/Cook/Cook";
import Manage from "./routes/Manage/Manage";
import ManageEmp from "./routes/Manage/ManageEmp";
import ManageStock from "./routes/Cook/ManageStock";
import SalesInfo from "./routes/Manage/SalesInfo";
import Account from './routes/Manage/Account';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {logIn,logOut} from './Store';
import io from "socket.io-client";
const socket=io('https://every-server.herokuapp.com',{ transports: ['websocket'] });

function App({userRole,isLogin,login,logout}) {
  /*App 컴포넌트 마운트 할 때마다 로컬스토리지에서 로그인 유저 정보 확인,
    유저존재하면 store isLogin state를 true로 ..*/
  useEffect(()=>{
     if(localStorage.getItem('role')){
       login()
     }
  },[]);
  return (
    <div className="App">
      <NavBar />
    <Router>
      <Route exact path="/" component={Main}></Route>
      {isLogin===true?(<></>):(<>
        <Route exact path="/Login" component={Login}></Route>
      </>)}
      {userRole===0?(<>
        <Route exact path="/ManageEmp"  component={Manage}></Route>
        <Route exact path="/ManageEmp/:id" component={ManageEmp}></Route>
        <Route exact path="/AboutMenu" component={AboutMenu}></Route>
        <Route exact path="/SalesInfo" component={SalesInfo}></Route>
        <Route exact path="/Account" component={Account}></Route>
        <Route exact path="/Order" component={()=><Order socket={socket}/>}></Route>
        <Route exact path="/Cook" component={()=><Cook socket={socket} />}></Route>
        <Route exact path="/ManageStock" component={ManageStock}></Route>
      </>):(null)}
      {userRole===1?(<>
        <Route exact path="/Order" component={()=><Order socket={socket}/>}></Route>
      </>):(<></>)}
      {userRole===2?(<>
        <Route exact path="/Cook" component={()=><Cook socket={socket} />}></Route>
        <Route exact path="/ManageStock" component={ManageStock}></Route>
      </>):(<></>)}   
    </Router>
    </div>
  );
}

function mapStateToProps(state){
   return {
     userRole:state.userRole,
     isLogin:state.isLogin
    };
}

function mapDispatchToProps(dispatch, ownProps){
  return{
    login:()=>{dispatch(logIn())},
    logout:()=>{dispatch(logOut())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
