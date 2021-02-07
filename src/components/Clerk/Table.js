import React, {useState,useEffect} from 'react';
import {Button, Modal,Alert,Spinner} from "react-bootstrap";
import axios from "axios";
import io from 'socket.io-client';
import "./Table.css";

const Table=({tableId,empty,menu})=>{
    const [show,setShow]=useState(false);
    const [orderIds,setorderIds]=useState([]);
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
    const socket=io.connect('http://localhost:3002',{ transports: ['websocket'] });

    function applyInfo(data){
        setTableEmpty(false);
        setorderIds(data.order);
        setOrderState(data.state);
        setOrderContents(data.content);
        setPrice(data.total);
    }

    function bringTableInfo(){
        console.log(tableId,'번 테이블에서 정보 가져오는 중..');
        axios.get('http://localhost:3002/api/tableInfo',{params:{tableId:tableId}}).then(res=>{
                if(res.data.success===true){
                    applyInfo(res.data);
                    console.log('가져오기 완료');
                }
        })
    }

    useEffect(()=>{
        if(tableEmpty===false){
            bringTableInfo();
           }
        socket.on('tablePrepared',(data)=>{
            if(data.tableId===tableId){
                setOrderState("prepared");
            }
          })
        socket.on('aboutTable',(data)=>{
            if(data.what==='three'&&Number(data.tableId)===tableId){
                console.log(data,'확인해보자');
                applyInfo(data);
            }else if(data.what==='cancle'&&data.tableId===tableId){
                console.log('취소이벤트 감지');
                resetOrder();
            }else if(data.what==='pay'&&data.tableId===tableId){
                console.log('결제이벤트 감지');
                resetOrder();
            }
        })
        return ()=>{
            socket.off('tablePrepared');
            socket.off('aboutTable');
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

    const resetOrderState=()=>{
        if(orderState===""){
            setOrderState("cooking");
        }else if(orderState==="prepared"){
            setOrderState("prepared");
        }else if(orderState==="served"){
            setOrderState('cooking');
        }
    }

    const afterOrder=()=>{
        setTableEmpty(false);
        setOrderContents(addedContents);
        setAddedContents([]);
        setPrice(totalPrice+addedPrice);
        setAddedPrice(0);
        resetOrderState();
        setOrderAlert(true);
        autoOrderAlertRM(); 
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
             <div id="curState1"><b>준비중..</b><br></br>
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
          ✓
          </div>
         </>):(<></>)}

         {orderState==="served"?(<>
         <div id="curState3">
          <b>서빙완료</b><br></br>
          ✓
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
            return food.activate!==0?(
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
                     alert('비활성화된 메뉴입니다.');
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
                        const orderData={
                            tableId:tableId,
                            content:addedContents,
                            total:addedPrice,
                            oldContent:orderContents,
                            oldTotal:totalPrice
                        }
                        axios.post("http://localhost:3002/api/newOrder",orderData).then(res=>{
                            if(res.data.success===true){
                                console.log('success');
                                socket.emit('orderEvent',{what:'order',tableId:tableId});
                                
                            }
                            else{console.log("server error");}
                        });
                    }
                    newOrder();
                    afterOrder();
                   }
            }}>주문</Button>)):(<></>)}

            {!tableEmpty&&orderState==="prepared"?( 
            <Button variant='warning' style={{height:"50px",marginRight:"5px"}} onClick={()=>{
                function changeToServed(){
                    axios.get('http://localhost:3002/api/served',{params:{tableId:tableId}}).then(res=>{
                        if(res.data.success===true){
                            console.log('서빙 이벤트 전송');
                            socket.emit('orderEvent',{what:'served',tableId:tableId});
                        }
                    });
                }
                changeToServed();
            }}>서빙</Button>):(<></>)}

            {tableEmpty===false&&addedContents.length!==0?(
                <Button variant='info' style={{height:"50px",marginRight:"5px"}} onClick={()=>{
                    function addOrder(){
                        axios.post('http://localhost:3002/api/addOrder',{tableId:tableId,content:addedContents,total:addedPrice}).then(res=>{
                            if(res.data.success===true){
                                console.log('추가완료');
                                socket.emit('orderEvent',{what:'add',tableId:tableId}); 
                            }
                        })
                    }
                addOrder();
                setOrderContents(orderContents.concat(addedContents));
                setPrice(totalPrice+addedPrice);
                setAddedContents([]);
                setAddedPrice(0); 
                resetOrderState();
                setAddAlert(true);
                autoAddAlertRM();
            }}>추가</Button> 
            ):(<></>)}

            {tableEmpty===false&&addedContents.length===0&&orderState==='served'?(<Button variant="danger" onClick={()=>{
                function payProcess(){
                    axios.post('http://localhost:3002/api/orderPay',{
                        tableId:tableId,
                        content:orderContents,
                        total:totalPrice,
                        orderIds:orderIds
                    }).then(res=>{
                        if(res.data.success===true){
                            socket.emit('orderEvent',{what:'pay',tableId:tableId});
                            console.log('결제처리 완료');
                        }
                    })
                }
                afterPay();
                payProcess();
                setPayAlert(true);
                autoPayAlertRM();
            }} style={{height:"50px"}}>결제</Button>):(<></>)}
            </div>
            <div style={{float:"left"}}>
             <Alert show={showCancleAlert} variant="danger"><b>주문을 삭제하시겠습니까? <Button variant="danger" style={{marginRight:"5px",
             borderRadius:"10px"}}
             onClick={()=>{
                function orderCancle(){
                    axios.get('http://localhost:3002/api/orderCancle',{params:{tableId:tableId}}).then(res=>{
                        if(res.data.success===true){
                            console.log('주문취소 성공, 취소 이벤트 전송');
                            socket.emit('orderEvent',{what:'cancle',tableId:tableId});
                        }else{alert('취소실패');}
                    })
                }
                orderCancle();
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