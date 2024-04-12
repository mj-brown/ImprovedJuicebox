import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Register from "../Register/Register";
import Login from "../Login/Login"
import { Link } from "react-router-dom";

const NavBar = ({ handleSearch, setUserToken }) => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
    const handleSignup = () => {
      // Open the SignUpModal
      setIsSignUpModalOpen(true);
    };
  
    const handleCloseSignUpModal = () => {
      // Close the SignUpModal
      setIsSignUpModalOpen(false);
    };
  
    const handleLogin = () => {
      // Open the LoginModal
      setIsLoginModalOpen(true);
    };
  
    const handleCloseLoginModal = () => {
      // Close the LoginModal
      setIsLoginModalOpen(false);
    };
  
    return (
      <div>
        <h1>
          JuiceBox
        </h1>
          <div>
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div>
            <button>
              <Link to="/account" style={{ textDecoration: "none" }}>
                Account
              </Link>
            </button>
              <button
                onClick={handleSignup}>
                Sign up
              </button>
              <button
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
          </div>
      {isSignUpModalOpen && <Register onClose={handleCloseSignUpModal} />}
      {isLoginModalOpen && <Login onClose={handleCloseLoginModal} />}
    </div>
    );
  };

export default NavBar;