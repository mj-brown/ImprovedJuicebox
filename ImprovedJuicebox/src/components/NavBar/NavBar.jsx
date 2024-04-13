import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Register from "../Register/Register";
import Login from "../Login/Login"
import { useNavigate } from "react-router-dom";

const NavBar = ({ handleSearch, setUserToken }) => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    
    const navigate = useNavigate();
    
    const handleSignup = () => {
      navigate("/register");
    };
  
    const handleLogin = () => {
      navigate("/login");
    };

    const handleAccount = () => {
      navigate("/account");
    };
  
    return (
      <div>
        <h1>
          JuceBx
        </h1>
          <div>
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div>
            <button onClick={handleAccount}>
              Account
            </button>
              <button
                onClick={handleSignup}>
                Sign up
              </button>
              <button
                onClick={handleLogin}
              >
                Login
              </button>
          </div>
    </div>
    );
  };

export default NavBar;