import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  details: { isOpen: false, id: "" },
  loadingDetails: true,
  spriteGender: "male",
  spriteType: "normal",
  test: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setLoadingDetails: (state, action) => {
      state.loadingDetails = action.payload;
    },
    setSpriteGender: (state, action) => {
      state.spriteGender = action.payload;
    },
    setSpriteType: (state, action) => {
      state.spriteType = action.payload;
    },
  },
});

export const {
  setLoading,
  setDetails,
  setLoadingDetails,
  setSpriteGender,
  setSpriteType,
} = uiSlice.actions;
export default uiSlice.reducer;
