import { useState } from "react";
import { useLoginUserMutation } from "../../features/api/apiSlice";

const Login = ({ token, onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleLogin = async () => {
      try {
        const credentials = { username, password };
  
        const response = await loginUser(credentials).unwrap();
  
        if (response.token) {
          setUserToken(response.token);
          // Clear form fields after successful login
          setUsername("");
          setPassword("");
        } else {
          console.error("Login failed: Unexpected response structure");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
      
    return (
      <div>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label
                htmlFor="email">
                Username:
              </label>
              <input
                type="text"
                id="email"
                value={username}
                onChange={handleUsernameChange}
                aria-label="Username"
                required/>
            </div>
            <div>
              <label
                htmlFor="password">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={onClose}
              >
                Login
              </button>
              <button
                name="cancel"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
          {isError && <p>Login failed. Please check your credentials.</p>}
        </div>
      </div>
    );
};

export default Login;