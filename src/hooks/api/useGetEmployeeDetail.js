import { useState, useCallback } from 'react'
import { getEmployeeDetail, getWorkHistory } from "lib/api/user"

const useGetEmployeeDetail = (employee) => {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [workHistory, setWorkHistory]= useState(null);
    const [sumOfPay, setSumOfPay] = useState(null);
    
    const execute = () =>{
        try{
            setLoading(true);
            getEmployeeDetail(employee).then(res=>{
                setSumOfPay(res.data.payPrice);
            });
            getWorkHistory(employee).then(res=>{
                setWorkHistory(res.data.workInfo)
                setLoading(false);
            })

        }catch(err){
            setLoading(false);
            setError(err);
            throw err;
        }
    }

    return {loading, error, workHistory, sumOfPay, setWorkHistory, setSumOfPay, execute:useCallback(execute, [])};
}

export default useGetEmployeeDetail