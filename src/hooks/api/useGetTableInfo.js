import { useState, useCallback } from 'react'
import { getTableInfo } from "lib/api/order";

const useGetTableInfo = (tableId) => {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData]= useState(null);
    
    const execute = () =>{
        try{
            setLoading(true);
            getTableInfo(tableId).then(res=>{
                setData(res.data);
                setLoading(false);
            });
        }catch(err){
            setLoading(false);
            setError(err);
            throw err;
        }
    }

    return {loading, error, data, execute:useCallback(execute, [])};
}

export default useGetTableInfo