import React, { useState,useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import OrderPage from "./pages/Order/OrderPage";
import Login from "./pages/User/Login";
import MenuPage from "./pages/Manage/MenuPage";
import Main from "./pages/Main";
import CookPage from "./pages/Cook/CookPage";
import EmployeeManagePage from "./pages/Manage/EmployeeManagePage";
import EmployeeDetailPage from "./pages/Manage/EmployeeDetailPage";
import ManageStockPage from "./pages/Cook/ManageStockPage";
import SalesPage from "./pages/Manage/SalesPage";
import AccountPage from "./pages/Manage/AccountPage";
import { connect } from "react-redux";
import { logIn, logOut } from "./Store";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import "./App.css";
const socket = io("https://every-server.herokuapp.com", {
  transports: ["websocket"],
});

function App({ userRole, isLogin, login, logout }) {
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
    <div className={browserWidth<776?"Hide":"App"} >
      {browserWidth<776?(
        <div id="lowWidthAlert">
          <h2>브라우저 크기가 너무 작습니다 :(</h2>
          <b>본 서비스는 태블릿과 PC화면 크기에 최적화된 서비스입니다. 브라우저 크기를 키워주세요 😀</b>
        </div>
      ):(
        <div>
          <NavBar />
      <Router>
        <Route exact path="/" component={Main}></Route>
        {isLogin === true ? (
          <></>
        ) : (
          <>
            <Route exact path="/Login" component={Login}></Route>
          </>
        )}

        {/*로그인한 사용자의 역할에 따라 이용 가능한 메뉴 구분*/}

        {/*관리자*/}
        {userRole === 0 ? (
          <>
            <Route
              exact
              path="/ManageEmp"
              component={EmployeeManagePage}
            ></Route>
            <Route
              exact
              path="/ManageEmp/:id"
              component={EmployeeDetailPage}
            ></Route>
            <Route exact path="/AboutMenu" component={MenuPage}></Route>
            <Route exact path="/SalesInfo" component={SalesPage}></Route>
            <Route exact path="/Account" component={AccountPage}></Route>
            <Route
              exact
              path="/Order"
              component={() => <OrderPage socket={socket} />}
            ></Route>
            <Route
              exact
              path="/Cook"
              component={() => <CookPage socket={socket} />}
            ></Route>
            <Route
              exact
              path="/ManageStock"
              component={ManageStockPage}
            ></Route>
          </>
        ) : null}
        
        {/*점원*/}
        {userRole === 1 ? (
          <>
            <Route
              exact
              path="/Order"
              component={() => <OrderPage socket={socket} />}
            ></Route>
          </>
        ) : (
          <></>
        )}
        
        {/*셰프*/}
        {userRole === 2 ? (
          <>
            <Route
              exact
              path="/Cook"
              component={() => <CookPage socket={socket} />}
            ></Route>
            <Route
              exact
              path="/ManageStock"
              component={ManageStockPage}
            ></Route>
          </>
        ) : (
          <></>
        )}
      </Router>
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
    logout: () => {
      dispatch(logOut());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
