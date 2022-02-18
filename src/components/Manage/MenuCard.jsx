import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { setMenuActivation } from "../../lib/api/menu";
import "./MenuCard.css";

//메뉴 정보 카드 컴포넌트
export default function MenuCard({
  activate,
  showBtn,
  menuName,
  imgPath,
  price,
  sales,
  remain,
}) {
  const [acti, setActi] = useState(activate);

  {/* 활성화된 메뉴 카드 */}
  const card1 = (
    <Card className="card1" border="gray">
      <Card.Img variant="top" src={imgPath}></Card.Img>
      <Card.Body>
        <Card.Title className="card_menuName">{menuName}</Card.Title>
        <Card.Text>
          {price}원 <br></br>
          누적판매량: <b>{sales}</b> <br></br>
          재고량: <b>{remain}</b>
          <br></br>
          {showBtn ? (
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setMenuActivation(menuName,0)
                .then((res) => {
                  if (res.data.success === true) {
                    setActi(0);
                  } else {
                    alert("오류발생");
                  }
                });
              }}
            >
              비활성화
            </Button>
          ) : (
            <></>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );

  {/* 비활성화된 메뉴 카드 */}
  const card2 = (
    <Card className="card2" border="gray">
      <Card.Img variant="top" src={imgPath}></Card.Img>
      <Card.Body>
        <Card.Title className="card_menuName" style={{ opacity: "0.5" }}>
          {menuName}
        </Card.Title>
        <Card.Text>
          <span style={{ opacity: "0.5" }}>
            {price}원 <br></br>
            누적판매량: <b>{sales}</b> <br></br>
            재고량: <b>{remain}</b>
            <br></br>
          </span>
          {showBtn ? (
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                setMenuActivation(menuName,1)
                .then((res) => {
                  if (res.data.success === true) {
                    setActi(1);
                  } else {
                    alert("오류발생");
                  }
                });
              }}
            >
              활성화
            </Button>
          ) : (
            <></>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );

  return <div>{acti === 1 ? card1 : card2}</div>;
}

