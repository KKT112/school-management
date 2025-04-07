import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISchoolState {
  name: string | undefined;
}

const initialState: ISchoolState = {
  name: localStorage.getItem("schoolName") || "",
};

const schoolSlice = createSlice({
  name: "school",
  initialState:initialState,
  reducers: {
    setSchoolName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setSchoolName } = schoolSlice.actions;
export default schoolSlice.reducer;
