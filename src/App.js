import React from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

function App({userRole,isLogin}) {
  return (
    <div className="App">
      <NavBar />
    <Router>
      <Route exact path="/" component={Main}></Route>
      {isLogin===true?(null):(<>
        <Route exact path="/Login" component={Login}></Route>
      </>)}
      {userRole===0?(<>
        <Route exact path="/ManageEmp" component={Manage}></Route>
        <Route exact path="/ManageEmp/:id" component={ManageEmp}></Route>
        <Route exact path="/AboutMenu" component={AboutMenu}></Route>
      </>):(null)}
      {userRole===1?(<>
        <Route exact path="/Order" component={Order}></Route>
      </>):(<></>)}
      {userRole===2?(<>
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

function mapDispatchToProps(dispatch,ownProps){
   return(
     {
       logOut:()=>{dispatch()}
     }
   );
}

export default connect(mapStateToProps,null) (App);
