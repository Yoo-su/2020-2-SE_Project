import React, { useState, useLayoutEffect } from "react";
import OrderCard_Chef from "../../../components/Cook/OrderCard_Chef";
import { bringAllOrders } from '../../../lib/api/cook';
import "./style.css";

//쿠킹페이지 컴포넌트
export default function CookPage({ socket }) {
  const [orders, setOrders] = useState([]);

  useLayoutEffect(() => {
    //모든 주문 데이터 불러오기
    bringAllOrders().then((res) => {
      setOrders(res.data.order);
    });

    //주문 관련 이벤트 주시
    socket.on("aboutOrder_chef", (data) => {
      setOrders(data.order);
    });

    return () => {
      //컴포넌트 언마운트 시 소켓 해제
      socket.off("cookAlertForChef");
    };
  }, []);
  return (
    <div id="cookPage">
      <div id="cookTitle">
        <b>주문목록 </b>
      </div>
      <div id="cookContent">
        {orders.map((order) => (
          <OrderCard_Chef
            key={Math.random()}
            orderId={order.orderId}
            orderTime={order.receiveTime}
            socket={socket}
          ></OrderCard_Chef>
        ))}
      </div>
    </div>
  );
}

