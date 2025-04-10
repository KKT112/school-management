import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from './reducer/school-reducer';
import {reducer as teacherReducer } from "../redux/reducer/techer-reducer"

const store = configureStore({
  reducer: {
    school: schoolReducer,
    teacher:teacherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof store.getState>;
export default store;



