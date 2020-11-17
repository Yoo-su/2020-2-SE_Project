import React, {useState,useEffect} from 'react';
import {Button, Modal,Alert,Spinner} from "react-bootstrap";
import axios from "axios";
import TestFoods from "../testApi/foods.json";
import "./Table.css";
import io from "socket.io-client";

const Table=({tableName})=>{
    /*앞으로 할것: 테이블 id를 통해 서버에 get요청해서 테이블 관련 order 정보 가져온다.
    빈 테이블인 경우 음식을 담고 주문버튼을 누르면, order정보를 order api에 전송.
    */

    const [show,setShow]=useState(false);
    const [tableEmpty,setTableEmpty]=useState(true);
    const [orderState,setOrderState]=useState("");
    const [orderContents,setOrderContents]=useState([]);
    const [addedContents,setAddedContents]=useState([]);
    const [totalPrice,setPrice]=useState(0);
    const [spendTime,setSpend]=useState(null);

    const [showOrderBtn,setOrderBtn]=useState(true);
    const [showPayBtn,setPayBtn]=useState(false);
    const [showOrderAlert,setOrderAlert]=useState(false);
    const [showPayAlert,setPayAlert]=useState(false);
    const [showCancleAlert,setCancleAlert]=useState(false);
    const [showAddAlert,setAddAlert]=useState(false);

    const autoOrderAlertRM=()=>{
       setTimeout(()=>{
           setOrderAlert(false);
       },1500);
    };

    const autoPayAlertRM=()=>{
        setTimeout(()=>{
            setPayAlert(false);
          },1500);
    };

    const autoAddAlertRM=()=>{
        setTimeout(()=>{
            setAddAlert(false);
          },1500);
    };

    const afterOrder=()=>{
        setOrderContents(addedContents);
        setAddedContents([]);
        setOrderBtn(false);
        setTableEmpty(false);
        setOrderState("cooking");
        setTimeout(()=>{
          setPayBtn(true);
        },1500);
    }
 
    const countSales=()=>{
        for(let i=0;i<orderContents.length;i++){
            TestFoods.foods.find(food=>food.name===orderContents[i].name).hotpoint+=1;
            TestFoods.foods.find(food=>food.name===orderContents[i].name).ownSales+=orderContents[i].price;
        }
    }

    const afterPay=()=>{
        setTimeout(()=>{
            countSales();
            setOrderContents([]);
            setAddedContents([]);
            setTableEmpty(true);
            setPrice(0);
            setOrderState("");
            setPayBtn(false);
            setOrderBtn(true);
            setShow(false);
        },1500)
    };

    function handleHide(){setShow(false);};
    function handleShow(){setShow(true);};
    function resetOrder(){
        setOrderContents([]);
        setAddedContents([]);
        setTableEmpty(true);
        setPrice(0);
        setOrderState("");
        setOrderBtn(true);
        setPayBtn(false);
        setCancleAlert(false);
    }
    return(
        <span id="aTable">
         <Button id="tableBtn" onClick={handleShow}>{tableName}<br></br>{orderState==="cooking"?(
             <><div id="curState1"><b>Cooking..</b><br></br>
             <Spinner
               as="span"
               animation="grow"
               size="sm"
               role="status"
               aria-hidden="true"
             /></div></>
         ):(<></>)}
         {}
         </Button>

         <Modal size="lg" show={show} onHide={()=>{handleHide(); setCancleAlert(false); setAddedContents([]);}}>
         <Modal.Header closeButton>
         <Modal.Title><b>{tableName}</b></Modal.Title>
        </Modal.Header>

        <Modal.Body>
         <div id="modalContent">
         <div className="selectedFoods" style={{float:"left",width:"45%",border:"2px solid",borderRadius:"10px",flex:"1"}}>
           <h2 style={{textAlign:"center",borderBottom:"1px solid"}}>Ordered List</h2>
           {tableEmpty===true?(
               <div>
                     {addedContents.map(food=>(
                  <div key={Math.random()} id={food.id} style={{textAlign:"center"}}>
                  <b style={{color:"#668d3c"}}>{food.name} / {food.price}원<button onClick={()=>{
                      setAddedContents(addedContents.filter(cur=>cur.key!==food.key));
                      setPrice(totalPrice-food.price);
                  }}>X</button></b><br></br>
                  </div>
              ))}
               </div>
           ):(
               <div>
                   {orderContents.map(food=>(
                  <div key={Math.random()} id={food.id} style={{textAlign:"center"}}>
                  <b>{food.name} / {food.price}원<button onClick={()=>{
                      setOrderContents(orderContents.filter(cur=>cur.key!==food.key));
                      setPrice(totalPrice-food.price);
                  }}>X</button></b><br></br>
                  </div>
              ))}

                  {addedContents.map(food=>(     
                  <div key={Math.random()} id={food.id} style={{textAlign:"center"}}>
                  <b style={{color:"#668d3c"}}>{food.name} / {food.price}원<button onClick={()=>{
                      setAddedContents(addedContents.filter(cur=>cur.key!==food.key));
                      setPrice(totalPrice-food.price);
                  }}>X</button></b><br></br>
                  </div>
              ))}
               </div>
               
           )}
              <div id="total" style={{textAlign:"center",float:"bottom"}}>
                  <b>합계: {totalPrice}원</b><br></br>
             </div>
         </div>
         <div className="servingFoods" style={{float:"right",width:"50%",border:"2px solid",borderRadius:"10px"}}>
             <h2 style={{textAlign:"center",borderBottom:"1px solid"}}>Foods</h2>
             <div style={{margin:"8px",textAlign:"center",position:"relative"}}>
             {TestFoods.foods.map(food=>(
                 <button key={Math.random()} id={food.id} style={{backgroundColor:"white",border:"1px solid #C6C6C6"}} onClick={()=>{
                     setAddedContents(addedContents.concat({
                         key:Math.random(),
                         id:food.id,
                         name:food.name,
                         price:food.price
                     }));
                    setPrice(totalPrice+food.price);
                 }}>
                 <img id="foodImg" src={food.foodImgs[0]} alt={food.id}></img><br></br>
                 <b>{food.name}</b><br></br><label>{food.price}원</label>
                 </button>
             ))}
             </div>
         </div>
         </div>
        </Modal.Body>

        <Modal.Footer id="modal-foot">
            <div style={{float:"right"}}>
              <Button variant="secondary" onClick={()=>{
                  setCancleAlert(true);
                  }} style={{height:"50px", marginRight:"5px"}}>cancle</Button>

               {showOrderBtn?((<Button variant="primary" style={{height:"50px"}} onClick={()=>{
                   if(addedContents.length===0){
                       alert("선택된 음식이 없습니다");
                   }
                   else{
                    setSpend(Date.now());
                    afterOrder();
                    setOrderAlert(true);
                    autoOrderAlertRM();
                   }
            }}>Order Complete</Button>)):(<></>)}

            {tableEmpty?(<></>):(<>
            <Button variant='info' style={{height:"50px",marginRight:"5px"}} onClick={()=>{
                if(addedContents.length===0){
                    alert("추가된 음식이 없습니다");
                }else{
                setOrderContents(orderContents.concat(addedContents));
                setAddedContents([]);
                setAddAlert(true);
                autoAddAlertRM();}
            }}>add</Button>
            </>)}

            {showPayBtn?(<Button variant="danger" onClick={()=>{
                console.log("고객이 머무른 시간:",(Date.now()-spendTime)/1000,"초");
                afterPay();
                setPayAlert(true);
                autoPayAlertRM();
            }} style={{height:"50px"}}>Pay</Button>):(<></>)}
            </div>
            <div style={{float:"left"}}>
             <Alert show={showCancleAlert} variant="danger"><b>주문을 삭제하시겠습니까? <Button variant="danger" style={{marginRight:"5px",
             borderRadius:"10px"}}
             onClick={()=>{
                handleHide();
                resetOrder();
             }}>O</Button><Button style={{ borderRadius:"10px"}} variant="danger" onClick={()=>{
                 setCancleAlert(false);
             }}>X</Button></b></Alert>
             <Alert show={showOrderAlert} variant="success"><b>주문 완료!</b></Alert>
             <Alert show={showPayAlert} variant="success"><b>결제 완료!</b></Alert>
             <Alert show={showAddAlert} variant="success"><b>추가 완료!</b></Alert>
       </div>
        </Modal.Footer>
       </Modal>      
        </span>
    );
}

export default Table;