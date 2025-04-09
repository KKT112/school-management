import { ISchoolModel } from "@/model/school-register/school-register";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISchoolModel = (localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")!) :
  {}) as ISchoolModel;
const schoolSlice = createSlice({
  name: "school",
  initialState: initialState,
  reducers: {
    setSchoolName(state, action: PayloadAction<ISchoolModel>) {
      state = action.payload;
    },
  },
});

export const { setSchoolName } = schoolSlice.actions;
export default schoolSlice.reducer;
