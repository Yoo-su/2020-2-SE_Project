import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Pagination from "components/common/Pagination";
import useGetSalesInfo from "hooks/api/useGetSalesInfo";
import "./style.css";

//판매정보 조회 페이지 컴포넌트
export default function SalesPage() {
  const {
    loading, error,
    data, tableSalesCnt, takeoutSalesCnt,
    avgCustomerSpendTime, avgCustomerWaitTime,
    execute,
  } = useGetSalesInfo();

  //paging을 위한 변수
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    //컴포넌트 마운트 시 매장 판매기록 불러오기
    execute();
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
              ●평균 주문 준비시간:{avgCustomerWaitTime}&nbsp;&nbsp;&nbsp; ●평균 고객
              매장이용시간:{avgCustomerSpendTime}
            </b>
            &nbsp;&nbsp;&nbsp;
            <b>
              ●금일 테이블 판매 수: {tableSalesCnt}&nbsp;&nbsp; ●금일
              테이크아웃 판매 수: {takeoutSalesCnt}{" "}
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
            {data.slice(offset, offset + limit).map((sale, idx) => (
              <tr key={sale.serialKey}>
                <td>{idx}</td>
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
        <Pagination
          total={data.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}