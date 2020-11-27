import React,{useState} from "react";
import {Button} from 'react-bootstrap';
import axios from 'axios';
import "./Login.css";

export default function Login(){
    const [inputEmail,setEmail]=useState('');
    const [inputPassWord,setPassWord]=useState('');

    function handleEmail(e){
      setEmail(e.target.value);
    }

    function handlePW(e){
       setPassWord(e.target.value);
    }
    return (
            <div className="LoginPage">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handlePW}/>
                </div>

                <Button style={{width:"100%"}} onClick={()=>{
                   axios.post('http://localhost:3002/api/login',{
                       email:inputEmail,
                       password:inputPassWord
                   }).then(res=>{
                    console.log(res.data);
                       if(res.data.success===true){
                           localStorage.setItem('userNick',res.data.nickName);
                           localStorage.setItem('role',res.data.role);
                           alert('로그인 성공');
                           window.location.href = '/';
                       }else{alert('로그인 실패')}
                   })
                }}>Submit</Button><br></br>
            </form>
            </div>
    );
}

