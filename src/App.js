import React,{useEffect} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Order from "./routes/Order";
import Login from "./routes/Login";
import AboutMenu from "./routes/AboutMenu";
import Main from "./routes/Main";
import Cook from "./routes/Cook";
import Manage from "./routes/Manage";
import ManageEmp from "./routes/ManageEmp";
import ManageStock from "./routes/ManageStock";
import Account from "./routes/Account";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

function App({userRole,isLogin}) {
  /*App 컴포넌트 마운트 할 때마다 로컬스토리지에서 로그인 유저 정보 확인,
    유저존재하면 store isLogin state를 true로 ..*/
  useEffect(()=>{
     console.log("App 컴포넌트 렌더링 확인");
  },[]);
  return (
    <div className="App">
      <NavBar />
    <Router>
      <Route exact path="/" component={Main}></Route>
      {isLogin===true?(null):(<>
        <Route exact path="/Login" component={Login}></Route>
      </>)}
      {userRole===1?(<>
        <Route exact path="/ManageEmp" component={Manage}></Route>
        <Route exact path="/ManageEmp/:id" component={ManageEmp}></Route>
        <Route exact path="/AboutMenu" component={AboutMenu}></Route>
        <Route exact path="/Account" component={Account}></Route>
      </>):(null)}
      {userRole===1?(<>
        <Route exact path="/Order" component={Order}></Route>
      </>):(<></>)}
      {userRole===1?(<>
        <Route exact path="/Cook" component={Cook}></Route>
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

export default connect(mapStateToProps,null) (App);
