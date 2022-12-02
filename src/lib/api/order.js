import apiClient from "./client";

export const getOrderDetail = (orderId) =>
  apiClient.get("/order/orderInfo", {
    params: { orderId: orderId },
  });

export const getAllTables = () => apiClient.get("/order/tables");

export const getTableInfo = (tableId) =>
  apiClient.get("/order/tableInfo", {
    params: { tableId: tableId },
  });

export const createNewOrder = (orderData) =>
  apiClient.post("/order/newOrder", orderData);

export const updateOrderStateToServed = (tableId) =>
  apiClient.get("/order/served", {
    params: { tableId: tableId },
  });

export const addOrder = (tableId, addedContents, addedPrice) =>
  apiClient.post("/order/newOrder", {
    tableId: tableId,
    content: addedContents,
    total: addedPrice,
  });

export const payProcess = (tableId, orderContents, totalPrice, orderIds) =>
  apiClient.post("/order/payForOrder", {
    tableId: tableId,
    content: orderContents,
    total: totalPrice,
    orderIds: orderIds,
  });

export const orderCancel = (tableId) =>
  apiClient.get("/order/cancelOrder", { params: { tableId: tableId } });

export const updateOrderStateToPrepared = (orderId) =>
  apiClient.get("/order/orderPrepared", {
    params: { orderId: orderId },
  });

export const deleteTakeoutOrder = (orderId, price, foods) =>
  apiClient.post("/order/recordTakeOut", {
    orderId: orderId,
    price: price,
    content: foods,
  });

export const getTakeoutOrderInfo = (orderId) =>
  apiClient.get("/order/takeOutContent", {
    params: { orderId: orderId },
  });

export const getTakeOutOrders = () => apiClient.get("/order/takeOutOrders");
