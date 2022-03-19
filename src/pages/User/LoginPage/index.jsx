import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./style.css";

export default function LoginPage() {
  const [inputEmail, setEmail] = useState("");
  const [inputPassWord, setPassWord] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePW(e) {
    setPassWord(e.target.value);
  }
  return (
    <div className="LoginPage">
      <div id="head">
        <b>직원 로그인</b>
      </div>
      <div id="loginContent">
        <form>
          <div className="form-group" style={{ marginBottom: "25px" }}>
            <input
              type="email"
              className="form-control"
              placeholder="user@naver.com << 체험용 이메일"
              onChange={handleEmail}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "25px" }}>
            <input
              type="password"
              className="form-control"
              placeholder="user << 비밀번호"
              onChange={handlePW}
            />
          </div>

          <Button
            style={{
              width: "100%",
              backgroundColor: "#00B0FF",
              borderColor: "#00B0FF",
            }}
            onClick={() => {
              axios
                .post("https://every-server.herokuapp.com/api/login", {
                  email: inputEmail,
                  password: inputPassWord,
                })
                .then((res) => {
                  console.log(res.data);
                  if (res.data.success === true) {
                    localStorage.setItem("userNick", res.data.nickName);
                    localStorage.setItem("role", res.data.role);
                    alert("로그인 성공");
                    window.location.href = "https://yoo-su.github.io/every-gp";
                  } else {
                    alert("입력 정보를 확인해주세요");
                  }
                });
            }}
          >
            로그인
          </Button>
          <br></br>
        </form>
      </div>
    </div>
  );
}
