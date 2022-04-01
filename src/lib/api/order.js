import axios from 'axios';

export const bringOrderDetail=(orderId)=>
    axios.get("https://every-server.herokuapp.com/api/order/orderInfo", {
        params: { orderId: orderId },
    });

export const bringAllTables=()=>
    axios.get("https://every-server.herokuapp.com/api/order/tables");

export const bringTableInfo=(tableId)=>
    axios.get("https://every-server.herokuapp.com/api/order/tableInfo", {
         params: { tableId: tableId },
    })

export const enrollNewOrder=(orderData)=>
    axios.post("https://every-server.herokuapp.com/api/order/newOrder",orderData)

export const changeStateToServed=(tableId)=>
    axios.get("https://every-server.herokuapp.com/api/order/served", {
            params: { tableId: tableId },
    })

export const addOrder=(tableId,addedContents,addedPrice)=>
    axios.post("https://every-server.herokuapp.com/api/order/newOrder",
        {
            tableId: tableId,
            content: addedContents,
            total: addedPrice,
        }
    )

export const payProcess=(tableId, orderContents, totalPrice, orderIds)=>
    axios.post("https://every-server.herokuapp.com/api/order/payForOrder",
        {
            tableId: tableId,
            content: orderContents,
            total: totalPrice,
            orderIds: orderIds,
        })

export const orderCancel=(tableId)=>
    axios.get("https://every-server.herokuapp.com/api/order/cancelOrder",
        { params: { tableId: tableId } })

export const setOrderStateToPrepared=(orderId)=>
    axios.get("https://every-server.herokuapp.com/api/order/orderPrepared", {
        params: { orderId: orderId },
    })

export const terminateTakeoutOrder=(orderId,price,foods)=>
    axios.post("https://every-server.herokuapp.com/api/order/recordTakeOut", {
        orderId: orderId,
        price: price,
        content: foods,})

export const bringTakeoutOrderContent=(orderId)=>
    axios.get("https://every-server.herokuapp.com/api/order/takeOutContent", {
        params: { orderId: orderId },})

export const bringTakeOutOrders = () =>
  axios.get("https://every-server.herokuapp.com/api/order/takeOutOrders");