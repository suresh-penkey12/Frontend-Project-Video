import React, { useEffect, useState } from 'react'
import axios from 'axios';
const useFetch = (url) => {
    const[Data,setData]=useState([]);
    useEffect(()=>{
        let fetchdata =async()=>{
            let {data}=await axios.get(url);
            let{message}=data;
            setData(message);
        }
        fetchdata();
    },[url])
  return {Data}
}

export default useFetch