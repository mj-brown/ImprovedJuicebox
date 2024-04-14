import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/api/apiSlice";
import "./Login.css";

const Login = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const userData = { username, password };

      const response = await loginUser(userData).unwrap();

      if (response.token) {
        setUserToken(response.token);
        // Clear form fields after successful login
        setUsername("");
        setPassword("");
        console.log("Successfully logged in", response);
        navigate("/");
      } else {
        console.error("Login failed: Unexpected response structure");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <div className="titleContainer">
          <h2 className="pageTitle">Login</h2>
        </div>
        <div className="loginFormContainer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="loginForm"
          >
            <div className="loginUsername">
              <label htmlFor="username" className="loginHeading">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                aria-label="Username"
                required
                className="usernameLoginInput"
              />
            </div>
            <div className="loginPassword">
              <label htmlFor="password" className="loginHeading">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="passwordLoginInput"
              />
            </div>
            <div className="loginButtonContainer">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="appButton"
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
              <button type="button" onClick={handleLogin} className="appButton">
                Login
              </button>
              <button name="cancel" onClick={handleClose} className="appButton">
                Cancel
              </button>
            </div>
          </form>
          {isError && <p>Login failed. Please check your credentials.</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
