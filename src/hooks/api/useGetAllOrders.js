import { useState, useCallback } from 'react'
import { getAllOrders } from "lib/api/cook";

const useGetAllOrders = () => {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData]= useState(null);
    
    const execute = () =>{
        try{
            setLoading(true);
            getAllOrders().then(res=>{
                setData(res.data);
                setLoading(false);
            });
        }catch(err){
            setLoading(false);
            setError(err);
            throw err;
        }
    }

    return {loading, error, data, setData, execute:useCallback(execute, [])};
}

export default useGetAllOrders