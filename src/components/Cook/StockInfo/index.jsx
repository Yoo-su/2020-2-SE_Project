import React, { useState } from "react";
import { addMenuStock } from "../../../lib/api/menu";
import "./style.css";

//메뉴 재고 추가 관련 컴포넌트
export default function StockInfo({ menuName, stockRemain, stockPrice }) {
  const [amount, setAmount] = useState(stockRemain);
  const [stockInput, setStockInput] = useState(false);
  const [newAmount, setNewAmount] = useState(0);

  function handleAmountChange(e) {
    setNewAmount(e.target.value);
  }

  return (
    <>
      {!stockInput ? (
        <>
          {amount}개&nbsp;
          <button
            className="addStockBtn"
            variant="info"
            size="sm"
            onClick={() => {
              setStockInput(!stockInput);
            }}
          >
            +
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            placeholder="추가할 수량 입력.."
            onChange={handleAmountChange}
          ></input>
          &nbsp;
          <button
            className="cmpAddStockBtn"
            onClick={() => {
              if (newAmount < 0) alert("추가 수량을 확인해주세요");
              else {
                addMenuStock(menuName, newAmount, stockPrice)
                  .then((res) => {
                    if (res.data.success === true) {
                      console.log("재고 추가 완료");
                      setAmount(parseInt(amount) + parseInt(newAmount));
                    } else {
                      console.log("재고 업데이트 실패");
                    }
                  });
              }

              setNewAmount(0);
              setStockInput(!stockInput);
            }}
          >
            완료
          </button>
          &nbsp;
          <button
            className="cancleAddBtn"
            size="sm"
            variant="secondary"
            onClick={() => {
              setStockInput(!stockInput);
            }}
          >
            취소
          </button>
        </>
      )}
    </>
  );
}

