import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import StockInfo from "../../../components/Cook/StockInfo";
import { bringAllMenu } from "../../../lib/api/menu";
import "./style.css";

//메뉴 재고조회 및 관리 페이지 컴포넌트
export default function StockPage() {
  const [menu, setMenu] = useState([]);
  let number = 1;

  useEffect(() => {
    //모든 메뉴정보 불러오기
    bringAllMenu().then((res) => {
      if (res.data.success === true) {
        setMenu(res.data.menu);
      }
    });
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
          {menu.map((one) => (
            <tr key={one.menuName}>
              <td>{number++}</td>
              <td>{one.menuName}</td>
              <td>
                <StockInfo
                  menuName={one.menuName}
                  stockRemain={one.remainStock}
                  stockPrice={one.stockPrice}
                ></StockInfo>
              </td>
              <td>{one.stockPrice}원</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

