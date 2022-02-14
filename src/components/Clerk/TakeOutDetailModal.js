import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";

export default function TakeOutDetailModal({
  show,
  setShow,
  orderId,
  foods,
  state,
  price,
}) {
  const socket = io("https://every-server.herokuapp.com", {
    transports: ["websocket"],
  });
  return (
    <div>
      <Modal show={show} onHide={setShow} size="sm">
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
                function takeoutEnd() {
                  axios
                    .post("https://every-server.herokuapp.com/api/takeOutEnd", {
                      orderId: orderId,
                      price: price,
                      content: foods,
                    })
                    .then((res) => {
                      if (res.data.success === true) {
                        socket.emit("takeOutEnd", { orderId: orderId });
                      }
                    });
                }
                takeoutEnd();
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
