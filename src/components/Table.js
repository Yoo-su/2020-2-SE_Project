import React, {useState} from 'react';
import {Button, Modal,Alert} from "react-bootstrap";
import TestFoods from "../testApi/foods.json";
import "./Table.css";

const Table=({tableName})=>{
    const [show,setShow]=useState(false);
    const [pickFoods,setpickFoods]=useState([]);
    const [totalPrice,setPrice]=useState(0);
    const [spendTime,setSpend]=useState(Date.now());
    const [isorder,setIsorder]=useState(false);
    const [showOrderAlert,setOrderAlert]=useState(false);
    const [showPayAlert,setPayAlert]=useState(false);
    const [showCancleAlert,setCancleAlert]=useState(false);

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

    const afterOrder=()=>{
        setTimeout(()=>{
          setIsorder(true);
        },1500);
    }

    const afterPay=()=>{
        setTimeout(()=>{
            setpickFoods([]);
            setPrice(0);
            setIsorder(false);
            setShow(false);
        },1500)
    };

    function handleHide(){setShow(false);};
    function handleShow(){setShow(true);};
    function resetOrder(){setpickFoods([]); setPrice(0);}
    return(
        <span>
         <Button id="tableBtn" onClick={handleShow}>{tableName}</Button>

         <Modal size="lg" show={show} onHide={()=>{handleHide(); setCancleAlert(false);}}>
         <Modal.Header closeButton>
         <Modal.Title><b>{tableName}</b></Modal.Title>
        </Modal.Header>

        <Modal.Body>
         <div className="selectedFoods" style={{float:"left",width:"45%",border:"2px solid",borderRadius:"10px",flex:"1"}}>
           <h2 style={{textAlign:"center",borderBottom:"1px solid"}}>Ordered List</h2>
           <div>
              {pickFoods.map(food=>(
                  <div key={Math.random()} id={food.id} style={{textAlign:"center"}}>
                  <b>{food.name} / {food.price}원<button onClick={()=>{
                      setpickFoods(pickFoods.filter(cur=>cur.key!==food.key));
                      setPrice(totalPrice-food.price);
                  }}>X</button></b><br></br>
                  </div>
              ))}
           </div>
              <div id="total" style={{textAlign:"center",float:"bottom"}}>
                  <b>합계: {totalPrice}원</b><br></br>
             </div>
         </div>
         <div className="servingFoods" style={{float:"right",width:"50%",border:"2px solid",borderRadius:"10px"}}>
             <h2 style={{textAlign:"center",borderBottom:"1px solid"}}>Foods</h2>
             <div style={{margin:"8px",textAlign:"center"}}>
             {TestFoods.foods.map(food=>(
                 <button key={Math.random()} id={food.id} style={{backgroundColor:"white",border:"1px solid #C6C6C6"}} onClick={()=>{
                     setpickFoods(pickFoods.concat({
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
        </Modal.Body>

        <Modal.Footer id="modal-foot">
            <div style={{float:"right"}}>
              <Button variant="secondary" onClick={()=>{
                  setCancleAlert(true);
                  }} style={{height:"50px", marginRight:"5px"}}>cancle</Button>

               {isorder?(<></>):(<Button variant="primary" style={{height:"50px"}} onClick={()=>{
                   if(pickFoods.length===0){
                       alert("선택된 음식이 없습니다");
                   }
                   else{
                    setSpend(Date.now());
                    afterOrder();
                    setOrderAlert(true);
                    autoOrderAlertRM();
                   }
            }}>Order Complete</Button>)}
            {isorder?(<Button variant="danger" onClick={()=>{
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
                resetOrder();
                handleHide();
                setIsorder(false);
                setCancleAlert(false);
             }}>O</Button><Button style={{ borderRadius:"10px"}} variant="danger" onClick={()=>{
                 setCancleAlert(false);
             }}>X</Button></b></Alert>
             <Alert show={showOrderAlert} variant="success"><b>주문 완료!</b></Alert>
             <Alert show={showPayAlert} variant="success"><b>결제 완료!</b></Alert>
       </div>
        </Modal.Footer>
       </Modal>      
        </span>
    );
}

export default Table;