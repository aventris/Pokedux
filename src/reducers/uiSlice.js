import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  details: { isOpen: false, id: "" },
  loadingDetails: true,
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
  },
});

export const { setLoading, setDetails, setLoadingDetails } = uiSlice.actions;
export default uiSlice.reducer;
