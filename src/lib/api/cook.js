import axios from "axios";

export const bringAllOrders=()=>
    axios.get("https://every-server.herokuapp.com/api/cook/allOrders");