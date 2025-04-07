import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from '../redux/reducer/reducer';

const store = configureStore({
  reducer: {
    school: schoolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
