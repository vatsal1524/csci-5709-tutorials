import { useLocation } from "react-router-dom";

const Profile = () => {
  const state = useLocation();

  console.log(state);
  return (
    <div>
      <h2>Profile Details:</h2>
      <p>First Name: {state.state.firstName}</p>
      <p>Last Name: {state.state.lastName}</p>
      <p>Email: {state.state.email}</p>
    </div>
  );
};

export default Profile;
