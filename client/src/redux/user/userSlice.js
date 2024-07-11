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
        state.currentUser = action.payload; 
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
      bookingSubmitStart(state) {
        state.loading = true;
        state.error = false;
      },
      bookingSubmitSuccess(state) {
        state.loading = false;
      },
      bookingSubmitFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      bookingGotAll(state, action) {
        state.bookings = action.payload;
      },
      bookingGotAllFailure(state, action) {
        state.error = action.payload;
      },
      bookingUpdateStart(state) {
        state.loading = true;
        state.error = false;
      },
      bookingUpdateSuccess(state) {
        state.loading = false;
        state.error = false;
      },
      bookingUpdateFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      bookingDeleteStart(state) {
        state.loading = true;
        state.error = false;
      },
      bookingDeleteSuccess(state) {
        state.loading = false;
        state.error = false;
      },
      bookingDeleteFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    bookingSubmitStart,
    bookingSubmitSuccess,
    bookingSubmitFailure,
    bookingGotAll,
    bookingGotAllFailure,
    bookingUpdateStart,
    bookingUpdateSuccess,
    bookingUpdateFailure,
    bookingDeleteStart,
    bookingDeleteSuccess,
    bookingDeleteFailure,
  } = userSlice.actions;
  export default userSlice.reducer;
  