import { useState, useEffect } from 'react';

export default function useTime() {
  const [time, setTime] = useState('');

  const getTime = () => {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    setTime(
      `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes
      }`
    );
  };

  useEffect(() => {
    setInterval(getTime, 1000);
  }, [])

  return time;
}