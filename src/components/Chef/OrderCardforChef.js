import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import OrderInfoModal from "./OrderInfoModal";
import "./OrderCard.css";

function OrderCardforChef({ orderId, orderTime, socket }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderContent, setContent] = useState([]);
  const [tableOrTakeOut, setTableOrTakeout] = useState(-1);

  function bringOrderDetail() {
    axios
      .get("https://every-server.herokuapp.com/api/forOrderCard", {
        params: { orderId: orderId },
      })
      .then((res) => {
        if (res.data.success === true) {
          setContent(res.data.content);
          console.log(res.data.content);
          setTableOrTakeout(res.data.tableId[0].sicktak_sicktakId);
        } else alert("error");
      });
  }

  useEffect(() => {
    bringOrderDetail();
  }, []);

  function renderOrderModal() {
    setShowOrderModal(!showOrderModal);
  }

  return (
    <div>
      <Card className="orderCard_Chef" key={Math.random()}>
        <Card.Header
          onClick={() => {
            setShowOrderModal(true);
          }}
        >
          <b>주문번호: {orderId}</b>
          <br></br>
          {tableOrTakeOut === 0 ? (
            <b style={{ color: "#2F66A9" }}>테이크아웃</b>
          ) : (
            <b style={{ color: "#865840" }}>테이블{tableOrTakeOut}</b>
          )}
        </Card.Header>
        <Card.Body
          onClick={() => {
            setShowOrderModal(true);
          }}
        >
          <Card.Text>
            {orderContent.length > 3 ? (
              <span style={{ display: "flex", flexDirection: "column" }}>
                <label>
                  {orderContent[0].menu_menuName} X {orderContent[0].count}
                </label>
                <label>
                  {orderContent[1].menu_menuName} X {orderContent[1].count}{" "}
                </label>
                <label>외 {orderContent.length - 2}</label>
              </span>
            ) : (
              <span style={{ display: "flex", flexDirection: "column" }}>
                {orderContent.map((food) => (
                  <label key={Math.random()}>
                    {food.menu_menuName} X {food.count}
                  </label>
                ))}
              </span>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="completeBtn"
            variant="success"
            onClick={() => {
              function updateOrder() {
                axios
                  .get("https://every-server.herokuapp.com/api/cookComplete", {
                    params: { orderId: orderId },
                  })
                  .then((res) => {
                    if (res.data.success === true) {
                      socket.emit("cookEvent", {
                        tableId: tableOrTakeOut,
                        orderId: orderId,
                      });
                    }
                  });
              }
              updateOrder();
            }}
          >
            완료알림
          </Button>
        </Card.Footer>
        <OrderInfoModal
          show={showOrderModal}
          setShow={renderOrderModal}
          orderId={orderId}
          orderContent={orderContent}
          orderTime={orderTime}
        ></OrderInfoModal>
      </Card>
    </div>
  );
}

export default OrderCardforChef;
