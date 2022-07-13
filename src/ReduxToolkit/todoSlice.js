import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("fetch err");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "todos/removePost",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("del err");
      }

      dispatch(deletePost({ id }));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("sdd");
      }

      dispatch(toggleCompleted({ id }));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addNewPost = createAsyncThunk(
  "todos/addNewPost",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const post = {
        title: text,
        userId: 1,
        completed: false,
      };
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(post),
        }
      );

      if (!response.ok) {
        throw new Error("add err");
      }
      const data = await response.json();
      dispatch(addPost(data));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addPost(state, action) {
      state.todos.push(action.payload);
      // if (action.payload.text.trim()) {
      //   const todo = {
      //     id: Date.now(),
      //     title: action.payload.text,
      //     completed: false,
      //   };
      //   state.todos.push(todo);
      // }
    },
    deletePost(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleCompleted(state, action) {
      const toggle = state.todos.find((todo) => todo.id === action.payload.id);
      toggle.completed = !toggle.completed;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [removePost.rejected]: (action, state) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [toggleComplete.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [addNewPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { addPost, deletePost, toggleCompleted } = todoSlice.actions;
