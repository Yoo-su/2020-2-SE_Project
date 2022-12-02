import React, { useState, useEffect } from "react";
import AddMenuModal from "components/Manage/AddMenuModal";
import MenuCard from "components/Manage/MenuCard";
import useGetAllMenus from "hooks/api/useGetAllMenus";
import { menuImgs } from "./sampleImgs";
import "./style.css";

//매장 메뉴 조회 및 관리 페이지 컴포넌트
export default function MenuPage() {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setEditBtn] = useState(true);
  const { loading, error, data, execute } = useGetAllMenus();

  const modalOnOff = () => {
    setShow(!show);
  };

  useEffect(() => {
    //컴포넌트 마운트 시 모든 메뉴정보 불러오기
    execute();
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
        {data.map((menu, idx) => (
          <MenuCard
            key={menu.menuName}
            activate={menu.activate}
            menuName={menu.menuName}
            showBtn={editMode}
            imgPath={menuImgs[idx]}
            price={menu.price}
            sales={menu.sales}
            remain={menu.remainStock}
          ></MenuCard>
        ))}
      </div>
      <AddMenuModal show={show} setShow={modalOnOff}></AddMenuModal>
    </div>
  );
}

