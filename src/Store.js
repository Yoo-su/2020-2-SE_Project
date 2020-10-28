import {configureStore,createSlice} from "@reduxjs/toolkit";

const userState=createSlice({
    name:"user",
    initialState:{
        isLogin:true,
        userRole:1
    },
    reducers:{
        printCurUser:(state,action)=>{console.log("현재 유저 Role: ",state.userRole);}
    }
});

console.log(userState);
const store=configureStore({reducer:userState.reducer});


export const {printCurUser}=userState.actions;
export default store;