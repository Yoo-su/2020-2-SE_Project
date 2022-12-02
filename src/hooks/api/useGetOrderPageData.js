import { useState, useCallback } from "react";
import { getAllTables, getTakeOutOrders } from "lib/api/order";
import { getActivatedMenus } from "lib/api/menu";
import axios from "axios";

const useGetOrderPageData = () => {
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [takeoutOrders, setTakeoutOrders] = useState([]);
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  const execute = async () => {
    try {
      setLoading(true);
      axios.all([getAllTables(), getActivatedMenus(), getTakeOutOrders()]).then(
        axios.spread((...response) => {
          console.log(response);
          setTables(response[0].data.tables);
          setMenus(response[1].data.menu);
          setTakeoutOrders(response[2].data.takeOutOrders);
          setLoading(false);
        })
      );
    } catch (err) {
      console.log("시발");
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  return {
    loading,
    error,
    tables,
    menus,
    takeoutOrders,
    setTakeoutOrders,
    execute: useCallback(execute, []),
  };
};

export default useGetOrderPageData;
