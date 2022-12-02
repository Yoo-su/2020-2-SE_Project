import { useState, useCallback } from "react";
import { getTakeoutOrderInfo } from "lib/api/order";

const useGetTakeoutOrderInfo = (orderId) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async () => {
    try {
      setLoading(true);
      await getTakeoutOrderInfo(orderId).then((res) => {
        setData(res.data.content);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  return {
    loading,
    error,
    data,
    execute: useCallback(execute, []),
  };
};

export default useGetTakeoutOrderInfo;
