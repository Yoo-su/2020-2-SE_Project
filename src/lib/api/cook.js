import apiClient from "./client";

export const getAllOrders = () => apiClient.get("/cook/allOrders");
