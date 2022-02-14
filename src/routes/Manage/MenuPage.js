import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMenuModal from "../../components/Master/AddMenuModal";
import MenuCard from "../../components/Master/MenuCard";
import "./MenuPage.css";

function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setEditBtn] = useState(true);

  const modalOff = () => {
    setShow(false);
  };

  useEffect(() => {
    axios.get("https://every-server.herokuapp.com/api/allMenu").then((res) => {
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
      <AddMenuModal show={show} setShow={modalOff}></AddMenuModal>
    </div>
  );
}

export default MenuPage;
