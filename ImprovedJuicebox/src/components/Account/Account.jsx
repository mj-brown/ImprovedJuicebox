import { useGetAccountDetailsQuery } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const Account = ({ userToken }) => {
    // Use the RTK Query hook to fetch account details
  const {
    data: accountData,
    error,
    isLoading,
  } = useGetAccountDetailsQuery(userToken);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <h2>Account Details</h2>
      {accountData ? (
        <div>
          <p>User Id: {accountData.id}</p>
          <p>Username: {accountData.username}</p>
          <p>Name: {accountData.name}</p>
          <p>Location: {accountData.location}</p>
        </div>
      ) : null}
      <div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Account;