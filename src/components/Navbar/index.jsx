import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { logout } from "lib/api/user";
import useDate from "hooks/useDate";
import useTime from "hooks/useTime";
import "./style.css";
import logo from "assets/icons/hat.png";

//네비게이션 바 컴포넌트
function NavBar() {
  const { isLogin, userRole, userNickname } = useSelector(state => state.user);
  const date = useDate();
  const time = useTime();

  return (
    <div id="Navbar">
      <Navbar className="HomeNav">
        <Navbar.Brand href="#" style={{ paddingBottom: "0px" }}>
          <label id="mainTitle">
            <img
              src={logo}
              width="34"
              height="34"
              alt="mainlogo"
              style={{ objectFit: "cover" }}
            ></img>{" "}
            에브리 레스토랑
          </label>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {/* 로그인한 유저의 역할에 따라 이용 가능한 메뉴를 구분 */}
          {userRole === 0 ? (
            <>
              <Nav.Link href="#Order">주문</Nav.Link>
              <Nav.Link href="#Cook">요리</Nav.Link>
              <Nav.Link href="#ManageStock">재고</Nav.Link>
              <Nav.Link href="#ManageEmp">직원관리</Nav.Link>
              <Nav.Link href="#AboutMenu">메뉴</Nav.Link>
              <Nav.Link href="#SalesInfo">판매</Nav.Link>
              <Nav.Link href="#Account">회계</Nav.Link>
            </>
          ) : null}
          {userRole === 1 ? (
            <>
              <Nav.Link href="#Order">주문</Nav.Link>
            </>
          ) : (
            <></>
          )}
          {userRole === 2 ? (
            <>
              <Nav.Link href="#Order">주문</Nav.Link>
            </>
          ) : (
            <></>
          )}
        </Nav>

        <div id="dateDiv">
          <label id="dateLabel">{date + " " + time}</label>
        </div>
        {isLogin === true ? (
          <div id="userInfo">
            <p id="userName">{userNickname} 님</p>
            <p
              id="logoutBtn"
              onClick={() => {
                logout(userNickname).then(res => {
                  localStorage.clear();
                  window.location.href = "/"
                })
              }}
            >
              로그아웃
            </p>
          </div>
        ) : (
          <Nav className="sign">
            <Nav.Link href="#Login">로그인</Nav.Link>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}

export default NavBar;