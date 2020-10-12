import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Order from "./routes/Order";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import AboutMenu from "./routes/AboutMenu";
import Main from "./routes/Main";
import Cook from "./routes/Cook";
import Manage from "./routes/Manage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

function App({userRole}) {
  return (
    <div className="App">
      <NavBar />
    <Router>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/Login" component={Login}></Route>
      <Route exact path="/Signup" component={Signup}></Route>
      {userRole===1?(<>
        <Route exact path="/Order" component={Order}></Route>
        <Route exact path="/AboutMenu" component={AboutMenu}></Route>
      </>):(<></>)}
      {userRole===2?(<>
        <Route exact path="/Manage" component={Manage}></Route>
        <Route exact path="/Cook" component={Cook}></Route>
      </>):(<></>)}
      
    </Router>
    </div>
  );
}

function mapDispatchToProps(state){
   return {userRole:state.userRole};
}

export default connect(mapDispatchToProps,null) (App);
