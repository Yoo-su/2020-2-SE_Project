import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Order from "./routes/Order";
import Login from "./routes/Login";
import AboutMenu from "./routes/AboutMenu";
import Main from "./routes/Main";
import Cook from "./routes/Cook";
import Manage from "./routes/Manage";
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
        <Route exact path="/Manage" component={Manage}></Route>
        <Route exact path="/AboutMenu" component={AboutMenu}></Route>
      </>):(null)}
      {userRole===1?(<>
        <Route exact path="/Order" component={Order}></Route>
      </>):(<></>)}
      {userRole===2?(<>
        <Route exact path="/Cook" component={Cook}></Route>
      </>):(<></>)}
      
    </Router>
    </div>
  );
}

function mapDispatchToProps(state){
   return {
     userRole:state.userRole,
     isLogin:state.isLogin
    };
}

export default connect(mapDispatchToProps,null) (App);
