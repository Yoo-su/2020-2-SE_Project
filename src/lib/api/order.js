import axios from 'axios';

export const bringOrderDetail=(orderId)=>
    axios.get("https://every-server.herokuapp.com/api/forOrderCard", {
        params: { orderId: orderId },
    });

export const bringAllTables=()=>
    axios.get("https://every-server.herokuapp.com/api/tables");

export const bringTableInfo=(tableId)=>
    axios.get("https://every-server.herokuapp.com/api/tableInfo", {
         params: { tableId: tableId },
    })

export const enrollNewOrder=(orderData)=>
    axios.post("https://every-server.herokuapp.com/api/newOrder",orderData)

export const changeStateToServed=(tableId)=>
    axios.get("https://every-server.herokuapp.com/api/served", {
            params: { tableId: tableId },
    })

export const addOrder=(tableId,addedContents,addedPrice)=>
    axios.post("https://every-server.herokuapp.com/api/addOrder",
        {
            tableId: tableId,
            content: addedContents,
            total: addedPrice,
        }
    )

export const payProcess=(tableId, orderContents, totalPrice, orderIds)=>
    axios.post("https://every-server.herokuapp.com/api/orderPay",
        {
            tableId: tableId,
            content: orderContents,
            total: totalPrice,
            orderIds: orderIds,
        })

export const orderCancle=(tableId)=>
    axios.get("https://every-server.herokuapp.com/api/orderCancle",
        { params: { tableId: tableId } })

export const setOrderStateToPrepared=(orderId)=>
    axios.get("https://every-server.herokuapp.com/api/cookComplete", {
        params: { orderId: orderId },
    })

export const terminateTakeoutOrder=(orderId,price,foods)=>
    axios.post("https://every-server.herokuapp.com/api/takeOutEnd", {
        orderId: orderId,
        price: price,
        content: foods,})

export const bringTakeoutOrderContent=(orderId)=>
    axios.get("https://every-server.herokuapp.com/api/takeOutContent", {
        params: { orderId: orderId },})

export const bringTakeOutOrders = () =>
  axios.get("https://every-server.herokuapp.com/api/takeOutOrders");