/* eslint-disable react/jsx-key */
import { useGetPostsQuery } from "../../features/api/apiSlice";
import "./Posts.css";

const Posts = ({ filtered }) => {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error loading posts: {error.status} - {error.error}
      </p>
    );
  }

  // Function to determine the posts to display based on whether filtered results are provided
  const getPostsToDisplay = (filtered, data) => {
    if (Array.isArray(filtered) && filtered.length > 0) {
      return filtered;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }
  };

  // Render Posts based on the data
  return (
    <div className="postCardContainer">
      {getPostsToDisplay(filtered, data).map((post) => (
        <div className="postCard" key={post.id}>
          <div className="postTitleContainer">
            <h4 className="postTitle">{post.title}</h4>
          </div>
          <div className="postAuthorContainer">
            <p className="postAuthor">{post.author.name}</p>
          </div>
          <div className="postContentContainer">
            <p className="postContent">{post.content}</p>
            <p className="postTags">
              {post.tags.map((tag) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
