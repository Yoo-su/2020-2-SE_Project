import apiClient from "./client";

export const fetchSalesInfo = () =>
  apiClient.get("/store/sales");

export const fetchAccountInfo=()=>
  apiClient.get("/store/account")