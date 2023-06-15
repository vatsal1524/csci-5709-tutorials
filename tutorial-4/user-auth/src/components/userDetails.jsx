import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://express-t4.onrender.com/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!user) {
    return <div></div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <p>About: {user.about}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      <p>Balance: {user.balance}</p>
      <p>Eye Color: {user.eyeColor}</p>
    </div>
  );
}

export default UserDetails;
