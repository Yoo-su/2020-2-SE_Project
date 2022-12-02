import React, { useState, useEffect } from "react";
import Table from "components/Order/Table";
import TakeOut from "components/Order/TakeOut";
import OrderCard_Clerk from "components/Order/OrderCard_Clerk";
import useGetOrderPageData from "hooks/api/useGetOrderPageData";
import "./style.css";

//주문 페이지 컴포넌트
export default function OrderPage({ socket }) {
  const { loading, error, tables, menus, takeoutOrders, setTakeoutOrders, execute } = useGetOrderPageData();

  useEffect(() => {
    //테이블정보, 메뉴정보, 테이크아웃 주문 정보 데이터 불러오기
    execute();

    //테이크아웃 주문 관련 소켓 이벤트 주시
    socket.on("aboutTakeOut", (data) => {
      if (data.what === "updateOrderForClerk") {
        setTakeoutOrders(data.takeOutOrders);
      } else if (data.what === "removeCard") {
        setTakeoutOrders(data.takeoutOrders);
      }
    });

    return () => {
      socket.off("aboutTakeOut");
    };
  }, []);

  return (
    <div id="order">
      {!loading ? (
        <>
          {/* 주문페이지 좌측 테이블 주문 파트 */}
          <div id="orderLeft">
            <div id="tables">
              {tables.slice(1, tables.length).map((table) => (
                <Table
                  key={table.sicktakId}
                  tableId={table.sicktakId}
                  empty={table.isEmpty === 1 ? true : false}
                  menu={menus}
                  socket={socket}
                ></Table>
              ))}
            </div>
          </div>

          {/* 주문페이지 우측 테이크아웃 주문 파트 */}
          <div id="orderRight">
            <div id="takeOut">
              <TakeOut
                tableId={0}
                menu={menus}
                socket={socket}
              ></TakeOut>
              <br></br>
              <br></br>
              <div id="toOrders">
                {takeoutOrders.map((order) => (
                  <OrderCard_Clerk
                    key={order.orderId}
                    orderId={order.orderId}
                    state={order.state}
                    price={order.totalPrice}
                    socket={socket}
                  ></OrderCard_Clerk>
                ))}
              </div>
            </div>
          </div>
        </>
      ) :
        (
          <div id="orderLoading">
            <b style={{ fontSize: "45px" }}>불러오는 중...</b>
          </div>
        )}
    </div>
  );
}
