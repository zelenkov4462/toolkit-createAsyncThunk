import React from "react";
import PostItem from "../PostItem/PostItem";
import { useSelector } from "react-redux";

const PostList = () => {
  const posts = useSelector((state) => state.todos.todos);

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
