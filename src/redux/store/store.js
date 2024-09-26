import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "../slices/paymentSlice"; 

const store = configureStore({
  reducer: {
    payment: paymentReducer,
  },
});

export default store;
