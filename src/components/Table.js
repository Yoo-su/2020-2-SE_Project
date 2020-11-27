import React, {useState,useEffect} from 'react';
import {Button, Modal,Alert,Spinner} from "react-bootstrap";
import axios from "axios";
import "./Table.css";

const Table=({tableId,empty,menu})=>{
    /* Table.js에서 할거 정리-> 컴포넌트 마운트될 때 딱 한번 서버로부터 테이블 관련 주문정보전부 가져오도록
    하고, 소켓 연결해서 'cook'이벤트 발생 시 다시 주문정보 가져오게 한다. 그리고 테이블에서 order버튼을
    통한 주문 발생 또는 Add버튼을 통한 추가주문 발생 시 소켓 'aboutOrder' 이벤트 발생시켜서 cook페이지에서
    반영할 수 있도록 한다. cancle버튼 또한 연결되서 cook에서 반영하도록.  */

    const [show,setShow]=useState(false);
    const [orderId,setOrderId]=useState(0);
    const [tableEmpty,setTableEmpty]=useState(empty);
    const [orderState,setOrderState]=useState("");
    const [orderContents,setOrderContents]=useState([]);
    const [addedContents,setAddedContents]=useState([]);
    const [totalPrice,setPrice]=useState(0);
    const [addedPrice,setAddedPrice]=useState(0);

    const [showOrderAlert,setOrderAlert]=useState(false);
    const [showPayAlert,setPayAlert]=useState(false);
    const [showCancleAlert,setCancleAlert]=useState(false);
    const [showAddAlert,setAddAlert]=useState(false);

    function bringTableInfo(){
        axios.get('http://localhost:3002/api/tableInfo',{params:{tableId:tableId}}).then(res=>{
            if(res.data.empty===true){
                setTableEmpty(true);
            }
            else if(res.data.empty===false){
                setTableEmpty(false);
                setOrderId(res.data.order[0].orderId);
                setOrderState(res.data.order[0].state);
                setOrderContents(res.data.content);
                setPrice(res.data.total);
            }
        })
    }

    useEffect(()=>{
     if(empty===false){
      bringTableInfo();
    }
    },[]);

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
        setTableEmpty(false);
        setOrderState("cooking");
    }
 

    const afterPay=()=>{
        setTimeout(()=>{
            setOrderContents([]);
            setAddedContents([]);
            setTableEmpty(true);
            setPrice(0);
            setOrderState("");
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
        setAddedPrice(0);
        setOrderState("");
        setCancleAlert(false);
    }
    return(
        <span id="aTable">
         <Button id="tableBtn" onClick={handleShow}>테이블{tableId}<br></br>{orderState==="cooking"?(
             <div id="curState1"><b>요리중..</b><br></br>
             <Spinner
               as="span"
               animation="grow"
               size="sm"
               role="status"
               aria-hidden="true"
             /></div>
         ):(<></>)}

         {orderState==="prepared"?(<>
          <div id="curState2"><b>준비완료!</b><br></br>
          🍳
          </div>
         </>):(<></>)}

         {orderState==="served"?(<>
         <div id="curState3">
          <b>서빙완료</b><br></br>
          😊
         </div>
         </>):(<></>)}
         </Button>

         <Modal size="lg" show={show} onHide={()=>{handleHide(); setCancleAlert(false); setAddedContents([]); setAddedPrice(0)}}>
         <Modal.Header closeButton>
         <Modal.Title><b>{tableId}번 테이블</b></Modal.Title>
        </Modal.Header>

        <Modal.Body>
         <div id="modalContent">
         <div className="selectedFoods" style={{float:"left",width:"45%",border:"2px solid",borderRadius:"10px",flex:"1"}}>
           <h2 style={{textAlign:"center",borderBottom:"1px solid"}}>주문 리스트</h2>
           {tableEmpty===true?(
               <div>
                     {addedContents.map(food=>(
                  <div key={Math.random()} style={{textAlign:"center"}}>
                  <b style={{color:"#668d3c"}}>{food.menuName} / {food.price}원<Button id="deleteFromAdd" onClick={()=>{
                      setAddedContents(addedContents.filter(cur=>cur.key!==food.key));
                      setAddedPrice(addedPrice-food.price);
                  }}>X</Button></b><br></br>
                  </div>
              ))}
               </div>
           ):(
               <div>
                   {orderContents.map(food=>(
                  <div key={Math.random()} style={{textAlign:"center"}}>
                  <b>{food.menuName} / {food.price}원</b><br></br>
                  </div>
              ))}

                  {addedContents.map(food=>(     
                  <div key={Math.random()} id={food.id} style={{textAlign:"center"}}>
                  <b style={{color:"#668d3c"}}>{food.menuName} / {food.price}원<Button id="deleteFromAdd" onClick={()=>{
                      setAddedContents(addedContents.filter(cur=>cur.key!==food.key));
                      setAddedPrice(addedPrice-food.price);
                  }}>X</Button></b><br></br>
                  </div>
              ))}
               </div>
               
           )}
              <div id="total" style={{textAlign:"center",float:"bottom"}}>
                  <b>합계: {tableEmpty===true?(addedPrice):(totalPrice+addedPrice)}원</b><br></br>
             </div>
         </div>
         <div className="servingFoods" style={{float:"right",width:"50%",border:"2px solid",borderRadius:"10px"}}>
             <h2 style={{textAlign:"center",borderBottom:"1px solid"}}>메뉴</h2>
             <div style={{margin:"8px",textAlign:"center",position:"relative"}}>
             {menu.map(food=>{
            return food.remainStock!==0?(
            <button key={Math.random()} id={food.menuName} style={{backgroundColor:"white",border:"1px solid #C6C6C6"}} onClick={()=>{
                setAddedContents(addedContents.concat({
                    key:Math.random(),
                    menuName:food.menuName,
                    price:food.price
                }));
               setAddedPrice(addedPrice+food.price);
            }}>
            <img id="foodImg" src={food.imgPath} alt={food.id} style={{width:"70px",height:"70px"}}></img><br></br>
            <b>{food.menuName}</b><br></br><label>{food.price}원</label>
            </button>):(
            <button key={Math.random()} id={food.menuName} style={{backgroundColor:"white",border:"1px solid #C6C6C6",opacity:"0.2"}} onClick={()=>{
                     alert('품절된 메뉴입니다.')
                 }}>
                 <img id="foodImg" src={food.imgPath} alt={food.id} style={{width:"70px",height:"70px"}}></img><br></br>
                 <b>{food.menuName}</b><br></br><label>{food.price}원</label>
                 </button>)
                 } )}
             </div>
         </div>
         </div>
        </Modal.Body>

        <Modal.Footer id="modal-foot">
            <div style={{float:"right"}}>
                  {tableEmpty===false?(
                  <Button variant="secondary" onClick={()=>{
                  setCancleAlert(true);
                  }} style={{height:"50px", marginRight:"5px"}}>cancle</Button>):(<></>)}
                  

               {tableEmpty===true?((<Button variant="primary" style={{height:"50px"}} onClick={()=>{
                   if(addedContents.length===0){
                       alert("선택된 음식이 없습니다");
                   }
                   else{
                    function newOrder(){
                        axios.post("http://localhost:3002/api/newOrder",{
                            tableId:tableId,
                            content:addedContents,
                            total:addedPrice
                        }).then(res=>{
                            if(res.data.success===true){console.log('success');}
                            else{console.log("server error");}
                        });
                    }
                    newOrder();
                    setPrice(addedPrice);
                    setAddedPrice(0);
                    afterOrder();
                    setOrderAlert(true);
                    autoOrderAlertRM();
                   }
            }}>주문</Button>)):(<></>)}

            {!tableEmpty&&orderState==="prepared"?( 
            <Button variant='warning' style={{height:"50px",marginRight:"5px"}} onClick={()=>{
                function changeToServed(){
                    axios.get('http://localhost:3002/api/served',{params:{tableId:tableId}}).then(res=>{
                        console.log(JSON.parse(res.data.success));
                    });
                }
                changeToServed();
                setOrderState("served");
            }}>서빙</Button>):(<></>)}

            {tableEmpty===false&&addedContents.length!==0?(
                <Button variant='info' style={{height:"50px",marginRight:"5px"}} onClick={()=>{
                setOrderContents(orderContents.concat(addedContents));
                setPrice(totalPrice+addedPrice);
                setAddedContents([]);
                setAddedPrice(0);
                setAddAlert(true);
                autoAddAlertRM();
            }}>추가</Button> 
            ):(<></>)}

            {tableEmpty===false&&addedContents.length===0?(<Button variant="danger" onClick={()=>{
                function payProcess(){
                    axios.post('http://localhost:3002/api/orderPay',{
                        tableId:tableId,
                        content:orderContents,
                        total:totalPrice,
                        orderId:orderId
                    }).then(res=>{
                        if(res.data.success===true){
                            console.log('success');
                        }
                    })
                }
                payProcess();
                afterPay();
                setPayAlert(true);
                autoPayAlertRM();
            }} style={{height:"50px"}}>결제</Button>):(<></>)}
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