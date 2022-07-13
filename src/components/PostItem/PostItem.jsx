import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  deleteTodo,
  removePost,
  toggleComplete,
  toggleCompleted,
  toggleHandler,
  toggleHandlerAs,
} from "../../ReduxToolkit/todoSlice";

const PostItem = ({ post }) => {
  const { id, title, completed } = post;
  const dispatch = useDispatch();

  return (
    <div>
      <input
        onChange={() => dispatch(toggleComplete(id))}
        checked={completed}
        type="checkbox"
      />
      <span>{title}</span>
      <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => dispatch(removePost(id))}
      >
        &times;
      </span>
    </div>
  );
};

export default PostItem;
