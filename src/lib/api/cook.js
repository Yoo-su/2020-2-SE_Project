import apiClient from "./client";

export const bringAllOrders=()=>
    apiClient.get("/cook/allOrders");