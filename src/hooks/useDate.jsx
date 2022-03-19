import {useState, useEffect} from 'react';

export default function useDate(){
  const [date,setDate]=useState('');

  useEffect(()=>{
    const curDate = new Date();

    const month = curDate.getMonth() + 1; // 월
    const day = curDate.getDate(); // 일
 
    setDate(month + "월" + " " + day + "일");
  },[]);

  return date;
}
