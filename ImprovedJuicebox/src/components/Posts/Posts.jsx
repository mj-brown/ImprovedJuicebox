/* eslint-disable react/jsx-key */
import { useGetPostsQuery } from "../../features/api/apiSlice";
const Posts = ({ filtered }) => {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  console.log('filtered:', filtered);
  console.log('data:', data);

  // Determine the posts to display based on whether filtered results are provided
  const postsToDisplay = filtered && filtered.length > 0 ? filtered : data || [];
  console.log(postsToDisplay)
  // Render Posts based on the data
  return (
    <div className="home">
      {postsToDisplay.map((post) => (
        <div className="card">
          <div className="post-title-container">
            <h4 className="post-title">{post.title}</h4>
          </div>
          <div className="post-author-container">
            <p className="post-author">{post.author.name}</p>
          </div>
          <div className="post-container">
            <p className="post-content">{post.content}</p>
            <p className="post-tag">{post.tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
