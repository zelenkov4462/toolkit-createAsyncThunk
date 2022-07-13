import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../ReduxToolkit/userSlice";
import todoSlice from "../ReduxToolkit/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    users: userSlice,
  },
});
