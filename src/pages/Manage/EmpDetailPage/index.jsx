import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getEmployeeDetail, getWorkHistory, updateSalary, paySalary } from "lib/api/user"
import useGetEmployeeDetail from "hooks/api/useGetEmployeeDetail";
import EmpRemoveWarning from "components/Manage/RemoveWarning";
import './style.css';

//직원 상세정보 조회 페이지 컴포넌트
export default function EmpDetailPage({ location }) {
  const emp = location.state;
  const [salary, setSalary] = useState(emp.wage);
  const [showInput, setShowInput] = useState(true);
  const [newSalary, setNewSalary] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const { loading, error, workHistory, sumOfPay,
    setWorkHistory, setSumOfPay,
    execute } = useGetEmployeeDetail(emp)

  useEffect(() => {
    execute();
  }, []);

  //직원 삭제 경고모달 온오프 함수
  function toggleWarningModal() {
    setShowWarningModal(!showWarningModal);
  }

  return (
    <div id="aboutEmp">
      <div id="Content">
        <div id="empDetailTitle">
          <b>직원명: {emp.name}</b>
          <button
            className="gobackBtn"
            style={{ float: "right", marginLeft: "5px" }}
            onClick={() => {
              window.location.href = "#ManageEmp";
            }}
          >
            돌아가기
          </button>
          <button
            className="removeEmpBtn"
            style={{
              float: "right",
              backgroundColor: "#B90E0A",
              color: "white",
            }}
            onClick={() => {
              setShowWarningModal(!showWarningModal);
            }}
          >
            삭제
          </button>
          <EmpRemoveWarning
            show={showWarningModal}
            setShow={toggleWarningModal}
            userEmail={emp.email}
          ></EmpRemoveWarning>
        </div>
        <br></br>
        <div id="empDetailContent">
          <label style={{ borderBottom: "2px solid #99aab5" }}>
            ●역할: {emp.role === 1 ? "점원" : "요리사"}
          </label>
          <br></br>
          <label style={{ borderBottom: "2px solid #99aab5" }}>
            ●이메일: {emp.email}
          </label>
          <br></br>

          <span id="aboutSalary">
            {!showInput ? (
              <>
                <b style={{ borderBottom: "2px solid #99aab5" }}>●시급:</b>
                &nbsp;
                <input type="number" onChange={(e) => setNewSalary(e.target.value)}></input>
                &nbsp;
                <button
                  onClick={() => {
                    if (newSalary < 0 || newSalary === "-0")
                      alert("변경할 시급을 확인해주세요");
                    else {
                      updateSalary()
                        .then((res) => {
                          if (res.data.success === true) {
                            alert("변경 적용되었습니다 😀");
                          } else {
                            console.log("failed");
                          }
                        });;
                      setShowInput(!showInput);
                      setSalary(newSalary);
                      setNewSalary(0);
                    }
                  }}
                >
                  적용
                </button>
                &nbsp;
                <button
                  onClick={() => {
                    setShowInput(!showInput);
                  }}
                >
                  취소
                </button>
                <br></br>
              </>
            ) : (
              <>
                <label style={{ borderBottom: "2px solid #99aab5" }}>
                  ●시급: {salary}원
                </label>
                <button
                  className="alterWageBtn"
                  style={{
                    marginLeft: "20px",
                    paddingBottom: "5px",
                    backgroundColor: "#FFDB58",
                  }}
                  onClick={() => {
                    setShowInput(!showInput);
                  }}
                >
                  시급변경
                </button>
                <br></br>
              </>
            )}
          </span>
          <label style={{ borderBottom: "2px solid #99aab5" }}>
            ●지불할 임금 액수: {sumOfPay}원
          </label>
          <button
            className="payWageBtn"
            style={{
              marginLeft: "20px",
              paddingBottom: "5px",
              backgroundColor: "#FFDB58",
            }}
            onClick={() => {
              paySalary(emp, sumOfPay)
                .then((res) => {
                  if (res.data.success === true) {
                    setSumOfPay(0);
                    alert("임금지불 완료");
                  } else {
                    alert("오류발생");
                  }
                });
              setWorkHistory([]);
            }}
          >
            지불
          </button>
        </div>
        {workHistory.length > 0 ? (
          <div id="workHistory">
            <label
              style={{
                fontSize: "24px",
                borderBottom: "2px solid #99aab5",
                color: "#2F66A9",
              }}
            >
              ●근무 기록
            </label>
            <Table className="workHistTable" striped bordered hover>
              <thead>
                <tr>
                  <th>-</th>
                  <th>로그인 시간</th>
                  <th>로그아웃 시간</th>
                  <th>근무 시간</th>
                </tr>
              </thead>
              <tbody>
                {workHistory.map((info, idx) => (
                  <tr key={info.workhourId}>
                    <td>{idx + 1}</td>
                    <td>{info.loginTime}</td>
                    <td>{info.logoutTime}</td>
                    <td>{info.workTime.split(".")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <>
            <label
              style={{
                fontSize: "24px",
                borderBottom: "2px solid #99aab5",
                color: "#2F66A9",
              }}
            >
              ●근무 기록 없음
            </label>
          </>
        )}
      </div>
    </div>
  );
}


