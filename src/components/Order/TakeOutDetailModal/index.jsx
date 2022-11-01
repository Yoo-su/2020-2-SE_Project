import React, {memo} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { terminateTakeoutOrder } from "../../../lib/api/order";

//테이크아웃 주문 상세정보 모달 컴포넌트
function TakeOutDetailModal({
  show,
  setShow,
  orderId,
  foods,
  state,
  price,
  socket
}) {
  return (
    <div>
      <Modal show={show} onHide={()=>{setShow()}} size="sm">
        <Modal.Header>
          <b style={{ fontSize: "30px" }}>주문번호: {orderId}</b>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>
                <b style={{ fontSize: "20px" }}>주문 음식</b>
              </Form.Label>
              <br></br>
              {foods.map((food) => (
                <span
                  key={Math.random()}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label>
                    {food.menu_menuName} X {food.count}
                  </label>
                </span>
              ))}
            </Form.Group>
          </Form>
          <b>총 {price}원</b>
        </Modal.Body>
        <Modal.Footer>
          {state === "prepared" ? (
            <Button
              variant="warning"
              onClick={() => {
                terminateTakeoutOrder(orderId,price,foods)
                .then((res) => {
                  if (res.data.success === true) {
                    socket.emit("takeOutEnd", { orderId: orderId });
                  }
                });
              }}
            >
              수령
            </Button>
          ) : (
            <></>
          )}
          <Button variant="info" onClick={setShow}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default memo(TakeOutDetailModal);