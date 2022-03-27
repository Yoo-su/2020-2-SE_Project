
export const alertOnOff=(setAlert)=>{
    setAlert(true);
    setTimeout(()=>{
        setAlert(false);
    },1500);
}

export const changeOrderState=(state, setState)=>{
    const {orderState}=state;
    
    if (orderState === "") {
        setState({...state, orderState:"cooking"});
      } else if (orderState === "prepared") {
        setState({...state, orderState:"prepared"});
      } else if (orderState === "served") {
        setState({...state, orderState:"cooking"});
      }
}

export const clearTable=(tableInfo, setTableInfo)=>{
    setTableInfo({
        ...tableInfo,
        orderContents:[],
        addedContents:[],
        empty:true,
        totalPrice:0,
        addedPrice:0,
        orderState:"",
      })
}