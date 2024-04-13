import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/api/apiSlice";

const Register = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleLocationChange = (e) => {
      setLocation(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleClose = () => {
      navigate("/");
    };
  
    const handleRegistration = async () => {
      try {
        const userData = { username, password, name, location };
        const result = await registerUser(userData).unwrap();
        console.log("Successful registreation", userData);
        if (result) {
          navigate("/");
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };
  
    return (
      <div className="registerContainer">
        <div className="titleContainer">
          <h2 className="pageTitle">Sign up for an account</h2>
        </div>
        <div className="registerFormContainer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistration();
            }}
            className="registerForm"
          >
            <label className="registerHeading">
              Enter username
            </label>
            <input
              required
              id="username"
              value={username}
              maxLength={127}
              onChange={handleUsernameChange}
              className="registerUsernameInput"
            />
            <label className="registerHeading">
              Name
            </label>
            <input
              required
              id="name"
              value={name}
              minLength={3}
              maxLength={127}
              onChange={handleNameChange}
              className="registerNameInput"
            />
            <label className="registerHeading">
              Location
            </label>
            <input
              required
              id="location"
              value={location}
              minLength={3}
              maxLength={127}
              onChange={handleLocationChange}
              className="registerLocationInput"
            />
            <label className="registerHeading">
              Choose a password <span>3 to 100 characters</span>
            </label>
            <input
              required
              id="password"
              value={password}
              minLength={3}
              maxLength={100}
              onChange={handlePasswordChange}
              className="registerPasswordInput"
            />
            <div>
              <div className="registerButtonContainer">
                <button
                  type="submit"
                  name="submit-to-signup"
                  disabled={isLoading}
                  className="appButton"
                >
                  {isLoading ? "Signing up..." : "Sign up"}
                </button>
                <button name="cancel" onClick={handleClose} className="appButton">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      {isError && <p>Registration failed. Please check your information.</p>}
      </div>
    );
};

export default Register;
