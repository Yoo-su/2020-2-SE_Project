import {configureStore,createSlice} from "@reduxjs/toolkit";

const userState=createSlice({
    name:"user",
    initialState:{
        isLogin:true,
        userRole:0
    },
    reducers:{
        logOut:(state,action)=>{
            state.isLogin=false;
            state.userRole=-1;
        }
    }
});

const store=configureStore({reducer:userState.reducer});


export const {logOut}=userState.actions;
export default store;