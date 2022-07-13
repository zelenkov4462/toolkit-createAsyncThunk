import React from "react";

const PostForm = ({ text, setText, addPost }) => {
  return (
    <div>
      <label>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Введите пост"
        />
      </label>
      <button onClick={addPost}>Add post</button>
    </div>
  );
};

export default PostForm;
