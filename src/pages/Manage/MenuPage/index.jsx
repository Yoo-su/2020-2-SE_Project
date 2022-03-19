import React, { useState, useEffect } from "react";
import AddMenuModal from "../../../components/Manage/AddMenuModal";
import MenuCard from "../../../components/Manage/MenuCard";
import { bringAllMenu } from "../../../lib/api/menu";
import "./style.css";

//매장 메뉴 조회 및 관리 페이지 컴포넌트
export default function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setEditBtn] = useState(true);

  const modalOnOff = () => {
    setShow(!show);
  };

  useEffect(() => {
    //컴포넌트 마운트 시 모든 메뉴정보 불러오기
    bringAllMenu()
    .then((res) => {
      if (res.data.success === true) {
        setFoods(res.data.menu);
      } else console.log("error");
    });
  }, []);
  return (
    <div id="menuPage">
      <div id="menuPageHeader" style={{ textAlign: "center" }}>
        <b>MENU</b>
        <br></br>
        <button
          id="addMenuBtn"
          style={{ float: "right", marginLeft: "5px" }}
          onClick={() => {
            setShow(!show);
          }}
        >
          메뉴 추가
        </button>
        {showEditBtn ? (
          <button
            id="editMenuBtn"
            style={{ float: "right" }}
            onClick={() => {
              setEditMode(!editMode);
              setEditBtn(!showEditBtn);
            }}
          >
            편집
          </button>
        ) : (
          <button
            id="cmpEditBtn"
            style={{ float: "right" }}
            onClick={() => {
              setEditMode(!editMode);
              setEditBtn(!showEditBtn);
            }}
          >
            완료
          </button>
        )}
        <br></br>
      </div>
      <div id="menus" style={{ margin: "20px", textAlign: "center" }}>
        {foods.map((food) => (
          <MenuCard
            key={food.menuName}
            activate={food.activate}
            menuName={food.menuName}
            showBtn={editMode}
            imgPath={food.imgPath}
            price={food.price}
            sales={food.sales}
            remain={food.remainStock}
          ></MenuCard>
        ))}
      </div>
      <AddMenuModal show={show} setShow={modalOnOff}></AddMenuModal>
    </div>
  );
}

