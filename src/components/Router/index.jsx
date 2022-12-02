import React from "react";
import { HashRouter, Route } from "react-router-dom";
import OrderPage from "pages/Order/OrderPage";
import LoginPage from "pages/User/LoginPage";
import MenuPage from "pages/Manage/MenuPage";
import MainPage from "pages/Main";
import CookPage from "pages/Cook/CookPage";
import EmpManagePage from "pages/Manage/EmpManagePage";
import EmpDetailPage from "pages/Manage/EmpDetailPage";
import StockPage from "pages/Cook/StockPage";
import SalesPage from "pages/Manage/SalesPage";
import AccountPage from "pages/Manage/AccountPage";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("https://every-server.herokuapp.com", {
  transports: ["websocket"],
});

export default function Router() {
  const { userRole, isLogin } = useSelector(state => state.user);

  return (
    <HashRouter>
      <Route exact path="/" component={MainPage}></Route>
      {isLogin === true ? (
        <></>
      ) : (
        <>
          <Route exact path="/Login" component={LoginPage}></Route>
        </>
      )}

      {/*로그인한 사용자의 역할에 따라 이용 가능한 메뉴 구분*/}

      {/*관리자*/}
      {userRole === 0 ? (
        <>
          <Route
            exact
            path="/ManageEmp"
            component={EmpManagePage}
          ></Route>
          <Route
            exact
            path="/ManageEmp/:id"
            component={EmpDetailPage}
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
            component={StockPage}
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
            component={StockPage}
          ></Route>
        </>
      ) : (
        <></>
      )}
    </HashRouter>
  );
}