import { useState, useCallback } from 'react'
import { getSalesInfo } from "lib/api/sales";

const useGetSalesInfo = () => {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData]= useState(null);
    const [tableSalesCnt, setTableSalesCnt]=useState(0);
    const [takeoutSalesCnt, setTakeoutSalesCnt]=useState(0);
    const [avgCustomerSpendTime, setAvgCustomerSpendTime]=useState("");
    const [avgCustomerWaitTime, setAvgCustomerWaitTime]=useState("");
    
    const execute = () =>{
        try{
            setLoading(true);
            getSalesInfo().then(res=>{
                setData(res.data.salesInfo);
                setTableSalesCnt(res.data.todayTableSales);
                setTakeoutSalesCnt(res.data.todayTakeOutSales);
                setAvgCustomerSpendTime(res.data.spendAvg.slice(0,8));
                setAvgCustomerWaitTime(res.data.waitAvg.slice(0,8));
                setLoading(false);
            });
        }catch(err){
            setLoading(false);
            setError(err);
            throw err;
        }
    }

    return {loading, error, data, tableSalesCnt, takeoutSalesCnt, avgCustomerSpendTime, avgCustomerWaitTime, execute:useCallback(execute, [])};
}

export default useGetSalesInfo;