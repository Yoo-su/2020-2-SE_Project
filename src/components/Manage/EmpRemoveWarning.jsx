import React from "react";
import { Modal, Button } from "react-bootstrap";
import { removeEmployee } from "../../lib/api/user";

//직원 삭제 경고 모달 컴포넌트
export default function EmpRemoveWarning({ show, setShow, userEmail }) {
  return (
    <div>
      <Modal show={show} onHide={setShow}>
        <Modal.Body>
          <h2 style={{ color: "#990F02" }}>정말로 직원을 삭제하시겠습니까?</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setShow}>
            취소
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              removeEmployee(userEmail)
              .then((res) => {
                if (res.data.success === true) {
                  alert("직원 삭제 완료");
                  window.location.href = "#ManageEmp";
                } else {
                  alert("실패");
                }
              });
            }}
          >
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

