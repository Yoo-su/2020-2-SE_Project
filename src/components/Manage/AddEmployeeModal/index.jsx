import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { createEmployee } from "lib/api/user";

//직원 추가 모달 컴포넌트
export default function AddEmployeeModal({ show, setShow }) {
  const [newEmail, setEmail] = useState("");
  const [newNickname, setNickname] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newWage, setWage] = useState(-1);
  const [newRole, setRole] = useState("");
  const [newRole2, setRole2] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleWage = (e) => {
    setWage(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target);
  };
  const handleRole2 = (e) => {
    setRole2(e.target);
  };

  return (
    <div id="addEmpModal">
      <Modal show={show} onHide={setShow}>
        <Modal.Header>
          <b style={{ fontSize: "30px" }}>직원 추가</b>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>
                <b>직원 닉네임</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name.."
                onChange={handleNickname}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <b>직원 이메일</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email.."
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                <b>직원 비밀번호</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pw.."
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPay">
              <Form.Label>
                <b>직원 시급</b>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter pay.."
                onChange={handleWage}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPay">
              <Form.Label>직원역할</Form.Label>
              <Form.Check
                label="요리사"
                value="요리사"
                onChange={handleRole}
              ></Form.Check>
              <Form.Check
                label="점원"
                value="점원"
                onChange={handleRole2}
              ></Form.Check>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={setShow}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (newRole.checked && newRole2.checked) {
                alert("직원의 역할은 하나만 골라주세요");
              } else if (
                newEmail === "" ||
                newNickname === "" ||
                newPassword === "" ||
                newWage === -1 ||
                (!newRole.checked && !newRole2.checked)
              ) {
                alert("입력 정보를 확인해 주세요");
              } else {
                createEmployee(newEmail, newNickname, newPassword, newWage, newRole)
                  .then((res) => {
                    if (res.data.success === true) {
                      alert("직원 추가가 완료되었습니다");
                      window.location.reload();
                    } else alert("오류발생");
                  });
              }
            }}
          >
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

