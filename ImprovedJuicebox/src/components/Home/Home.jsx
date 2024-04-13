import { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import NavBar from "../NavBar/NavBar";
import AddPost from "../AddPost/AddPost";
import { useGetPostsQuery } from '../../features/api/apiSlice';

const Home = () => {
  const { data, error, isLoading } = useGetPostsQuery();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (data) {
      // Set initial posts data when it's loaded
      setFilteredPosts(data.posts);
    }
  }, [data]);

  const handleSearch = (searchQuery) => {
    if (data) {
      const filtered = data.posts.filter(
        (post) =>
          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

    return (
        <div className="appBody">
            <div className="navBarContainer">
                <NavBar handleSearch={handleSearch}/>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading posts: {error}</p>}
            <div className="appMain">
                <div className="addPostContainer">
                    <AddPost />
                </div>
                <div className="PostContainer">
                    <Posts filtered={filteredPosts} />
                </div>
            </div>
        </div>
    )

};

export default Home;