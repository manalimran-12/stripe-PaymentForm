import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  loading: false,
  errorMessage: "",
  successMessage: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    resetForm: (state) => {
      state.name = "";
      state.email = "";
      state.loading = false;
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
});

export const { setName, setEmail, setLoading, setErrorMessage, setSuccessMessage, resetForm } = paymentSlice.actions;
export default paymentSlice.reducer;
