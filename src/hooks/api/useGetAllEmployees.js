import { useState, useCallback } from 'react'
import { getAllEmployees } from "lib/api/user";

const useGetAllEmployees = () => {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData]= useState(null);
    
    const execute = () =>{
        try{
            setLoading(true);
            getAllEmployees().then(res=>{
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

export default useGetAllEmployees