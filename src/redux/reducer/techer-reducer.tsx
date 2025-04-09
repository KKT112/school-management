import apiTeacherList from "@/network/api/api-techer/api-techer-list";
import { ITeacherModel } from "../../model/school-register/teacher-model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 
export const getTeacherList = createAsyncThunk(
  "get-teacher-list",
  async (school_id: number) => {
    const res = await apiTeacherList.getTeacherList({school_id});

    if (res && res.s === 1) {
      return res.r ?? [];
    }

    return [];
  }
);

interface ITeacherInitialValue {
  isLoading: boolean;
  teacher: ITeacherModel[];
}

const initialValue: ITeacherInitialValue = {
  isLoading: true,
  teacher:[],
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: initialValue,
  reducers: { addTeacher: (state, action: PayloadAction<ITeacherModel>) => {
    state.teacher.push(action.payload);
  },},
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTeacherList.fulfilled,
        (state, action: PayloadAction<ITeacherModel[]>) => {
          state.isLoading = false;
          state.teacher = action.payload;
        }
      )
      .addCase(getTeacherList.rejected, (state) => {
        state.isLoading = false;
        state.teacher = [];
      });
  },
});

export const { addTeacher } = teacherSlice.actions;
export const reducer = teacherSlice.reducer;

