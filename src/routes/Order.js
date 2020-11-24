import React,{useState,useEffect} from "react";
import "./Order.css";
import Table from "../components/Table";
import TakeOut from "../components/TakeOut";
import TakeOutOrders from "../components/TakeOutOrders";
import io from "socket.io-client";
import axios from "axios";

function Order(){
  /* Order.js 정리한다. 컴포넌트 마운트될 때 딱 한번 서버로부터 식탁들, 테이크아웃 주문들, 메뉴정보 불러오도록
  하고 소켓을 'cook' 이벤트에 대해 응답하도록 설정해서 이벤트 발생 시 서버로부터 테이크아웃 주문들만 새로
  가져오도록 설계한다. 식탁이나 메뉴정보는 실시간 반영이 필요한건 아니니 새로고침한번 하면 가져오게 해도 된다.
  식탁데이터 전용 axios, 테이크아웃주문 axios, 메뉴정보 axios 각각 만들어서 컴포넌트 마운트될 땐 axios.all을 통해
  가져오고 'cook'이벤트 발생시엔 테이크아웃 주문 axios만 요청해서 state지정해준다.  */

  const [tables,setTables]=useState([]);
  const [takeOut,setTakeOut]=useState([]);
  const [takeOutOrders,setTakeOutOrders]=useState([]);
  const [menu,setMenu]=useState([]);
  const socket=io("http://localhost:3002",{transports: ['websocket']});
  
  const requestTables=axios.get('http://localhost:3002/api/tables');
  const requestMenu=axios.get('http://localhost:3002/api/menu');
  const requestTakeOutOrders=axios.get('http://localhost:3002/api/takeOutOrders');

  function bringDatas(){
    axios.all([requestTables,requestMenu,requestTakeOutOrders]).then(axios.spread((...responses)=>{
      setTakeOut(responses[0].data.tables[0]);
      const onlyTables=responses[0].data.tables.filter(table=>table.sicktakId!==0);
      setTables(onlyTables);
      setMenu(responses[1].data.menu);
      setTakeOutOrders(responses[2].data.takeOutOrders);  
    }))
  };

  useEffect(()=>{
    console.log("order.js 마운트 된 상태");
    socket.on('aboutCook',(data)=>{
      axios.get('http://localhost:3002/api/takeOutOrders').then(res=>{
        setTakeOutOrders(res.data.takeOutOrders);
      })
    });
    socket.on('aboutOrder',(data)=>{
         window.location.reload();
    })
    bringDatas();
  },[]);

    return(
      <div id="order">
        {tables.length>0&&menu.length>0?(<>
          <div id="tables">
             {tables.map(table=>(
               <span id="table" key={table.sicktakId}>
                <Table tableId={table.sicktakId} empty={table.isEmpty===1?true:false} menu={menu}></Table>
               </span>
              ))}
         </div>
         <div id="takeOut">
           <TakeOut tableId={takeOut.sicktakId} menu={menu}></TakeOut><br></br><br></br>
           <div id="toOrders">
           {takeOutOrders.map(tOO=>(
             <TakeOutOrders key={tOO.orderId} orderId={tOO.orderId} state={tOO.state}></TakeOutOrders>
           ))}
          </div>
         </div>
        </>):(<div style={{position:"relative",textAlign:"center",marginTop:"200px"}}>
          <b style={{fontSize:"30px"}}>불러오는 중...</b>
        </div>)}
         
      </div>
    );
}

export default Order;
