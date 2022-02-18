import React, { useState, useEffect } from "react";
import OrderCardforChef from "../../components/Cook/OrderCardforChef";
import { bringAllOrders } from "../../lib/api/cook";
import "./CookPage.css";

//쿠킹페이지 컴포넌트
export default function CookPage({ socket }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
          <OrderCardforChef
            key={Math.random()}
            orderId={order.orderId}
            orderTime={order.receiveTime}
            socket={socket}
          ></OrderCardforChef>
        ))}
      </div>
    </div>
  );
}

