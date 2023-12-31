import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  chat: false,
  cart: localStorage.getItem('dashCart') ? JSON.parse(localStorage.getItem('dashCart')) : false,
  userProfile: false,
  notification: false,
  screenSize: localStorage.getItem('screenSize') ? JSON.parse(localStorage.getItem('screenSize')) : undefined,
  currentColor: localStorage.getItem('currentColor') ? JSON.parse(localStorage.getItem('currentColor')) : '#03C9D7',
  currentMode: localStorage.getItem('currentMode') ? JSON.parse(localStorage.getItem('currentMode')) : 'Dark',
  themeSettings: localStorage.getItem('themeSettings') ? JSON.parse(localStorage.getItem('themeSettings')) : false,
  activeMenu: false,
  infoAlert: false,
  successAlert: false,
  modalIsOpen:false,
  selectedProductId:null,
  isLoading:true,
};

const ThemeSlice = createSlice({
  initialState,
  name:'theme',
  reducers: {
    setModalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload
    },
    setChat: (state, action) => {
      state.chat = action.payload
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
    setCart: (state, action) => {
      state.cart = action.payload
      localStorage.setItem("dashCart", JSON.stringify(state.cart))

    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload
      localStorage.setItem("screenSize", JSON.stringify(state.screenSize))

    },
    setThemeSettings: (state,action) => {
      state.themeSettings = action.payload
      console.log(action.payload);
      localStorage.setItem("themeSettings", JSON.stringify(state.themeSettings))

    },
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload
      localStorage.setItem("currentMode", JSON.stringify(state.currentMode))

    },
    setCurrentColor: (state,action) => {
      state.currentColor = action.payload
      localStorage.setItem("currentColor", JSON.stringify(state.currentColor))

    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload
    },
    
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setInfoAlert: (state, action) => {
      state.infoAlert = action.payload
    },
    setSuccessAlert: (state, action) => {
      state.successAlert = action.payload
    },
    
/*     setIsClicked: (state, action) => {
      state. = action.payload
    }, */
  }
})

export const {setInfoAlert, setSuccessAlert, setModalIsOpen,setSelectedProductId,setChat, setUserProfile, setCart, setNotification, setScreenSize, setThemeSettings, setCurrentMode, setCurrentColor, setActiveMenu,setIsLoading} = ThemeSlice.actions


export const selectChat = (state) => state.theme.chat
export const selectCart = (state) => state.theme.cart
export const selectUserProfile = (state) => state.theme.userProfile
export const selectNotification = (state) => state.theme.notification
export const selectScreenSize = (state) => state.theme.screenSize
export const selectCurrentColor = (state) => state.theme.currentColor
export const selectCurrentMode = (state) => state.theme.currentMode
export const selectThemeSettings = (state) => state.theme.themeSettings
export const selectActiveMenu = (state) => state.theme.activeMenu
export const selectModalIsOpen = (state) => state.theme.modalIsOpen
export const selectProductId = (state) => state.theme.selectedProductId
export const selectIsLoading = (state) => state.theme.isLoading
export const selectSuccesAlert = (state) => state.theme.successAlert
export const selectInfoAlert = (state) => state.theme.infoAlert
export default ThemeSlice.reducer