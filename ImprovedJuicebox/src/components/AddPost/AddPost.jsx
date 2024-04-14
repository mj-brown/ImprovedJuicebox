import { useState } from "react";
import { useCreatePostMutation } from "../../features/api/apiSlice";
import "./AddPost.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [addPost, { isLoading, isError }] = useCreatePostMutation();

  const handleSubmit = async () => {
    try {
      const userData = { title, content, tags };
      await addPost({ userData }).unwrap();
      console.log("Successfully added post", userData);
    } catch (error) {
      console.error("Failed to add post", error);
    }
  };

  return (
    <div className="addPostingContainer">
      <div className="sectionTitleContainer">
        <h3 className="sectionTitle">Add A New Post</h3>
      </div>
      <div className="addPostFormContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="addPostForm"
        >
          <label className="addPostHeading">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="postTitleInput"
            />
          </label>
          <label className="addPostHeading">
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="postContentInput"
            />
          </label>
          <label className="addPostHeading">
            Tags (comma separated):
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="postTagInput"
            />
          </label>
          <button type="submit" className="addPostButton">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
