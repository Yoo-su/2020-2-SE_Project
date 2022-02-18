import React, { useEffect } from "react";
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
const socket = io("https://every-server.herokuapp.com", {
  transports: ["websocket"],
});

function App({ userRole, isLogin, login, logout }) {
  /*App 컴포넌트 마운트 할 때마다 로컬스토리지에서 로그인 유저 정보 확인,*/
  useEffect(() => {
    if (localStorage.getItem("role")) {
      login();
    }
  }, []);
  return (
    <div className="App">
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
