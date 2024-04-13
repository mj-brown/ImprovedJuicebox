import { useState } from "react";
import { useRegisterUserMutation } from "../../features/api/apiSlice";

const Register = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
  
    const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  
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
  
    const handleRegistration = async () => {
      try {
        const userData = { username, password, name, location };
        await registerUser(userData).unwrap();
        // Handle successful registration, e.g., show a success message or redirect
        onClose(); // Close the form after successful registration
        console.log("Successful registreation", userData);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };
  
    return (
      <div>
        <h2 id="modal-modal-title">
          Sign up for an account
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegistration();
          }}
        >
          <label>
            Enter username
          </label>
          <input
            required
            id="username"
            value={username}
            maxLength={127}
            onChange={handleUsernameChange}
          />
          <label>
            Name
          </label>
          <input
            required
            id="name"
            value={name}
            minLength={3}
            maxLength={127}
            onChange={handleNameChange}
          />
          <label>
            Location
          </label>
          <input
            required
            id="location"
            value={location}
            minLength={3}
            maxLength={127}
            onChange={handleLocationChange}
          />
          <label>
            Choose a password <span>3 to 100 characters</span>
          </label>
          <input
            required
            id="password"
            value={password}
            minLength={3}
            maxLength={100}
            onChange={handlePasswordChange}
          />
          <div>
            <div>
              <button
                type="submit"
                name="submit-to-signup"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </div>
            <div>
              <button name="cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      {isError && <p>Registration failed. Please check your information.</p>}
      </div>
    );
};

export default Register;
