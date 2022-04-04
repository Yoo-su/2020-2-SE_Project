import apiClient from "./client";

export const bringOrderDetail=(orderId)=>
    apiClient.get("/order/orderInfo", {
        params: { orderId: orderId },
    });

export const bringAllTables=()=>
    apiClient.get("/order/tables");

export const bringTableInfo=(tableId)=>
    apiClient.get("/order/tableInfo", {
         params: { tableId: tableId },
    })

export const enrollNewOrder=(orderData)=>
    apiClient.post("/order/newOrder",orderData)

export const changeStateToServed=(tableId)=>
    apiClient.get("/order/served", {
            params: { tableId: tableId },
    })

export const addOrder=(tableId,addedContents,addedPrice)=>
    apiClient.post("/order/newOrder",
        {
            tableId: tableId,
            content: addedContents,
            total: addedPrice,
        }
    )

export const payProcess=(tableId, orderContents, totalPrice, orderIds)=>
    apiClient.post("/order/payForOrder",
        {
            tableId: tableId,
            content: orderContents,
            total: totalPrice,
            orderIds: orderIds,
        })

export const orderCancel=(tableId)=>
    apiClient.get("/order/cancelOrder",
        { params: { tableId: tableId } })

export const setOrderStateToPrepared=(orderId)=>
    apiClient.get("/order/orderPrepared", {
        params: { orderId: orderId },
    })

export const terminateTakeoutOrder=(orderId,price,foods)=>
    apiClient.post("/order/recordTakeOut", {
        orderId: orderId,
        price: price,
        content: foods,})

export const bringTakeoutOrderContent=(orderId)=>
    apiClient.get("/order/takeOutContent", {
        params: { orderId: orderId },})

export const bringTakeOutOrders = () =>
  apiClient.get("/order/takeOutOrders");