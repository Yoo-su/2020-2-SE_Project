import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import TakeOutDetailModal from "../TakeOutDetailModal";
import useGetTakeoutOrderInfo from "hooks/api/useGetTakeoutOrderInfo";
import "./style.css";

//테이크아웃 주문 카드 컴포넌트
export default function OrderCard_Clerk({ orderId, state, price, socket }) {
  const [showDetail, setShowDetail] = useState(false);
  const [orderState, setOrderState] = useState(state);
  const { loading, error, data, execute } = useGetTakeoutOrderInfo();

  useEffect(() => {
    //컴포넌트 마운트 시 주문id를 통해 해당 주문내용 불러오기
    execute();

    //테이크아웃 주문이 준비되는지 소켓이벤트 주시
    socket.on("takeOutPrepared", (data) => {
      if (data.orderId === orderId) {
        setOrderState("prepared");
      }
    });

    //컴포넌트 언마운트 시 소켓 해제
    return () => {
      socket.off("takeOutPrepared");
    };
  }, []);

  //테이크아웃 주문 상세정보 모달 온오프 함수
  function detailOnOff() {
    setShowDetail(!showDetail);
  }

  return (
    <div id="takeOuts">
      <Card
        className="orderCard_Clerk"
        style={orderState === "cooking" ? null : { border: "3px solid #668D3C" }}
        onClick={detailOnOff}
      >
        <Card.Header>
          <b>주문번호: {orderId}</b>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {data.length > 3 ? (
              <span
                className="cardInfo"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label>
                  {data[0].menu_menuName} X {data[0].count}
                </label>
                <label>
                  {data[1].menu_menuName} X {data[1].count}
                </label>
                <label>외 {data.length - 2}</label>
              </span>
            ) : (
              <span>
                {data.map((food) => (
                  <span
                    className="cardInfo"
                    key={Math.random()}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label>
                      {food.menu_menuName} X {food.count}
                    </label>
                  </span>
                ))}
              </span>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {orderState === "cooking" ? (
            <div>
              준비중..<br></br>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              ></Spinner>
            </div>
          ) : (
            <div>
              <b style={{ color: "#668D3C" }}>
                준비완료!<br></br>✓
              </b>
            </div>
          )}
        </Card.Footer>
        <TakeOutDetailModal
          show={showDetail}
          setShow={setShowDetail}
          orderId={orderId}
          foods={data}
          state={orderState}
          price={price}
          socket={socket}
        ></TakeOutDetailModal>
      </Card>
    </div>
  );
}