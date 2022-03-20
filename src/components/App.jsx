import React, { useState,useEffect } from "react";
import NavBar from "./Navbar";
import Router from "./Router";
import WidthAlert from './WidthAlert';
import { connect } from "react-redux";
import { logIn } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App({ userRole, isLogin, login }) {
  const [browserWidth, setBrowserWidth]=useState(window.innerWidth);
  window.addEventListener('resize',()=>{
    setBrowserWidth(window.innerWidth);
  })

  /*App 컴포넌트 마운트 할 때마다 로컬스토리지에서 로그인 유저 정보 확인,*/
  useEffect(() => {
    if (localStorage.getItem("role")) {
      login();
    }
  }, []);
  return (
    <div className={browserWidth<878.5?"Hide":"App"} >
      {browserWidth<878.5?(
        <WidthAlert />
      ):(
        <div>
          <NavBar />
          <Router userRole={userRole} isLogin={isLogin} />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userRole: state.userRole,
    isLogin: state.isLogin,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    login: () => {
      dispatch(logIn());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
