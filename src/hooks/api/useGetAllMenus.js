import { useState, useCallback } from 'react'
import { getAllMenus } from "lib/api/menu";

const useGetAllMenus = () => {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData]= useState(null);
    
    const execute = () =>{
        try{
            setLoading(true);
            getAllMenus().then(res=>{
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

export default useGetAllMenus