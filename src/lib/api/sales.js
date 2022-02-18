import axios from "axios";

export const fetchSalesInfo = () =>
  axios.get("https://every-server.herokuapp.com/api/aboutSales");

export const fetchAccountInfo=()=>
  axios.get("https://every-server.herokuapp.com/api/account")