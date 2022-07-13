import React, { useEffect, useMemo, useState } from "react";
import PostForm from "./components/PostForm/PostForm";
import PostList from "./components/PostList/PostList";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, addPost, fetchTodos } from "./ReduxToolkit/todoSlice";

const App = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const addTask = () => {
    dispatch(addNewPost(text));
    setText("");
  };

  return (
    <div>
      <PostForm text={text} setText={setText} addPost={addTask} />

      <PostList />
    </div>
  );
};

export default App;
