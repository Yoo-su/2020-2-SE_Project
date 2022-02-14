import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import OrderPage from "./routes/Order/OrderPage";
import Login from "./routes/User/Login";
import MenuPage from "./routes/Manage/MenuPage";
import Main from "./routes/Main";
import CookPage from "./routes/Cook/CookPage";
import EmployeeManagePage from "./routes/Manage/EmployeeManagePage";
import EmployeeDetailPage from "./routes/Manage/EmployeeDetailPage";
import ManageStockPage from "./routes/Cook/ManageStockPage";
import SalesPage from "./routes/Manage/SalesPage";
import AccountPage from "./routes/Manage/AccountPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { logIn, logOut } from "./Store";
import io from "socket.io-client";
const socket = io("https://every-server.herokuapp.com", {
  transports: ["websocket"],
});

function App({ userRole, isLogin, login, logout }) {
  /*App 컴포넌트 마운트 할 때마다 로컬스토리지에서 로그인 유저 정보 확인,
    유저존재하면 store isLogin state를 true로 ..*/
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
