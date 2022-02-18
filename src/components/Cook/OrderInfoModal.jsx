import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

//쿠킹페이지 주문카드 클릭 시 활성화되는 주문 상세정보 모달 컴포넌트
export default function OrderInfoModal({
  show,
  setShow,
  orderId,
  orderContent,
  orderTime,
}) {
  const time = new Date(orderTime);
  return (
    <div>
      <Modal show={show} onHide={setShow} size="sm">
        <Modal.Header>
          <b style={{ fontSize: "30px" }}>주문번호:&nbsp;{orderId}</b>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>
                <b style={{ fontSize: "25px" }}>주문 음식</b>
              </Form.Label>
              <br></br>
              {orderContent.map((food) => (
                <span key={Math.random()}>
                  {food.menu_menuName} X {food.count}
                  <br></br>
                </span>
              ))}
              <br></br>
              <b style={{ color: "#0052A5", fontSize: "20px" }}>
                {time.getHours()}:{time.getMinutes()} 접수 주문
              </b>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={setShow}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
