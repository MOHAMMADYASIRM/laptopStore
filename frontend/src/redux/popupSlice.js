import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    text: "", 
  },
  reducers: {
    setPopupMessage: (state, action) => {
      state.text = action.payload;
    },
    clearPopupMessage: (state) => {
      state.text = "";
    },
  },
});

export const { setPopupMessage, clearPopupMessage } = popupSlice.actions;
export default popupSlice.reducer;
