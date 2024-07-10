import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  bookings: [],
  loading: false,
  error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      signInStart: (state) => {
        state.loading = true;
        state.error = false;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload; //payload may contain the user data. After successful login you can see in the redux on the browser, how payload is looks like.
        state.loading = false;
        state.error = false;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      signInAlert: (state) => {
        state.loading = false;
        state.error = false;
      },
    },
  });
  export const {
    signInStart,
    signInSuccess,
    signInFailure,
  } = userSlice.actions;
  export default userSlice.reducer;
  