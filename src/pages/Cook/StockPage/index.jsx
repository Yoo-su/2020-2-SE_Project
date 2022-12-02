import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import StockInfo from "components/Cook/StockInfo";
import useGetAllMenus from "hooks/api/useGetAllMenus";
import "./style.css";

//메뉴 재고조회 및 관리 페이지 컴포넌트
export default function StockPage() {
  const { loading, error, data, execute } = useGetAllMenus();

  useEffect(() => {
    execute();
  }, []);
  return (
    <div id="stockPage">
      <div id="stockPageTitle">
        <b>재고관리</b>
      </div>
      <br></br>
      <Table id="stockTable" striped bordered hover>
        <thead>
          <tr>
            <th>-</th>
            <th>재고명</th>
            <th style={{ width: "25%" }}>남은수량</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {data.map((menu, idx) => (
            <tr key={idx}>
              <td>{idx}</td>
              <td>{menu.menuName}</td>
              <td>
                <StockInfo
                  menuName={menu.menuName}
                  stockRemain={menu.remainStock}
                  stockPrice={menu.stockPrice}
                ></StockInfo>
              </td>
              <td>{menu.stockPrice}원</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

