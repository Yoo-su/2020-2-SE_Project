import apiClient from "./client";

export const getSalesInfo = () => apiClient.get("/store/sales");

export const getAccountInfo = () => apiClient.get("/store/account");
