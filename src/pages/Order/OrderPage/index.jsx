import React, { useState, useEffect } from "react";
import Table from "../../../components/Order/Table";
import TakeOut from "../../../components/Order/TakeOut";
import OrderCard_Clerk from "../../../components/Order/OrderCard_Clerk";
import { bringAllTables, bringTakeOutOrders } from "../../../lib/api/order";
import { bringActivatedMenu } from "../../../lib/api/menu";
import axios from "axios";
import "./style.css";

//주문 페이지 컴포넌트
export default function OrderPage({ socket }) {
  /* 매장 테이블, 테이크아웃 주문버튼, 테이크아웃 주문들, 매장 메뉴 상태를 관리,*/
  const [tables, setTables] = useState([]);
  const [takeOut, setTakeOut] = useState([]);
  const [takeOutOrders, setTakeOutOrders] = useState([]);
  const [menu, setMenu] = useState([]);

  //매장 테이블, 활성화된 메뉴, 테이크아웃 주문 데이터를 불러오는 함수
  function bringDatas() {
    axios.all([bringAllTables(), bringActivatedMenu(), bringTakeOutOrders()]).then(
      axios.spread((...responses) => {
        setTakeOut(responses[0].data.tables[0]);
        const onlyTables = responses[0].data.tables.filter(
          (table) => table.sicktakId !== 0
        );
        setTables(onlyTables);
        setMenu(responses[1].data.menu);
        setTakeOutOrders(responses[2].data.takeOutOrders);
      })
    );
  }

  useEffect(() => {
    //테이블정보, 메뉴정보, 테이크아웃 주문 정보 데이터 불러오기
    bringDatas();

    //테이크아웃 주문 관련 소켓 이벤트 주시
    socket.on("aboutTakeOut", (data) => {
      if (data.what === "updateOrderForClerk") {
        setTakeOutOrders(data.takeOutOrders);
      } else if (data.what === "removeCard") {
        setTakeOutOrders(data.takeoutOrders);
      }
    });

    return () => {
      socket.off("aboutTakeOut");
    };
  }, []);

  return (
    <div id="order">
      {tables.length > 0 ? (
        <>
        {/* 주문페이지 좌측 테이블 주문 파트 */}
          <div id="orderLeft">
            <div id="tables">
              {tables.map((table) => (
                <Table
                  key={table.sicktakId}
                  tableId={table.sicktakId}
                  empty={table.isEmpty === 1 ? true : false}
                  menu={menu}
                  socket={socket}
                ></Table>
              ))}
            </div>
          </div>

          {/* 주문페이지 우측 테이크아웃 주문 파트 */}
          <div id="orderRight">
            <div id="takeOut">
              <TakeOut
                tableId={takeOut.sicktakId}
                menu={menu}
                socket={socket}
              ></TakeOut>
              <br></br>
              <br></br>
              <div id="toOrders">
                {takeOutOrders.map((tOO) => (
                  <OrderCard_Clerk
                    key={tOO.orderId}
                    orderId={tOO.orderId}
                    state={tOO.state}
                    price={tOO.totalPrice}
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
