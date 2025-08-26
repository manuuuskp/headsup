import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeedData: (state, action) => {
      const newState = state.filter(feedData => feedData._id !== action.payload)
      console.log(newState);
      return newState;
    },
  },
});

export const { addFeedData, removeFeedData } = feedSlice.actions;

export default feedSlice.reducer;
