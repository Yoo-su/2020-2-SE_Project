import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { userLogout } from "../lib/api/user";
import { logOut } from "../Store";
import "./NavBar.css";
import logo from "../icons/hat.png";

//네비게이션 바 컴포넌트
function NavBar({ userRole, isLogin, logOut, curUser }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const getDate = () => {
    let today = new Date();

    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜

    setDate(month + "월" + " " + date + "일");
  };

  const getTime = () => {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    setTime(
      `${hour < 10 ? `0${hour}` : hour}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`
    );
  };

  useEffect(() => {
    //현재 날짜, 시간 계산
    getDate();
    setInterval(getTime, 1000);
  }, []);

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
            <p id="userName">{curUser} 님</p>
            <p
              id="logoutBtn"
              onClick={() => {
                userLogout(curUser)
                .then((res) => {
                  if (res.data.success === true) {
                    console.log("로그아웃완료");
                  } else alert("오류발생");
                });
                logOut();
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

function mapStateToProps(state) {
  return {
    userRole: state.userRole,
    isLogin: state.isLogin,
    curUser: state.curUser,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);