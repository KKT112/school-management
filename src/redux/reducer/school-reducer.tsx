import { ISchoolModel } from "@/model/school-register";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISchoolModel|null = (localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")!) :
  {}) as ISchoolModel|null  ;
const schoolSlice = createSlice({
  name: "school",
  initialState: initialState,
  reducers: {
    setSchoolName(state, action: PayloadAction<ISchoolModel | null>) {
      return state = action.payload;
    },
  },
});

export const { setSchoolName } = schoolSlice.actions;
export default schoolSlice.reducer;
