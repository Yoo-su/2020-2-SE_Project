import axios from "axios";

export const fetchSalesInfo = () =>
  axios.get("https://every-server.herokuapp.com/api/store/sales");

export const fetchAccountInfo=()=>
  axios.get("https://every-server.herokuapp.com/api/store/account")