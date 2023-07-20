import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  token: localStorage.getItem('ACCESS_TOKEN') ? JSON.parse(localStorage.getItem('ACCESS_TOKEN')) : '',
  user: {},
}

const UserSlice = createSlice({
  initialState,
  name:'user',
  reducers: {
    setToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(state.token))
    },
    removeToken: () => {
      localStorage.removeItem("ACCESS_TOKEN")
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})

export const {setToken, setUser, removeToken} = UserSlice.actions

export const selectUser = (state) => state.user.user
export const selectToken = (state) => state.user.token

export default UserSlice.reducer