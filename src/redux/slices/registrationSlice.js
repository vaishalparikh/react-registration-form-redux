import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },

    deleteUser: (state, action) => {
      let math = state.filter((i) => i.id !== action.payload);
      state = math;
      return state;
    },
  },
});

export default registrationSlice.reducer;
export const { addUser, deleteUser } = registrationSlice.actions;
