import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Router from "./Router";
import WidthAlert from './WidthAlert';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/slices/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  window.addEventListener('resize', () => {
    setBrowserWidth(window.innerWidth);
  })

  /*App 컴포넌트 마운트 할 때마다 로컬스토리지에서 로그인 유저 정보 확인,*/
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);
  return (
    <div className={browserWidth < 878.5 ? "Hide" : "App"} >
      {browserWidth < 878.5 ? (
        <WidthAlert />
      ) : (
        <div>
          <NavBar />
          <Router />
        </div>
      )}
    </div>
  );
}

export default App;
