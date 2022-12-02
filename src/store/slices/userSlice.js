import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLogin:false,
    userNickname:"",
    userRole:null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action)=>{
        const { userNickname, userRole } = action.payload;
        state.isLogin=true;
        state.userNickname= userNickname;
        state.userRole = userRole;
      },

      
    
    },
  });

  export const { setUser } = userSlice.actions;
  export default userSlice.reducer;