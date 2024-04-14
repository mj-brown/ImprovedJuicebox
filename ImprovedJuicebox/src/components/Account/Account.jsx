import { useGetAccountDetailsQuery } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import "./Account.css";

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
    <div className="accountContainer">
      <div className="accountDetailsContainer">
        <div className="titleContainer">
          <h2 className="pageTitle">Account Details</h2>
        </div>
        {accountData ? (
          <table>
            <tbody>
              <tr>
                <th>User Id</th>
                <th>Username</th>
                <th>Name</th>
                <th>Location</th>
              </tr>
              <tr>
                <td>{accountData.id}</td>
                <td>{accountData.username}</td>
                <td>{accountData.name}</td>
                <td>{accountData.location}</td>
              </tr>
            </tbody>
          </table>
        ) : null}
        <div>
          <button onClick={handleClose} className="appButton">Close</button>
        </div>
      </div>
    </div>
  );
  
};

export default Account;