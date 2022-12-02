import React, { useState, useLayoutEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { getOrderDetail, updateOrderStateToPrepared } from "lib/api/order";
import OrderInfoModal from "../OrderInfoModal";
import "./style.css";

//쿠킹페이지에서 확인할 수 있는 주문 정보 카드 컴포넌트
export default function OrderCard_Chef({ orderId, orderTime, socket }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderContent, setContent] = useState([]);
  const [tableOrTakeOut, setTableOrTakeout] = useState(-1);

  useLayoutEffect(() => {
    //주문 관련 상세정보 불러오기
    getOrderDetail(orderId).then((res) => {
      if (res.data.success === true) {
        setContent(res.data.content);
        console.log(res.data.content);
        setTableOrTakeout(res.data.tableId[0].sicktak_sicktakId);
      } else alert("error");
    });
  }, []);

  //주문 상세정보 모달 온오프 함수
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
              updateOrderStateToPrepared(orderId)
                .then((res) => {
                  if (res.data.success === true) {
                    socket.emit("cookEvent", {
                      tableId: tableOrTakeOut,
                      orderId: orderId,
                    });
                  }
                });
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
