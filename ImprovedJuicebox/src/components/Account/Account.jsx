import { useGetAccountDetailsQuery } from "../../features/api/apiSlice";

const Account = ({ userToken }) => {
    // Use the RTK Query hook to fetch account details
  const {
    data: accountData,
    // error,
    // isLoading,
  } = useGetAccountDetailsQuery(userToken);

  
  return (
    <div>
      <h2>Account Details</h2>
      {/* {isLoading && <p>Loading account details...</p>}
      {error && <p>Error fetching account details: {error}</p>} */}
      {accountData ? (
        <div>
          <p>User Id: {accountData.id}</p>
          <p>Username: {accountData.username}</p>
          <p>Name: {accountData.name}</p>
          <p>Location: {accountData.location}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Account;