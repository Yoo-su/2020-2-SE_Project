import React,{useState} from "react";
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {Input} from 'semantic-ui-react';
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
                <div id="head">
                    <b>Login</b>
                </div>
                <div id="loginContent">
            <form>
                

                <div className="form-group" style={{marginBottom:"25px"}}>
           
                    <input type="email" className="form-control" placeholder="Email .." onChange={handleEmail}/>
                </div>
               
                <div className="form-group" style={{marginBottom:"25px"}}>
                 
                    <input type="password" className="form-control" placeholder="Password .." onChange={handlePW}/>
                </div>

                <Button style={{width:"100%",backgroundColor:"#CC9966",borderColor:"#CC9966"}} onClick={()=>{
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
                       }else{alert('입력 정보를 확인해주세요')}
                   })
                }}>Submit</Button><br></br>
            </form>
            </div>
            </div>
    );
}

