import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getLocalItem } from "../../base";

const appState = getLocalItem("app-state", undefined, true);
const initialState = {
  theme: "light",
  mode: "user",
  showLiveChat: false,
  ...appState?.app,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleLiveChat: (state, action) => {
      state.showLiveChat = action.payload;
    },
  },
});

const baseInfo = (state) => state.app;

export const appReducer = appSlice.reducer;

export const { setTheme, setMode, toggleLiveChat } = appSlice.actions;

export const getAppState = createSelector(baseInfo, (app) => app);
