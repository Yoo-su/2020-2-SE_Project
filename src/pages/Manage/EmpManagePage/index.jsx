import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { allEmployees } from "../../../lib/api/user";
import AddEmployeeModal from "../../../components/Manage/AddEmployeeModal";
import "./style.css";

//직원관리 페이지 컴포넌트
export default function EmpManagePage() {
  const [employees, setEmployees] = useState([]);
  const [showAddEmp, setShowAddEmp] = useState(false);
  let number = 1;

  //직원추가 modal 온오프 함수
  const addEmpModalOff = () => {
    setShowAddEmp(false);
  };

  useEffect(() => {
    //컴포넌트 마운트 시 모든 직원정보 불러오기
    allEmployees()
      .then((res) => {
        if (res.data.success === true) {
          setEmployees(res.data.users);
        } else {
          console.log("failed");
        }
      });
  }, []);
  return (
    <div id="WorkerList">
      <div id="manageContent">
        <b id="mwTitle">직원 목록</b>
        <Button
          style={{ float: "right" }}
          onClick={() => {
            setShowAddEmp(!showAddEmp);
          }}
        >
          직원 추가
        </Button>
        <AddEmployeeModal
          show={showAddEmp}
          setShow={addEmpModalOff}
        ></AddEmployeeModal>
        <div id="workerList">
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>-</th>
                <th>직원명</th>
                <th>이메일</th>
                <th>역할</th>
                <th>시급</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.userEmail}>
                  <td>{number++}</td>
                  <td>{emp.nickName}</td>
                  <th>{emp.userEmail}</th>
                  <td>{emp.role === 1 ? "점원" : "요리사"}</td>
                  <td>{emp.hourWage}원</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/ManageEmp/${emp.nickName}`,
                        state: {
                          name: emp.nickName,
                          role: emp.role,
                          wage: emp.hourWage,
                          email: emp.userEmail,
                        },
                      }}
                    >
                      <button className="manageEmpBtn">상세정보 조회</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

