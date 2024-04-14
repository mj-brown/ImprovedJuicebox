import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import './NavBar.css';

const NavBar = ({ handleSearch, setUserToken }) => {
    
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
      <div className="navBarDivContainer">
        <div className="appTitleContainer">
          <h1 className="appTitle">JuceBx</h1>
        </div>
          <div className="searchBarContainer">
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className="navBarButtonContainer">
            <button onClick={handleAccount} className="appButton">
              Account
            </button>
              <button
                onClick={handleSignup} className="appButton">
                Sign up
              </button>
              <button
                onClick={handleLogin}
                className="appButton"
              >
                Login
              </button>
          </div>
    </div>
    );
  };

export default NavBar;