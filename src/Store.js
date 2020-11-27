import {configureStore,createSlice} from "@reduxjs/toolkit";

const userState=createSlice({
    name:"user",
    initialState:{
        isLogin:false,
        curUser:"",
        userRole:-1,
    },
    reducers:{
        logOut:(state,action)=>{
            localStorage.removeItem('userNick');
            localStorage.removeItem('role');
            state.isLogin=false;
            state.userRole=-1;
            window.location.href = '/';
        },
        logIn:(state,action)=>{
            state.isLogin=true;
            state.curUser=localStorage.getItem('userNick');
            state.userRole=parseInt(localStorage.getItem('role'));
        }
    }
});

const store=configureStore({reducer:userState.reducer});


export const {logOut,logIn}=userState.actions;
export default store;