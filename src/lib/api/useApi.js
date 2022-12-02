import {useState, useCallback} from "react";

const useApi=(param=null)=>{
    const [loading, setLoading]=useState(false);
    const [error, setError] = useState(null);
    const [data, setData]=useState(null);

    const execute=()=>{
        try{
            execute(param && param).then(res=>{
                
            })
        }catch(err){
            setLoading(false);
            setError(err);
            throw err;
        }
    }

}