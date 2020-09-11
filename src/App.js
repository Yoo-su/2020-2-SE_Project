import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Order from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import AboutMenu from "./routes/AboutMenu";
import Main from "./routes/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
    <Router>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/Order" component={Order}></Route>
      <Route exact path="/AboutMenu" component={AboutMenu}></Route>
      <Route exact path="/Login" component={Login}></Route>
      <Route exact path="/Signup" component={Signup}></Route>
    </Router>
    </div>
  );
}

export default App;
