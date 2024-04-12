import { useEffect, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Posts from './components/Posts/Posts';
import { Routes, Route } from "react-router-dom";
import AccountDetails from "./components/Account/Account";
import { useGetPostsQuery } from './features/api/apiSlice';

function App() {
  const { data, error, isLoading } = useGetPostsQuery();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userToken, setUserToken] = useState(null);

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
    <>
      <NavBar handleSearch={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading posts: {error}</p>}
      
        <Routes>
          <Route path="/" element={<Posts filtered={filteredPosts} />} />
          <Route path="/account" element={<AccountDetails userToken={userToken} />} />
        </Routes>
    </>
  );
}

export default App;
