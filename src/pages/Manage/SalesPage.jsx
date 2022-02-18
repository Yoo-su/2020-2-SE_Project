import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchSalesInfo } from "../../lib/api/sales";
import "./SalesPage.css";

//판매정보 조회 페이지 컴포넌트
export default function SalesPage() {
  const [salesHistory, setSalesHistory] = useState([]);
  const [waitAvg, setWaitAvg] = useState("");
  const [spendAvg, setSpendAvg] = useState("");
  const [todayTableSales, setTTS] = useState(0);
  const [todayTakeOutSales, setTTOS] = useState(0);
  let number = 1;

  useEffect(() => {
    //컴포넌트 마운트 시 매장 판매기록 불러오기
    fetchSalesInfo()
      .then((res) => {
        if (res.data.success === true) {
          setSalesHistory(res.data.salesInfo);
          setTTS(res.data.todayTableSales);
          setTTOS(res.data.todayTakeOutSales);
          const wait = res.data.waitAvg.slice(0, 8);
          const spend = res.data.spendAvg.slice(0, 8);
          setWaitAvg(wait);
          setSpendAvg(spend);
        } else {
          console.log("failed");
        }
      });
  }, []);

  return (
    <div id="salesInfo">
      <div id="salesContent">
        <div id="salesHeader">
          <div id="salesTitle">
            <b>판매정보</b>
          </div>
          <div id="analysisInfo">
            <b>
              ●평균 주문 준비시간:{waitAvg}&nbsp;&nbsp;&nbsp; ●평균 고객
              매장이용시간:{spendAvg}
            </b>
            &nbsp;&nbsp;&nbsp;
            <b>
              ●금일 테이블 판매 수: {todayTableSales}&nbsp;&nbsp; ●금일
              테이크아웃 판매 수: {todayTakeOutSales}{" "}
            </b>
          </div>
        </div>
        <Table className="salesTable" striped bordered hover>
          <thead>
            <tr>
              <th>-</th>
              <th>주문타입</th>
              <th>총액</th>
              <th>주문시간</th>
              <th>준비시간</th>
              <th>결제시간</th>
              <th>주문메뉴</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory.map((sale) => (
              <tr key={sale.serialKey}>
                <td>{number++}</td>
                <td>
                  {sale.orderType === 0 ? (
                    "테이크아웃"
                  ) : (
                    <>{sale.orderType}번 테이블</>
                  )}
                </td>
                <td>{sale.orderPrice}원</td>
                <td>{sale.orderTime}</td>
                <td>{sale.cookTime}</td>
                <td>{sale.payTime}</td>
                <td>{sale.contentInOrder}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}